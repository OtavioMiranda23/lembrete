import RestaurantDtoReturn from "./RestaurantDtoReturn";

export default class FoodDtoReturn {
    constructor(
        public id: string,
        public name: string,
        public restaurants?: Omit<RestaurantDtoReturn, 'foodType'>[],
) {}
}