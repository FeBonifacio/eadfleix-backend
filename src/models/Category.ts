//Essa tela faz referencia com o banco e deixa os comandos exportados para outras telas

import { DataTypes, Optional, Model } from "sequelize"
import { sequelize } from "../database/seeders"


export interface Category {
    id: number
    name: string
    position: number
}

// Esses comandos servem para deixar o type mais preciso e o projeto facil de programar

export interface CategoryCreationAttributes extends Optional<Category, 'id'> { }

export interface CategoryInstace extends Model<Category, CategoryCreationAttributes>, Category { }

// Esse define vai criar a extancia dentro do Model no sequelize
export const Category = sequelize.define<CategoryInstace, Category>('Category', {
    id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
    },
    name: {
        allowNull: false,
        type: DataTypes.STRING
    },
    position: {
        allowNull: false,
        unique: true,
        type: DataTypes.INTEGER
    }
})




