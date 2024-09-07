import { Request, Response } from "express";
import IFoodController from "../interfaces/IFoodController";
import FoodService from "../services/FoodService";
import FoodDtoReturn from "../dtos/restaurant/FoodDtoReturn";


export default class FoodController implements IFoodController{
    constructor(service: FoodService) {
        this.service = service;
    }

    public service;

    public async create(req: Request, res: Response): Promise<void> {
        console.log('entrou')
        try {
            const { name, restaurantsIds } = req.body as {
                name: string,
                restaurantsIds: string[],
            }
            if (!name || !name.trim().length) {
                res.status(400).json({ error: "Name is required"})
                return
            }

            const restaurant = await this.service.createFood(req.body);
            res.status(201).json(restaurant);
        } catch (error: unknown) {
            if (error instanceof Error) {
                // Verifica mensagens específicas de erro do serviço
                if (error.message === "Food type name is required") {
                    res.status(400).json({ error: error });
                } else if (error.message === "Invalid type 'restaurantsIds'") {
                    res.status(400).json({ error: error });
                } else if (error.message === "User id is required") {
                    res.status(400).json({ error: error });
                } else {
                    // Outros erros inesperados
                    res.status(500).json({ error: "An unexpected error occurred" });
                }
            } else {
                res.status(500).json({ error: "An unexpected error occurred" });
            }
        }
    }
    
    public async getAll(res: Response): Promise<void> {
        console.log("entrou controller")
        try {
            const restaurants = await this.service.getFoods();   
            res.status(200).json(restaurants);
        } catch (error: unknown) {
            if (error instanceof Error) res.status(400).json({ "error": error});
            else res.status(500).json({ error: "An unexpected error occurred"});
        }
    }

    public async getById(req: Request, res: Response): Promise<void> {
        try {
            const id = req.params.id;
            if (!id) {
                res.status(400).json({ error: "Id is required"})
                return
            }
            const food: FoodDtoReturn | null = await this.service.getFoodById(id.toString());
            if (!food) {
                res.status(404).json({ error: "User not found"})
                return
            }
            res.status(200).json(food);

            
        } catch (error: unknown) {
            if (error instanceof Error) res.status(400).json({ error: error.message});
            else res.status(500).json({ error: "An unexpected error occurred"});
        }   
    }

    public async update(req: Request, res: Response): Promise<void> {
        try {
            const id = req.params.id;
            if (!id) {
                res.status(400).json({ error: "Id is required"})
                return
            }
            const food: FoodDtoReturn | null = await this.service.updateFood(id.toString(), req.body);
            if (!food) {
                res.status(404).json({ error: "Restaurant not foud"})
                return
            }
            res.status(200).json(food);
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
            await this.service.deleteFood(id.toString());
            res.status(204).send();
        } catch (error: unknown) {
            if (error instanceof Error) res.status(400).json({ error: error});
            else res.status(500).json({ error: "An unexpected error occurred"});    
        }  
    }

}