import { Request, Response } from "express";

export default interface IFoodController {
    create(req: Request, res: Response): Promise<void>;
    getAll(res: Response): Promise<void>;
    getById(req: Request, res: Response): Promise<void>;
    update(req: Request, res: Response): Promise<void>;
    delete(req: Request, res: Response): Promise<void>;
}