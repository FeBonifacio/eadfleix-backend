import express from 'express'
import { authController } from './controllers/authController';
import { coursesController } from './controllers/coursesController';
import { categoriesController } from './controllers/categoriesController';
import { episodesController } from './controllers/episodesController';

// Aqui vai ficar todas as rotas
const router = express.Router()

// A ordem das rotas importam, pq ele testa em ordem

router.post('/auth/register', authController.register)

router.get('/categories', categoriesController.index)

router.get('/categories/:id', categoriesController.show)

router.get('/courses/featured', coursesController.featured)

router.get('/courses/newest', coursesController.newest)

router.get('/courses/search', coursesController.search)

router.get('/courses/:id', coursesController.show)

router.get('/episodes/stream', episodesController.stream)

export { router }