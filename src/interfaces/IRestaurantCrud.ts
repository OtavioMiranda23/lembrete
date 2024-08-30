import RestaurantDtoParam from "../dtos/restaurant/RestaurantDtoParam";
import RestaurantDtoReturn from "../dtos/restaurant/RestaurantDtoReturn";

export default interface IRestaurantCrud {
    createRestaurant(restaurantData: RestaurantDtoParam): Promise<RestaurantDtoReturn>;
    getRestaurants(): Promise<RestaurantDtoReturn[]>;
    getRestaurantById(id: string): Promise<RestaurantDtoReturn | null>;
    updateRestaurant(id: string, restaurantData: RestaurantDtoParam): Promise<RestaurantDtoReturn | null>;
    deleteRestaurant(id: string): Promise<void>;
}