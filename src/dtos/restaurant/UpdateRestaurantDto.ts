export default class UpdateRestaurantDto {
    constructor(
        public name?: string,
        public street?: string,
        public num?: string,
        public region?: string,
        public avaliation?: number,
        public userIds?: string[],
        public foodTypes?: string[]) {}
}