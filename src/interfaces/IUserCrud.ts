import { User } from "../domain/entities/User";

export default interface IUserCrud {
    createUser(nickname: string): Promise<User>;
    getUsers(): Promise<User[] | null>;
    getUserById(id: string): Promise<User | null>;
    updateUser(id: string, nickname: string): Promise<User | null>;
    deleteUser(id: string): Promise<void>;
}