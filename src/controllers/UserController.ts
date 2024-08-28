import { Request, Response } from "express";
import UserService from "../services/UserService";
import { User } from "../domain/entities/User";
import IUserController from "../interfaces/IUserController";
import { error } from "console";
import { Prisma } from "@prisma/client";

export interface CreateUserRequest {
    body: {
        nickname?: string;
    }
}

export default class UserController implements IUserController{
    constructor(service: UserService) {
        this.service = service;
    }

    public service;

    public async create(req: CreateUserRequest, res: Response): Promise<void> {
        try {
            const { nickname } = req.body;
            if (!nickname) {
                res.status(400).json({ error: "Nickname is required"})
                return
            }
                const user: User = await this.service.createUser(nickname);
            res.status(201).json(user);
        } catch (error: unknown) {
            if (error instanceof Error) {
                if (error.message = "The nickname needs to be unique") {
                    res.status(409).json({ error: error}) 
                } else {
                    res.status(500).json({ error: error})
                }
            } else res.status(500).json({ error: "An unexpected error occurred"});
        }
    }
    
    public async getAll(res: Response): Promise<void> {
        try {
            const users: User[] = await this.service.getUsers();   
            res.status(200).json(users);
        } catch (error: unknown) {
            if (error instanceof Error) res.status(400).json({ error: error.message});
            else res.status(500).json({ error: "An unexpected error occurred"});
        }
    }

    public async getById(req: Request, res: Response): Promise<void> {
        try {
            const id = req.params.id;
            console.log({id})
            if (!id) {
                res.status(400).json({ error: "Nickname is required"})
                return
            }
            const user: User | null = await this.service.getUserById(id.toString());
            if (!user) {
                res.status(404).json({ error: "User not found"})
                return
            }
            res.status(200).json(user);

            
        } catch (error: unknown) {
            if (error instanceof Error) res.status(400).json({ error: error.message});
            else res.status(500).json({ error: "An unexpected error occurred"});
        }   
    }

    public async update(req: Request, res: Response): Promise<void> {
        try {
            const id = req.params.id;
            const { nickname } = req.body;
            if (!id || !nickname || nickname?.trim().length === 0) {
                res.status(400).json({ error: "Id and nickname is required"})
                return
            }
            const user: User | null = await this.service.updateUser(id.toString(), nickname);
            if (!user) {
                res.status(404).json({ error: "User not foud"})
                return
            }
            res.status(200).json(user);
        } catch (error: unknown) {
            if (error instanceof Error) {
                if (error.message = "The nickname needs to be unique") {
                    res.status(409).json({ error: error}) 
                } else {
                    res.status(500).json({ error: error})
                }
            } else res.status(500).json({ error: "An unexpected error occurred"});
        } 
    }

    public async delete(req: Request, res: Response): Promise<void> {
        try {
            const id = req.params.id;
            if (!id ) {
                res.status(400).json({ error: "Id is required"})
                return
            }
            await this.service.deleteUser(id.toString());
            res.status(204).send();
        } catch (error: unknown) {
            if (error instanceof Error) res.status(400).json({ error: error});
            else res.status(500).json({ error: "An unexpected error occurred"});    
        }  
    }

}
