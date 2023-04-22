import { Op } from 'sequelize';
import { Course } from './../models';


export const courseService = {
    findByIdWithEpisodes: async (id: string) => {
        const courseWithEpisodes = await Course.findByPk(id, {
            attributes: [
                'id',
                'name',
                'synopsis',
                ['thumbnail_url', 'thumbnailUrl']
            ],
            include: {
                association: 'Episodes',
                attributes: [
                    'id',
                    'name',
                    'synopsis',
                    'order',
                    ['video_url', 'videoUrl'],
                    ['seconds_long', 'secondsLong']
                ],
                order: [['order', 'ASC']],
                separate: true // Vi que o order só funcionar se tiver o separate como true, na documentação
            }
        })

        return courseWithEpisodes
    },

    getRandomFeaturedCourses: async () => {
        const featuredCourses = await Course.findAll({
            attributes: [
                'id',
                'name',
                'synopsis',
                ['thumbnail_url', 'thumbnailUrl']
            ],
            where: {
                featured: true
            }
        })

        // Isso aqui é para pegar os 3 principais cursos e deixar em destaque, peguei isso na documentação e em um curso que fiz
        // Agora tem que incluir no metodo do controlador
        const randomFeaturedCourses = featuredCourses.sort(() => 0.5 - Math.random())

        return randomFeaturedCourses.slice(0, 3)
    },

    // Função para buscar os 10 novos cursos
    getTopTenNewest: async () => {
        const courses = await Course.findAll({
            limit: 10,
            order: [['created_at', 'DESC']]
        })

        return courses
    },

    //Buscando cursos pelo nome
    findByName: async (name: string, page: number, perPage: number) => {
        const offset = (page - 1) * perPage

        const { count, rows } = await Course.findAndCountAll({
            attributes: [
                'id',
                'name',
                'synopsis',
                ['thumbnail_url', 'thumbnailUrl']
            ],
            where: {
                //Aqui é para buscar os nomes e não comparar com IDs
                name: {
                    [Op.iLike]: `%${name}%` // Isso aqui é para buscar em qualquer locar da string o nome
                }
            },
            limit: perPage,
            offset
        })

        return {
            courses: rows,
            page,
            perPage,
            total: count
        }
    }
}