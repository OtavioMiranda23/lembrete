import { Prisma, PrismaClient } from "@prisma/client";
import { User } from "../entities/User";
import IUserCrud from "../../interfaces/IUserCrud";
import Restaurant from "../entities/Restaurant";
import IRestaurantCrud from "../../interfaces/IRestaurantCrud";


export default class PrismaRestaurantRepository implements IRestaurantCrud {
    private prisma = new PrismaClient();
  
    public async createRestaurant(restaurantData: Omit<Restaurant, 'id'>): Promise<Restaurant> {
        const restaurant = await this.prisma.restaurant.create({
            data: { 
                name: restaurantData.name, 
                street: restaurantData.street,  
                num: restaurantData.num, 
                region: restaurantData.region,
            } 
        });
        return new Restaurant(
            restaurant.id,
            restaurant.name,
            restaurant.street,
            restaurant.num,
            restaurant.region
          );    
        }

    public async getRestaurants(): Promise<Restaurant[]> {
        const restaurants: Restaurant[] = await this.prisma.restaurant.findMany();
        return restaurants.map((rest: Restaurant) => new Restaurant(
            rest.id,
            rest.name,
            rest.street,
            rest.num,
            rest.region
        ));
    }

    public async getRestaurantById(id: string): Promise<Restaurant | null> {
        const rest: Restaurant | null = await this.prisma.restaurant.findUnique({
            where: { id }
        });
        return rest ? new Restaurant(
            rest.id,
            rest.name,
            rest.street,
            rest.num,
            rest.region) : null;
    }

    public async updateRestaurant(id: string, restaurantData: Partial<Omit<Restaurant, 'id'>>): Promise<Restaurant | null> {
            const rest: Restaurant | null = await this.prisma.restaurant.update({
                where: { id },
                data: { ...restaurantData }
            });
            
            return rest ?  new Restaurant(
                rest.id,
                rest.name,
                rest.street,
                rest.num,
                rest.region
            )   : null;
    }

    public async deleteRestaurant(id: string): Promise<void> {
        await this.prisma.user.delete({
            where: { id }
        })
    }
} 