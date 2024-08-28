import { Request, Response } from "express";
import { CreateUserRequest } from "../controllers/UserController";

export default interface IUserController {
    create(req: CreateUserRequest, res: Response): Promise<void>;
    getAll(res: Response): Promise<void>;
    getById(req: Request, res: Response): Promise<void>;
    update(req: Request, res: Response): Promise<void>;
    delete(req: Request, res: Response): Promise<void>;
}