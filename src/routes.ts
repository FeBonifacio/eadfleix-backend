import { coursesController } from './controllers/coursesController';
// Aqui vai ficar todas as rotas

import express from 'express'
import { categoriesController } from './controllers/categoriesController';
import { episodesController } from './controllers/episodesController';

const router = express.Router()

// A ordem das rotas importam, pq ele testa em ordem
router.get('/categories', categoriesController.index)

router.get('/categories/:id', categoriesController.show)

router.get('/courses/featured', coursesController.featured)

router.get('/courses/newest', coursesController.newest)

router.get('/courses/search', coursesController.search)

router.get('/courses/:id', coursesController.show)

router.get('/episodes/stream', episodesController.stream)

export { router }