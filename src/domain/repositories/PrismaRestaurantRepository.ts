import { PrismaClient } from "@prisma/client";
import IRestaurantCrud from "../../interfaces/IRestaurantCrud";
import RestaurantDtoParam from "../../dtos/restaurant/RestaurantDtoParam";
import RestaurantDtoReturn from "../../dtos/restaurant/RestaurantDtoReturn";
import { connect } from "http2";
import UpdateRestaurantDto from "../../dtos/restaurant/UpdateRestaurantDto";


export default class PrismaRestaurantRepository implements IRestaurantCrud {
    private prisma = new PrismaClient();
  
    public async createRestaurant(restaurantData: RestaurantDtoParam): Promise<RestaurantDtoReturn> {
        console.log({restaurantData})
        
        const rest = await this.prisma.restaurant.create({
            data: { 
                name: restaurantData.name, 
                street: restaurantData.street,  
                num: restaurantData.num, 
                region: restaurantData.region,
                avaliation: restaurantData.avaliation,
                foodTypes: restaurantData.foodTypes ? {
                    connect: restaurantData.foodTypes.map((foodId) => ({ id: foodId}))
                } : undefined
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

    public async updateRestaurant(id: string, restaurantData: UpdateRestaurantDto): Promise<RestaurantDtoReturn | null> {
        try {

            let data: {
                name?: string,
                street?: string,
                num?: string,
                region?: string,
                avaliation?: number,
                userIds?: string[],
                foodTypes?: { connect: { id: string }[] }
            } = {};

            if (restaurantData.name) {
                data.name = restaurantData.name;
            }
            if (restaurantData.street) {
                data.street = restaurantData.street;
            } 
            if (restaurantData.num) {
                data.num = restaurantData.num;
            } 
            if (restaurantData.region) {
                data.region = restaurantData.region;
            } 
            if (restaurantData.street) {
                data.street = restaurantData.street;
            }
            if (restaurantData.foodTypes) {
                data.foodTypes = {
                    connect: restaurantData.foodTypes.map(foodId => ({ id: foodId}))} 
                } 
            if (restaurantData.avaliation) {
                data.avaliation = restaurantData.avaliation
            }
            if (restaurantData.userIds) {
                data.userIds = restaurantData.userIds; 
            }
            if (Object.keys(data).length === 0) {
                throw new Error("Nenhum dado foi fornecido para atualização.");
            }
            console.log(data)
            const rest = await this.prisma.restaurant.update({
                    where: { id },
                    data: { ...data },
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
    
                ) 

        } catch(e) {
            console.log(e)
            return null;
        }

   
    }

    public async deleteRestaurant(id: string): Promise<void> {
        await this.prisma.restaurant.delete({
            where: { id }
        })
    }
} 