import PrismaFoodRepository from "../domain/repositories/PrismaFoodRepository";
import IFoodCrud from "../interfaces/IFoodCrud";
import FoodDtoParam from "../dtos/restaurant/FoodDtoParam";
import FoodDtoReturn from "../dtos/restaurant/FoodDtoReturn";

export default class FoodService implements IFoodCrud{
    constructor(repository: PrismaFoodRepository) {
        this.repository = repository; 
    }
    public repository;

    public async createFood(foodData: FoodDtoParam): Promise<FoodDtoReturn> {
        if (!foodData.name || !foodData.name.trim().length) {
            throw new Error("Food type name is required");
        }

        if (foodData.restaurantsIds && !Array.isArray(foodData.restaurantsIds)) {
            throw new Error("Invalid type 'restaurantsIds'");
        }
        
        if (foodData.name && typeof foodData.name !== 'string') {
            throw new Error("Invalid value for 'name'");
        }

        if (!foodData.restaurantsIds) foodData.restaurantsIds = [];
        console.log(foodData.restaurantsIds)
        return this.repository.createFood(foodData);
    }
    
    public getFoodById(id: string): Promise<FoodDtoReturn | null> {
        return this.repository.getFoodById(id);
        
    }

    public async getFoods(): Promise<FoodDtoReturn[]> {
        return this.repository.getFoods();
        
    }

    public async updateFood(id: string, foodData: FoodDtoParam): Promise<FoodDtoReturn | null> {
        if (!id) throw new Error("Food id is required");

        if (foodData.name && typeof foodData.name !== 'string') {
            throw new Error("Invalid value for 'name'");
        };
        if (foodData.restaurantsIds && typeof !foodData.restaurantsIds.length) {
            throw new Error("Invalid value for 'restaurantsIds'");
        };

        return this.repository.updateFood(id, foodData);
    }

    public async deleteFood(id: string): Promise<void> { 
        if (!id) throw new Error("Food id is required");
        return this.repository.deleteFood(id);
    }
}