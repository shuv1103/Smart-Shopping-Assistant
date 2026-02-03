import { prisma } from "./prisma";

const connectDB = async (): Promise<void> => {
    await prisma.$connect();
};

export default connectDB;
