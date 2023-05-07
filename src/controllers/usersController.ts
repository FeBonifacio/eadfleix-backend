import { userService } from './../services/userService';
import { response, Response } from "express";
import { AuthenticatedRequest } from "../middlewares/auth";



export const usersController = {

    // Pegar informações de quem está logado
    show: async (req: AuthenticatedRequest, res: Response) => {
        
        try {
            const currentUser = req.user!
            return res.json(currentUser)
        } catch (error) {
            if (error instanceof Error) {
                return res.status(400).json({ message: error.message })
            }
        }
    },

    // PUT /users/current
    update: async (req: AuthenticatedRequest, res: Response) => {
        const { id } = req.user!
        const { firstName, lastName, phone, email, birth } = req.body

        try {
            const updatedUser = await userService.update(id!, {
                firstName,
                lastName,
                phone,
                email,
                birth
            })

        } catch (error) {
            if (error instanceof Error) {
                return res.status(400).json({ message: error.message })
            }
        }
    },

    // PUT /users/current/password
    updatePassword: async (req: AuthenticatedRequest, res: Response) => {
        const user = req.user
        const { currentPassword, newPassword } = req.body

        if (!user) {
        return res.status(401).json({ message: 'Não autorizado!' })
        }

        
        try {
            user.checkPassword(currentPassword, async (error, isSame) => {
            if (error) {
                return res.status(400).json({ message: error.message })
            }

            if (!isSame) {
            return res.status(400).json({ message: 'Senha incorreta' })
            }

            await userService.updatePassword(user.id!, newPassword)
            return res.status(204).send()
        })
        } catch (err) {
        if (err instanceof Error) {
            return res.status(400).json({ message: err.message })
            }
        }

    },

    // GET /users/current/watching
    watching: async (req: AuthenticatedRequest, res: Response) => {
        const { id } = req.user!

        try {
            const watching = await userService.getKeepWatchingList(id!)
            return response.json(watching)
        } catch (error) {
            if (error instanceof Error) {
                return res.status(400).json({ message: error.message})
            }
        }
    }
}