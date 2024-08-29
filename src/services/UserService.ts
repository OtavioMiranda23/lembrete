import { Prisma } from "@prisma/client";
import { User } from "../domain/entities/User";
import PrismaUserRepository from "../domain/repositories/PrismaUserRepository";
import IUserCrud from "../interfaces/IUserCrud";

export default class UserService implements IUserCrud{
    constructor(repository: PrismaUserRepository) {
        this.repository = repository; 
    }
    public repository;
    
    public createUser(nickname: string): Promise<User> {
        if (!nickname || !nickname.trim().length) throw new Error("Nickname is required");
        try {
            return this.repository.createUser(nickname);
            
        } catch (error) {
            if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === "P2002") {
                throw new Error("The nickname needs to be unique");   
            } else {
                throw error;
            }
        }
    }

    public getUsers(): Promise<User[]> {
        return this.repository.getUsers();
    }

    public getUserById(id: string): Promise<User | null> {
        return this.repository.getUserById(id);
    }

    public updateUser(id: string, nickname: string): Promise<User | null> {
        if (!id) throw new Error("Id is required");
        if (!nickname || nickname.trim().length === 0) throw new Error("Nickname is required");
        try {
            return this.repository.updateUser(id, nickname);
        } catch (error) {
            if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === "P2002") {
                throw new Error("The nickname needs to be unique");   
            } else {
                throw error;
            }
        }
    }

    public deleteUser(id: string): Promise<void> {
        if (!id) throw new Error("Id is required");
        return this.repository.deleteUser(id);
    }
}