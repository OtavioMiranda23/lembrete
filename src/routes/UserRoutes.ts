import { Router } from "express";
import UserController from "../controllers/UserController";
import PrismaUserRepository from "../domain/repositories/PrismaUserRepository";
import UserService from "../services/UserService";

const userController = new UserController(new UserService(new PrismaUserRepository()));
const router = Router();

router.post('/users', (req, res) => userController.create(req, res));
router.get('/users', (_, res) => userController.getAll(res));
router.get('/users/:id', (req, res) => userController.getById(req, res));
router.put('/users/:id', (req, res) => userController.update(req, res));
router.delete('/users/:id', (req, res) => userController.delete(req, res));

export default router;