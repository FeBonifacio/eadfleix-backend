import { Request, Response } from 'express'
import { jwtService } from '../services/jwtServices'
import { userService } from '../services/userService'

export const authController = {
  // POST /auth/register
register: async (req: Request, res: Response) => {
const { firstName, lastName, phone, birth, email, password } = req.body

try {
    const userAlreadyExists = await userService.findByEmail(email)

    if (userAlreadyExists) {
    throw new Error('Este e-mail já está cadastrado.')
    }

    // Novo usuario
    const user = await userService.create({
    firstName,
    lastName,
    phone,
    birth,
    email,
    password,
    role: 'user'
    })

    return res.status(201).json(user)
} catch (err) {
    if (err instanceof Error) {
    return res.status(400).json({ message: err.message })
            }
        }
    },

    // Post /auth/login
    login: async (req: Request, res: Response) => {
        const { email, password } = req.body

        try {
            const user = await userService.findByEmail(email)

            if (!user) return res.status(404).json({ message: 'Email não encontrado.' })

            user.checkPassword(password, (error, isSame) => {
                if (error) {
                    //Erro do sistema
                    if (error) return res.status(400).json({ message: error.message})

                    // Não achou a senha
                    if(!isSame) return res.status(401).json({ message: 'Senha incorreta '})

                    // Aqui vamos criar o token
                    // Vamos deixar as informações facil de ver
                    // Mas só o necessário para a segurança do cliente
                    //Da um beijo na minha boca ?
                    const payload = {
                        id: user.id,
                        firstName: user.firstName,
                        email: user.email
                    }

                    const token = jwtService.signToken(payload, '7d') // Esse 7d é o token vai expirar em 3 dias

                    return res.json({ authenticated: true, ...payload, token })
                }
            })
        } catch (error) {
            if (error instanceof Error) {
                return res.status(400).json({ message: error.message })
            }
        }
    }
}

