import { getRepository } from "typeorm";
import { User } from "../entity/User";
const userRepo = getRepository(User);
console.log("userRepo", userRepo);

export class UserRepository {
  public static async findByEmail(email: string) {
    const user = await userRepo.findOne({ where: { email } });
    return user;
  }

  public static async create(user: User) {
    await userRepo.save(user);
  }
}
