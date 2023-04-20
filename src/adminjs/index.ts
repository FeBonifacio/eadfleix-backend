
import { adminJsResources } from './resources/index';
import AdminJS from "adminjs"
import AdminJSExpress from "@adminjs/express"
import AdminJSSequelize from "@adminjs/sequelize"
import { sequelize } from './../database/seeders/index';
import { Category, Course, Episode, User } from "../models"
import bcrypt from "bcrypt"
import { locale } from './locale';

AdminJS.registerAdapter(AdminJSSequelize)

export const adminJs = new AdminJS({
    databases: [sequelize],
    rootPath: "/admin",
    resources: adminJsResources,
    branding: {
        companyName: 'EducaPlayTec',
        logo: '/onebitflix.svg',
        theme: {
        colors: {
            primary100: '#ff0043',
            primary80: '#ff1a57',
            primary60: '#ff3369',
            primary40: '#ff4d7c',
            primary20: '#ff668f',
            grey100: '#151515',
            grey80: '#333333',
            grey60: '#4d4d4d',
            grey40: '#666666',
            grey20: '#dddddd',
            filterBg: '#333333',
            accent: '#151515',
            hoverBg: '#151515',
        }
    }
    },
    //importa aqui para traduzir
    locale: locale,
    //Propriedade para alterar o layout, essa ferramente é do REACT
    dashboard: {
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
})

//Esse código é para habilitar a autenticação dos logins
export const adminJsRouter = AdminJSExpress.buildAuthenticatedRouter(adminJs, {
    authenticate: async (email, password) => {
        const user = await User.findOne({ where: { email }})

        if (user && user.role === 'admin') {
            // Se a senha é igual á cadastrada
            const matched = await bcrypt.compare(password, user.password)

            if (matched) {
                return user
            }
        }

        // Se não for
        return false
    },
    // Aqui captura as senha salvas
    cookiePassword: 'senha-do-cookie'
},
// Isso aqui é para a IDE entender q estou usando bibliotecas desatualizada, pq a antiga está melhor que a nova
null, {
    resave: false,
    saveUninitialized: false
})