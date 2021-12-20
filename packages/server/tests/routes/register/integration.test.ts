jest.resetAllMocks();
import app from "../../../src/app";
import supertest from "supertest";
import prismaClient from "../../../src/database/prisma";
import { User } from "@prisma/client";
import { createHash } from "../../../src/utils/hash";
import { torrentQueue } from "../../../src/queues/torrentQueue";

describe("Register basic route", () => {
  const endpoint = "/register/basic";
  const request = supertest(app);
  let user: User;

  beforeAll(async () => {
    const hashedPassword = await createHash("password");
    user = await prismaClient.user.create({
      data: {
        name: "dibash",
        email: "dibash@gmail.com",
        password: hashedPassword,
      },
    });
  });

  afterAll(async () => {
    await prismaClient.user.deleteMany({});
    await prismaClient.$disconnect();
    await torrentQueue.close();
  });

  it("should send error when empty body is sent", async () => {
    const response = await addHeaders(request.post(endpoint).send({}));
    expect(response.status).toBe(400);
  });

  it("should send error when user already exists", async () => {
    const response = await addHeaders(
      request
        .post(endpoint)
        .send({ email: user.email, password: "password", name: "hello" })
    );
    expect(response.text).toMatch(/already exists/);
    expect(response.status).toBe(400);
  });
});
const addHeaders = (request: any) => {
  return request.set("Content-Type", "application/json");
};
