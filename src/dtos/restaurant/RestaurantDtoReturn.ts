export default class RestaurantDtoReturn {
    constructor(
        public id: string, 
        public name: string,
        public street: string | null,
        public num: string | null,
        public region: string | null,
        public avaliation: number | null,
        public foodType: string[]
) {}
}