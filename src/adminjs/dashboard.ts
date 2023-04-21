import AdminJS, { PageHandler } from "adminjs"
import { Category, Course, Episode, User } from "../models"

export const dashboardOptions: {
    handler?: PageHandler
    component?: string
} = {
    component: AdminJS.bundle("./components/Dashboard"),
    //Aqui conta o numeros de tudo que tem
    handler: async (req, res, context) => {
        const courses = await Course.count()
        const episodes = await Episode.count()
        const categories = await Category.count()
        const standardUsers = await User.count({ where: { role: 'user' } } )

        // Aqui fica bonitinho para ver, poderia fazer em gráficos ou igual a gorda da sua mae
        res.json({
            'Cursos': courses,
            'Episódios': episodes,
            'Categories': categories,
            'Usuários': standardUsers
        })
    }
}