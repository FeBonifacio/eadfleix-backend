import { Response } from 'express'
import { AuthenticatedRequest } from "../middlewares/auth";
import { favoriteService } from '../services/favoriteService'

export const favoritesController = {
    // GET /favorite
    index: async (req: AuthenticatedRequest, res: Response) => {
        const userId = req.user!.id

        try {
            const favorites = await favoriteService.findByUserId(userId!)
            return res.json(favorites)
        } catch (error) {
            if (error instanceof Error) {
                return res.status(400).json({ message: error.message })
            }
        }
    },

 // POST /favorites
    save: async (req: AuthenticatedRequest, res: Response) => {
    const userId = req.user!.id
    const { courseId } = req.body

    try {
        const favorite = await favoriteService.create(userId!, Number(courseId)) // Tava dando erro ai coloquei o !
        return res.status(201).json(favorite)
    } catch (error) {
        if (error instanceof Error) {
        return res.status(400).json({ message: error.message })
            }
        }
    },

    //DELETE /favorited/:id
    delete: async (req: AuthenticatedRequest, res: Response) => {
        const userId = req.user!.id
        const courseId = req.params.id

        try {
            await favoriteService.delete(userId!, Number(courseId)) 
            return res.status(200).send()
        } catch (error) {
            if (error instanceof Error) {
                return res.status(400).json({ message: error.message })
            }
        }
    }
}