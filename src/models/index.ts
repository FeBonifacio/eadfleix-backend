import { Episode } from './Episode';
// aqui se faz o relacionamento das tabelas
import { Category } from './Category';
import { Course } from './Courses';

Category.hasMany(Course)

Course.belongsTo(Category)
Course.hasMany(Episode)

Episode.belongsTo(Course)

export {
    Category,
    Course,
    Episode
}