import { Request, Response } from "express";
import UserService from "../services/UserService";
import { User } from "../domain/entities/User";
import IRestaurantController from "../interfaces/IRestaurantController";
import RestaurantService from "../services/RestaurantService";
import RestaurantDtoReturn from "../dtos/restaurant/RestaurantDtoReturn";


export default class RestaurantController implements IRestaurantController{
    constructor(service: RestaurantService) {
        this.service = service;
    }

    public service;

    public async create(req: Request, res: Response): Promise<void> {
        try {
            const { name, foodTypeIds, userIds } = req.body as {
                name: string,
                foodTypeIds: string[],
                userIds: string[]
            }
            if (!name || !name.trim().length) {
                res.status(400).json({ error: "Name is required"})
                return
            }

            if (!foodTypeIds.length) {
                res.status(400).json({ error: "FoodTypeIds is required"})
                return
            }
            if (!userIds.length) {
                res.status(400).json({ error: "UserIds is required"})
                return
            }
            const restaurant = await this.service.createRestaurant(req.body);
            res.status(201).json(restaurant);
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
            const restaurants = await this.service.getRestaurants();   
            res.status(200).json(restaurants);
        } catch (error: unknown) {
            if (error instanceof Error) res.status(400).json({ error: error.message});
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
            const restaurant: RestaurantDtoReturn | null = await this.service.getRestaurantById(id.toString());
            if (!restaurant) {
                res.status(404).json({ error: "User not found"})
                return
            }
            res.status(200).json(restaurant);

            
        } catch (error: unknown) {
            if (error instanceof Error) res.status(400).json({ error: error.message});
            else res.status(500).json({ error: "An unexpected error occurred"});
        }   
    }

    public async update(req: Request, res: Response): Promise<void> {
        try {
            const id = req.params.id;
            if (!id) {
                res.status(400).json({ error: "Id and nickname is required"})
                return
            }
            const restaurant: RestaurantDtoReturn | null = await this.service.updateRestaurant(id.toString(), req.body);
            if (!restaurant) {
                res.status(404).json({ error: "Restaurant not foud"})
                return
            }
            res.status(200).json(restaurant);
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
            await this.service.deleteRestaurant(id.toString());
            res.status(204).send();
        } catch (error: unknown) {
            if (error instanceof Error) res.status(400).json({ error: error});
            else res.status(500).json({ error: "An unexpected error occurred"});    
        }  
    }

}
