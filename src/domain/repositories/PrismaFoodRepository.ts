import { PrismaClient } from "@prisma/client";
import IRestaurantCrud from "../../interfaces/IRestaurantCrud";
import RestaurantDtoParam from "../../dtos/restaurant/RestaurantDtoParam";
import RestaurantDtoReturn from "../../dtos/restaurant/RestaurantDtoReturn";
import IFoodCrud from "../../interfaces/IFoodCrud";
import FoodDtoParam from "../../dtos/restaurant/FoodDtoParam";
import FoodDtoReturn from "../../dtos/restaurant/FoodDtoReturn";


export default class PrismaFoodRepository implements IFoodCrud {
    private prisma = new PrismaClient();

    public async createFood(foodData: FoodDtoParam): Promise<FoodDtoReturn> {
        const food = await this.prisma.foodType.create({
            data: { 
                name: foodData.name,
                restaurants: {
                    connect: foodData.restaurantsIds.map(restId => ({ id: restId }))
                },
                users: {
                    connect: foodData.usersId.map(userId => ({ id: userId }))
                }
            },
            include: {
                restaurants: true
            }
        });

        const restaurantDto = food.restaurants.map(rest => ({
            id: rest.id,
            name: rest.name,
            street: rest.street,
            num: rest.num,
            region: rest.region,
            avaliation: rest.avaliation,
        }))

        return new FoodDtoReturn(
            food.id,
            food.name,
            restaurantDto
        );    
    }
  
    public async getFoods(): Promise<FoodDtoReturn[]> {
        const foods = await this.prisma.foodType.findMany({
            include: {
                restaurants: true
            }
        });

        let restaurants: {
            id: string;
            name: string;
            street: string | null;
            num: string | null;
            region: string | null;
            avaliation: number | null;
        }[]; 

        foods.forEach(food => {
            food.restaurants.forEach(rest => {
                const data = { 
                    id: rest.id,
                    name: rest.name,
                    street: rest.street,
                    num: rest.num,
                    region: rest.region,
                    avaliation: rest.avaliation,
                }
                restaurants.push(data)
            })
        })

        return foods.map((food) => new FoodDtoReturn(
            food.id,
            food.name,
            restaurants,
            
        ));
    }
    public async getFoodById(id: string): Promise<FoodDtoReturn | null> {   
        const food = await this.prisma.foodType.findUnique({
            where: { id },
            include: {
               restaurants : true
            }
        });
    
        if (!food) {
            return null;
        }

        const restaurantDto = food.restaurants.map(rest => ({
            id: rest.id,
            name: rest.name,
            street: rest.street,
            num: rest.num,
            region: rest.region,
            avaliation: rest.avaliation,
        }));

    
        return new FoodDtoReturn(
            food.id,
            food.name,
            restaurantDto
        );
    }

    public async updateFood(id: string, foodData: FoodDtoParam): Promise<FoodDtoReturn | null> {
        const food = await this.prisma.foodType.update({
            where: { id },
            data: { ...foodData },
            include: {
                restaurants: true
            }
        });
        if (!food) return null;

        const restaurantDto = food.restaurants.map(rest => ({
            id: rest.id,
            name: rest.name,
            street: rest.street,
            num: rest.num,
            region: rest.region,
            avaliation: rest.avaliation,
        }));

        return new FoodDtoReturn(
            food.id,
            food.name,
            restaurantDto
        ); 
    }

    public async deleteFood(id: string): Promise<void> {
        await this.prisma.foodType.delete({
            where: { id }
        })
    }
} 