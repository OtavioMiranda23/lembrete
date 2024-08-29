import Restaurant from "../domain/entities/Restaurant";

export default interface IRestaurantCrud {
    createRestaurant(restaurantData: Restaurant): Promise<Restaurant>;
    getRestaurants(): Promise<Restaurant[] | null>;
    getRestaurantById(id: string): Promise<Restaurant | null>;
    updateRestaurant(id: string, restaurantData: Restaurant): Promise<Restaurant | null>;
    deleteRestaurant(id: string): Promise<void>;
}