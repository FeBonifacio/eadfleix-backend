

// Aqui nos vamos deixar as nossas rotas(links de viagem) seguros, só que tiver autorização poderar usar(navegar pelo site)

import { NextFunction, Request, Response } from "express";
import { JwtPayload } from "jsonwebtoken";
import { UserCreationAttributes } from "../models/User";
import { jwtService } from "../services/jwtServices";
import { userService } from "../services/userService";

export interface AuthenticatedRequest extends Request {
    user?: UserCreationAttributes | null
}

export function ensureAuth(req: AuthenticatedRequest, res: Response, next: NextFunction) {
    const authorizationHeader = req.headers.authorization 

    if (!authorizationHeader) return res.status(401).json({
        message: 'Não autorizado: nenhum token foi encontrado.'
    })

    const token = authorizationHeader.replace(/Bearer /, '')

    jwtService.verifyToken(token, async (error, decoded) => {
        if (error || typeof decoded === 'undefined') return res.status(401).json({
            message: 'Não autorizado: token inválido.'
        })

        // Vai devolver um usuario
        const user = await userService.findByEmail((decoded as JwtPayload).email)
            req.user = user
            next()
    })
}

export function ensureAuthViaQuery(req: AuthenticatedRequest, res: Response, next: NextFunction) {
    const { token } = req.query
    console.log(token)

    if (!token) return res.status(401).json({
        message: 'Não autorizado: nenhum token foi encontrado.'
    })

    if (typeof token !== 'string') return res.status(400).json({
        message: 'O parâmetro token deve ser do tipo string'
    })

    jwtService.verifyToken(token, async (error, decoded) => {
        if (error || typeof decoded === 'undefined') return res.status(401).json({
            message: 'Não autorizado: token inválido.'
        })

        const user = await userService.findByEmail((decoded as JwtPayload).email)
        req.user = user
        next()
    })

}
