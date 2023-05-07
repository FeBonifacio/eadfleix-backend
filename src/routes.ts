import { likesController } from './controllers/likesController';
import { favoritesController } from './controllers/favoritesController';
import express from 'express'
import { authController } from './controllers/authController';
import { coursesController } from './controllers/coursesController';
import { categoriesController } from './controllers/categoriesController';
import { episodesController } from './controllers/episodesController';
import { ensureAuth, ensureAuthViaQuery } from './middlewares/auth';
import { usersController } from './controllers/usersController';

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
router.get('courses/popular', ensureAuth, coursesController.popular)
router.get('/courses/search', ensureAuth, coursesController.search)
router.get('/courses/:id', ensureAuth, coursesController.show)

// Rota dos episodios
router.get('/episodes/stream', ensureAuthViaQuery, episodesController.stream)

router.get('/episodes/:id/watchTime', ensureAuth, episodesController.getWatchTime)
router.post('/episodes/:id/watchTime', ensureAuth, episodesController.setWatchTime)


//Rotas favoritos
router.get('/favorites', ensureAuth, favoritesController.index)
router.post('/favorites', ensureAuth, favoritesController.save)
router.delete('/favorites/:id', ensureAuth, favoritesController.delete)

//Likes
router.post('/likes', ensureAuth, likesController.save)
router.delete('/likes/:id', ensureAuth, likesController.delete)

router.get('/users/current', ensureAuth, usersController.show)
router.put('/users/current', ensureAuth, usersController.update)
router.put('/users/current/password', ensureAuth, usersController.updatePassword)
router.get('/users/current/watching', ensureAuth, usersController.watching)


export { router }