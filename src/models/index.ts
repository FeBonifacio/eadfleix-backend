// aqui se faz o relacionamento das tabelas
import { Category } from './Category';
import { Course } from './Courses';

Category.hasMany(Course)

Course.belongsTo(Category)

export {
    Category,
    Course
}