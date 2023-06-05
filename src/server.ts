import { adminJs, adminJsRouter } from './adminjs';
import cors from "cors"
import { sequelize } from './database/seeders';
import express from "express"
import { router } from './routes';

const app = express()

// Estudar sobre os cors depois
app.use(cors())

app.use(express.static('public'))

app.use(express.json())

app.use(adminJs.options.rootPath, adminJsRouter)

app.use(router)

const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
    sequelize.authenticate().then(() => {
        console.log('DB connection successfull')
    })

    console.log(`Server started successfuly at port ${PORT}`)
})