import { brandingOptions } from './branding';
import { dashboardOptions } from './dashboard';

import { adminJsResources } from './resources/index';
import AdminJS from "adminjs"
import AdminJSExpress from "@adminjs/express"
import AdminJSSequelize from "@adminjs/sequelize"
import { sequelize } from './../database/seeders/index';
import { locale } from './locale';
import { authenticationOptions } from './authentication';

AdminJS.registerAdapter(AdminJSSequelize)

export const adminJs = new AdminJS({
    databases: [sequelize],
    rootPath: "/admin",
    resources: adminJsResources,
    branding: brandingOptions,
    //importa aqui para traduzir
    locale: locale,
    //Propriedade para alterar o layout, essa ferramente é do REACT
    dashboard: dashboardOptions
})

//Esse código é para habilitar a autenticação dos logins
export const adminJsRouter = AdminJSExpress.buildAuthenticatedRouter(
    adminJs, 
    authenticationOptions,
// Isso aqui é para a IDE entender q estou usando bibliotecas desatualizada, pq a antiga está melhor que a nova
null, {
    resave: false,
    saveUninitialized: false
})