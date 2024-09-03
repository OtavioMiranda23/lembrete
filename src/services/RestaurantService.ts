import IRestaurantCrud from "../interfaces/IRestaurantCrud";
import RestaurantDtoParam from "../dtos/restaurant/RestaurantDtoParam";
import RestaurantDtoReturn from "../dtos/restaurant/RestaurantDtoReturn";
import PrismaRestaurantRepository from "../domain/repositories/PrismaRestaurantRepository";

export default class RestaurantService implements IRestaurantCrud{
    constructor(repository: PrismaRestaurantRepository) {
        this.repository = repository; 
    }
    public repository;


    public createRestaurant(restaurantData: RestaurantDtoParam): Promise<RestaurantDtoReturn> {
        if (!restaurantData.name || !restaurantData.name.trim().length) {
            throw new Error("Restaurant name is required");
        }
        if (!restaurantData.userIds || !restaurantData.userIds.length) {
            throw new Error("Restaurant id is required");
        }
        if (!restaurantData.foodTypeIds || !restaurantData.foodTypeIds.length) {
            throw new Error("Food type id is required");
        }
        
        if (restaurantData.name && typeof restaurantData.name !== 'string') {
            throw new Error("Invalid value for 'name'");
        }
        if (restaurantData.street && typeof restaurantData.street !== 'string') {
            throw new Error("Invalid value for 'street'");
        }
        if (restaurantData.num && typeof restaurantData.num !== 'string') {
            throw new Error("Invalid value for 'num'");
        }
        if (restaurantData.region && typeof restaurantData.region !== 'string') {
            throw new Error("Invalid value for 'region'");
        }
        if (restaurantData.avaliation && typeof restaurantData.avaliation !== 'number' && 
            (restaurantData.avaliation < 0 || restaurantData.avaliation > 5)) {
            throw new Error("Invalid value for 'avaliation'");
        }
        
        return this.repository.createRestaurant(restaurantData);
    }
    
    public getRestaurantById(id: string): Promise<RestaurantDtoReturn | null> {
        return this.repository.getRestaurantById(id);
    }

    public getRestaurants(): Promise<RestaurantDtoReturn[]> {
        return this.repository.getRestaurants();
    }

    public updateRestaurant(id: string, restaurantData: RestaurantDtoParam): Promise<RestaurantDtoReturn | null> {
        if (!id) throw new Error("Restaurant id is required");

        if (restaurantData.name && typeof restaurantData.name !== 'string') {
            throw new Error("Invalid value for 'name'");
        }
        if (restaurantData.street && typeof restaurantData.street !== 'string') {
            throw new Error("Invalid value for 'street'");
        }
        if (restaurantData.num && typeof restaurantData.num !== 'string') {
            throw new Error("Invalid value for 'num'");
        }
        if (restaurantData.region && typeof restaurantData.region !== 'string') {
            throw new Error("Invalid value for 'region'");
        }
        if (restaurantData.avaliation && typeof restaurantData.avaliation !== 'number') {
            throw new Error("Invalid value for 'avaliation'");
        }
        return this.repository.updateRestaurant(id, restaurantData);
    }

    public deleteRestaurant(id: string): Promise<void> {
        if (!id) throw new Error("Restaurant id is required");
        return this.repository.deleteRestaurant(id);
    }
}