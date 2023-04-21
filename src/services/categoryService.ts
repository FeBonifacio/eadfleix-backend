import { Category } from "../models"

export const categoryService = {
    findAllPaginated: async (page: number, perPage: number) => {
        const offset = (page - 1) * perPage

        const { count, rows } = await Category.findAndCountAll({ // conta todas as categorias e mostra o resultado
            // Aqui é para continar na ordem mesmo depois de alterar alguma informação no back-end
            attributes: ['id', 'name', 'position'],
            order: [['position', 'ASC']],
            limit: perPage,
            offset: offset
        })

        // aqui retorna certinho, só de ler da para entender
        return { 
            categories: rows,
            page: page,
            perPage: perPage,
            total: count
        }
    },

    // aqui retorna os cursos certinho, só de ler da para entender

    findByIdWithCourses: async (id: string) => {
        const categoryWithCourses = await Category.findByPk(id, {
            attributes: ['id', 'name'],
            include: {
                association: 'courses',
                attributes: [
                    'id',
                    'name',
                    'synopsis',
                    ['thumbnail_url', 'thumbnailUrl']
                ]
            }
        })

        return categoryWithCourses

    }
}