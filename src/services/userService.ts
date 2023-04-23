import { User } from "../models"
import { UserCreationAttributes } from "../models/User"


// Aqui é vefiricação dos usuarios no banco
export const userService = {
    findByEmail: async (email: string) => {
        const user = await User.findOne({
            where: {
                email: email
            }
        })

        return user
    },

    // criar um novo usuario
    create: async (attributes: UserCreationAttributes) => {
        const user = await User.create(attributes)
        return user
    }
}