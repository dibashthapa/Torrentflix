jest.resetAllMocks();
import app from "../../../src/app";
import supertest from "supertest";
import prismaClient from "../../../src/database/prisma";
import { User } from "@prisma/client";
import { createHash } from "../../../src/utils/hash";

describe("Login basic route", () => {
  const endpoint = "/login/basic";
  const request = supertest(app);

  let user: User;

  beforeAll(async () => {
    await prismaClient.user.deleteMany({});
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
  });

  it("should send error when empty body is sent", async () => {
    const response = await addHeaders(request.post(endpoint).send({}));
    expect(response.status).toBe(400);
  });

  it("should send success when correct credentials is provided", async () => {
    const response = await addHeaders(
      request.post(endpoint).send({ email: user.email, password: "password" })
    );
    expect(response.status).toBe(200);
  });

  it("should send error when only email is sent", async () => {
    const response = await addHeaders(
      request.post(endpoint).send({ email: user.email })
    );
    expect(response.status).toBe(400);
  });
});

export const addHeaders = (request: any) => {
  return request.set("Content-Type", "application/json");
};
