
import { adminJsResources } from './resources/index';
import AdminJS from "adminjs"
import AdminJSExpress from "@adminjs/express"
import AdminJSSequelize from "@adminjs/sequelize"
import { sequelize } from './../database/seeders/index';
import { User } from "../models"
import bcrypt from "bcrypt"

AdminJS.registerAdapter(AdminJSSequelize)

export const adminJs = new AdminJS({
    databases: [sequelize],
    rootPath: "/admin",
    resources: adminJsResources,
    branding: {
        companyName: 'Educa',
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