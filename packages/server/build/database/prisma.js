import { PrismaClient } from "@prisma/client";
const prismaClient = new PrismaClient();
prismaClient.$connect().then(() => {
    console.log("Prisma connected");
});
export default prismaClient;
//# sourceMappingURL=prisma.js.map