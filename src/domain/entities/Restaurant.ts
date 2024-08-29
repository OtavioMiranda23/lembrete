export default class Restaurant {
    constructor(
        public id: string, 
        public name: string,
        public street: string | null,
        public num: string | null,
        public region: string | null, ) {}
}