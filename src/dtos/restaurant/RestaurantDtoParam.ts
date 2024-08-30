export default class RestaurantDtoParam {
    constructor(
        public name: string,
        public street: string | null,
        public num: string | null,
        public region: string | null,
        public avaliation: number | null,
        public userIds: string[],
        public foodTypeIds: string[]) {}
}