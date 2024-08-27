import { PrismaClient } from "@prisma/client";
import { User } from "../entities/User";
import IUserRepository from "./IUserRepository";

export default class PrismaUserRepository implements IUserRepository {
    private prisma = new PrismaClient();
  
    public async createUser(nickname: string): Promise<User> {
        const user = await this.prisma.user.create({
            data: { nickname }
        });
        return new User(user.id, user.nickname);
    }

    public async getUsers(): Promise<User[] | null> {
        const users: User[] = await this.prisma.user.findMany();
        return users.map((user: User) => new User(user.id, user.nickname));
    }

    public async getUserById(id: string): Promise<User | null> {
        const user: User | null = await this.prisma.user.findUnique({
            where: { id }
        });
        return user ? new User(user.id, user.nickname) : null;
    }

    public async updateUser(id: string, nickname: string): Promise<User | null> {
        const user: User | null = await this.prisma.user.update({
            where: { id },
            data: { nickname }
        });
        return user ? new User(user.id, user.nickname) : null;
    }

    public async deleteUser(id: string): Promise<void> {
        const user: User = await this.prisma.user.delete({
            where: { id }
        })
    }
} 