export default class FoodDtoParam {
    constructor(
        public id: string,
        public name: string,
        public restaurantsIds: string[],
        public usersId: string[]
    ){}
}