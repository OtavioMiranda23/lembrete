import { FoodType } from "@prisma/client";
import { User } from "./User";

export default class Restaurant {
    constructor(
        public id: string, 
        public name: string,
        public street: string | null,
        public num: string | null,
        public region: string | null,
        public avaliation: number | null,
        public users: User[],
        public foodTypes: FoodType[]
    ) {}
}