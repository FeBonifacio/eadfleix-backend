

import { ResourceWithOptions } from 'adminjs';
import { Category, Course, Episode, User } from '../../models';
import { categoryResourceOptions } from './category';
import { courseResourceOptions, courseResourceFeatures } from './course';
import { episodeResourceOptions, episodeResourceFeatures } from './episode';
import { userResourceOptions } from './user';


// Lista de recursos da aplicação

export const adminJsResources: ResourceWithOptions[] = [
    {
        resource: Category,
        options: categoryResourceOptions
    },
    {
        resource: Course,
        options: courseResourceOptions,
        features: courseResourceFeatures
    },
    {
        resource: Episode,
        options: episodeResourceOptions,
        features: episodeResourceFeatures
    },
    {
        resource: User,
        options: userResourceOptions
    }
]