jest.resetAllMocks();
import app from "../../../src/app";
import supertest from "supertest";
import prismaClient from "../../../src/database/prisma";
import { User } from "@prisma/client";
import bcrypt from "bcrypt";

export const bcryptCompareSpy = jest.spyOn(bcrypt, "compare");

describe("Login basic route", () => {
  const endpoint = "/login";
  const request = supertest(app);
  const password = "password";

  let user: User;

  beforeAll(async () => {
    await prismaClient.user.deleteMany({});

     await prismaClient.user.create({
      name: "dibash",
      email: "dibash@gmail.com",
      password: password,
    } as User);
  });

  afterAll(async () => {
    await prismaClient.user.deleteMany({});
  });

  beforeEach(() => {
    bcryptCompareSpy.mockClear();
  });

  it("should send error when empty body is sent", async () => {
    const response = await addHeaders(request.post(endpoint));
    expect(response.status).toBe(400);
  });
});

export const addHeaders = (request: any) => {
  return request.set("Content-Type", "application/json");
};
