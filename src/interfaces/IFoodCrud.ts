import FoodDtoParam from "../dtos/restaurant/FoodDtoParam";
import FoodDtoReturn from "../dtos/restaurant/FoodDtoReturn";

export default interface IFoodCrud {
    createFood(foodData: FoodDtoParam): Promise<FoodDtoReturn>;
    getFoods(): Promise<FoodDtoReturn[]>;
    getFoodById(id: string): Promise<FoodDtoReturn | null>;
    updateFood(id: string, foodData: FoodDtoParam): Promise<FoodDtoReturn | null>;
    deleteFood(id: string): Promise<void>;
}