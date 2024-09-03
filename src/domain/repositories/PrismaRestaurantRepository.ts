import { PrismaClient } from "@prisma/client";
import IRestaurantCrud from "../../interfaces/IRestaurantCrud";
import RestaurantDtoParam from "../../dtos/restaurant/RestaurantDtoParam";
import RestaurantDtoReturn from "../../dtos/restaurant/RestaurantDtoReturn";


export default class PrismaRestaurantRepository implements IRestaurantCrud {
    private prisma = new PrismaClient();
  
    public async createRestaurant(restaurantData: RestaurantDtoParam): Promise<RestaurantDtoReturn> {
        const rest = await this.prisma.restaurant.create({
            data: { 
                name: restaurantData.name, 
                street: restaurantData.street,  
                num: restaurantData.num, 
                region: restaurantData.region,
                avaliation: restaurantData.avaliation,
                foodTypes: {
                    connect: restaurantData.foodTypeIds.map((foodId) => ({ id: foodId}))
                }
            },
            include: {
                foodTypes: true
            }

        });
        return new RestaurantDtoReturn(
            rest.id,
            rest.name,
            rest.street,
            rest.num,
            rest.region,
            rest.avaliation,
            rest.foodTypes.map(food => food.name)
          );    
        }

    public async getRestaurants(): Promise<RestaurantDtoReturn[]> {
        const restaurants = await this.prisma.restaurant.findMany({
            include: {
                foodTypes: true
            }
        });

        return restaurants.map((rest) => new RestaurantDtoReturn(
            rest.id,
            rest.name,
            rest.street,
            rest.num,
            rest.region,
            rest.avaliation,
            rest.foodTypes.map(food => food.name)

        ));
    }

    public async getRestaurantById(id: string): Promise<RestaurantDtoReturn | null> {
        const rest = await this.prisma.restaurant.findUnique({
            where: { id },
            include: {
                foodTypes: true
            }
        });
    
        if (!rest) {
            return null;
        }
    
        return new RestaurantDtoReturn(
            rest.id,
            rest.name,
            rest.street,
            rest.num,
            rest.region,
            rest.avaliation,
            rest.foodTypes.map(food => food.name)
        );
    }

    public async updateRestaurant(id: string, restaurantData: RestaurantDtoParam): Promise<RestaurantDtoReturn | null> {
            const rest = await this.prisma.restaurant.update({
                where: { id },
                data: { ...restaurantData },
                include: {
                    foodTypes: true
                }
            });
            if (!rest) return null;

            return new RestaurantDtoReturn(
                rest.id,
                rest.name,
                rest.street,
                rest.num,
                rest.region,
                rest.avaliation,
                rest.foodTypes.map(food => food.name)

            ) 
    }

    public async deleteRestaurant(id: string): Promise<void> {
        await this.prisma.restaurant.delete({
            where: { id }
        })
    }
} 