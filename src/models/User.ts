import { DataTypes, Model, Optional } from "sequelize"
import { sequelize } from "../database/seeders"
import bcrypt from 'bcrypt'


export interface User {
    id: number
    firstName: string
    lastName: string
    phone: string
    birth: Date
    email: string
    password: string
    role: 'admin' | 'user'
}

export interface UserCreationAttributes extends Optional<User, 'id'> { }

export interface UserInstance extends Model<User, UserCreationAttributes>, User { }

//Informações do banco de dados do usuario
export const User = sequelize.define<UserInstance, User>('User', {
    id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
},
    firstName: {
    allowNull: false,
    type: DataTypes.STRING
},
    lastName: {
    allowNull: false,
    type: DataTypes.STRING
},
    phone: {
    allowNull: false,
    type: DataTypes.STRING
},
    birth: {
    allowNull: false,
    type: DataTypes.DATE
},
    email: {
    allowNull: false,
    unique: true,
    type: DataTypes.STRING,
    validate: {
        isEmail: true
    }
},
    password: {
    allowNull: false,
    type: DataTypes.STRING
},
    role: {
    allowNull: false,
    type: DataTypes.STRING,
    validate: {
        isIn: [['admin', 'user']]
        }
    }
}, {
    // Esse código é para esconder as senhas, vem com o pai cachorrada, QUERO CASADAAAAAA
    hooks: {
        beforeSave: async (user) => {
            if (user.isNewRecord || user.changed('password')) {
                user.password = await bcrypt.hash(user.password.toString(), 10)
            }
        }
    }
})