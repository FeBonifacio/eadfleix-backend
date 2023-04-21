import { coursesController } from './controllers/coursesController';
// Aqui vai ficar todas as rotas

import express from 'express'
import { categoriesController } from './controllers/categoriesController';

const router = express.Router()

router.get('/categories', categoriesController.index)

router.get('/categories/:id', categoriesController.show)

router.get('/courses/:id', coursesController.show)

export { router }