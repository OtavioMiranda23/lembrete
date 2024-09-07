import Restaurant from "./Restaurant";
import { User } from "./User";

export default class FoodType {
    constructor(
        public id: string,
        public name: string,
        public restaurants: Restaurant[],
    ){}
}