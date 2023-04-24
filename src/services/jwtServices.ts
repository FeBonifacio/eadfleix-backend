import jwt from 'jsonwebtoken'

// Aqui é o codigo para senha ficar mais segura e profissional
// Peguei no site JWT

const secret = 'chave-do-jwt' // Isso aqui não ta certo, mas vou deixar assim para estudar mais sobre token

export const jwtService = {
    signToken: (payload: string | object | Buffer, expiration: string) => {
        return jwt.sign(payload, secret, {
            expiresIn: expiration
        })
    }
}