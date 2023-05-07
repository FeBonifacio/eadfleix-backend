import { likesController } from './controllers/likesController';
import { favoritesController } from './controllers/favoritesController';
import express from 'express'
import { authController } from './controllers/authController';
import { coursesController } from './controllers/coursesController';
import { categoriesController } from './controllers/categoriesController';
import { episodesController } from './controllers/episodesController';
import { ensureAuth, ensureAuthViaQuery } from './middlewares/auth';

// Aqui vai ficar todas as rotas
const router = express.Router()

// A ordem das rotas importam, pq ele testa em ordem
// Esse ensureAuth é a proteção das rotas

router.post('/auth/register', authController.register)
router.post('/auth/login', authController.login)


// Rotas das categorias
router.get('/categories', ensureAuth, categoriesController.index)
router.get('/categories/:id', ensureAuth, categoriesController.show)


// Rotas dos cursos
router.get('/courses/featured', ensureAuth, coursesController.featured)
router.get('/courses/newest', coursesController.newest)
router.get('/courses/search', ensureAuth, coursesController.search)
router.get('/courses/:id', ensureAuth, coursesController.show)

// Rota dos episodios
router.get('/episodes/stream', ensureAuthViaQuery, episodesController.stream)


//Rotas favoritos
router.get('/favorites', ensureAuth, favoritesController.index)
router.post('/favorites', ensureAuth, favoritesController.save)
router.delete('/favorites/:id', ensureAuth, favoritesController.delete)

//Likes
router.post('/likes', ensureAuth, likesController.save)
router.delete('/likes/:id', ensureAuth, likesController.delete)

export { router }