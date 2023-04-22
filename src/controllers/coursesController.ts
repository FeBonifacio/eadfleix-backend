import { courseService } from './../services/coursesService';
import { Request, Response } from 'express';


//Faz a mesma coisa do categoriesController, busca de forma organizada para o front-end
export const coursesController = {

    // GET /courses/features
    featured: async (req: Request, res: Response) => {

        //Aqui é o metodo do controlador
        try {
            const featuredCourses = await courseService.getRandomFeaturedCourses()
            return res.json(featuredCourses)
        } catch (error) {
            if (error instanceof Error) {
                return res.status(400).json({ message: error.message })
            } 
        }
    },

    // GET /courses/newest
    newest: async (req: Request, res: Response) => {

        //Aqui é o metodo do controlador
        try {
            const newestCourses = await courseService.getTopTenNewest()
            return res.json(newestCourses)
        } catch (error) {
            if (error instanceof Error) {
                return res.status(400).json({ message: error.message })
            } 
        }
    },

    // GET /courses/:id
    show: async (req: Request, res: Response) => {
        const { id } = req.params

        try {
            const course = await courseService.findByIdWithEpisodes(id)
            return res.json(course)
        } catch (error) {
            if (error instanceof Error) {
                return res.status(400).json({ message: error.message })
            } 
        }
    },  


}