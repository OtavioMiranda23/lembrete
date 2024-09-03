import { Router } from "express";
import UserController from "../controllers/UserController";
import PrismaUserRepository from "../domain/repositories/PrismaUserRepository";
import UserService from "../services/UserService";
import RestaurantController from "../controllers/RestaurantController";
import RestaurantService from "../services/RestaurantService";
import PrismaRestaurantRepository from "../domain/repositories/PrismaRestaurantRepository";
import FoodController from "../controllers/FoodController";
import FoodService from "../services/FoodService";
import PrismaFoodRepository from "../domain/repositories/PrismaFoodRepository";

const userController = new UserController(new UserService(new PrismaUserRepository()));
const restaurantController = new RestaurantController(new RestaurantService(new PrismaRestaurantRepository()));
const foodController = new FoodController(new FoodService(new PrismaFoodRepository()));

const router = Router();

router.post('/users', (req, res) => userController.create(req, res));
router.get('/users', (_, res) => userController.getAll(res));
router.get('/users/:id', (req, res) => userController.getById(req, res));
router.put('/users/:id', (req, res) => userController.update(req, res));
router.delete('/users/:id', (req, res) => userController.delete(req, res));

router.get('/restaurant', (req, res) => restaurantController.create(req, res));
router.get('/restaurant', (_, res) => restaurantController.getAll(res));
router.get('/restaurant/:id', (req, res) => restaurantController.getById(req, res));
router.put('/restaurant/:id', (req, res) => restaurantController.update(req, res));
router.delete('/restaurant/:id', (req, res) => restaurantController.delete(req, res));

router.get('/food', (req, res) => foodController.create(req, res));
router.get('/food', (_, res) => foodController.getAll(res));
router.get('/food/:id', (req, res) => foodController.getById(req, res));
router.put('/food/:id', (req, res) => foodController.update(req, res));
router.delete('/food/:id', (req, res) => foodController.delete(req, res));

export default router;