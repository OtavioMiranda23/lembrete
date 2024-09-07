import { Request, Response } from "express";
import UserService from "../services/UserService";
import { User } from "../domain/entities/User";
import IRestaurantController from "../interfaces/IRestaurantController";
import RestaurantService from "../services/RestaurantService";
import RestaurantDtoReturn from "../dtos/restaurant/RestaurantDtoReturn";
import { BadRequestError, NotFoundError } from "../errors/apiErrors";


export default class RestaurantController implements IRestaurantController{
    constructor(service: RestaurantService) {
        this.service = service;
    }

    public service;

    public async create(req: Request, res: Response): Promise<void> {
        const { name, userIds } = req.body as {
            name: string,
            foodTypeIds: string[],
            userIds: string[]
        }
        if (!name || !name.trim().length) {
            throw new BadRequestError("Invalid value for 'name'");
            
        }

        if (!userIds.length) {
            throw new BadRequestError("Invalid value for 'userIds'");
            
        }
        const restaurant = await this.service.createRestaurant(req.body);
        res.status(201).json(restaurant);

    }
    
    public async getAll(res: Response): Promise<void> {
        const restaurants = await this.service.getRestaurants();   
        res.status(200).json(restaurants);
    }

    public async getById(req: Request, res: Response): Promise<void> {
        const id = req.params.id;
        if (!id) {
            throw new BadRequestError("Invalid value for 'id'");
        }
        const restaurant: RestaurantDtoReturn | null = await this.service.getRestaurantById(id.toString());
        if (!restaurant) {
            throw new NotFoundError("Restaurant not foud");
        }
        res.status(200).json(restaurant);
    }

    public async update(req: Request, res: Response): Promise<void> {
            const id = req.params.id;
            if (!id) {
                throw new BadRequestError("Invalid value for 'name'");
            }
            const restaurant: RestaurantDtoReturn | null = await this.service.updateRestaurant(id.toString(), req.body);
            if (!restaurant) {
                throw new NotFoundError("Restaurant not found");
            }
            res.status(200).json(restaurant);
    }

    public async delete(req: Request, res: Response): Promise<void> {
            const id = req.params.id;
            if (!id ) {
                throw new BadRequestError("Invalid value for 'id'");
            }
            await this.service.deleteRestaurant(id.toString());
            res.status(204).send();
    }

}
