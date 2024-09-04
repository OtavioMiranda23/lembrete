import RestaurantDtoParam from "../dtos/restaurant/RestaurantDtoParam";
import RestaurantDtoReturn from "../dtos/restaurant/RestaurantDtoReturn";
import UpdateRestaurantDto from "../dtos/restaurant/UpdateRestaurantDto";

export default interface IRestaurantCrud {
    createRestaurant(restaurantData: RestaurantDtoParam): Promise<RestaurantDtoReturn>;
    getRestaurants(): Promise<RestaurantDtoReturn[]>;
    getRestaurantById(id: string): Promise<RestaurantDtoReturn | null>;
    updateRestaurant(id: string, restaurantData: UpdateRestaurantDto): Promise<RestaurantDtoReturn | null>;
    deleteRestaurant(id: string): Promise<void>;
}