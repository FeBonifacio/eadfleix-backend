import { FeatureType } from 'adminjs';
import { ResourceOptions } from 'adminjs';
import uploadFileFeature from '@adminjs/upload';
import path from 'path';


export const courseResourceOptions : ResourceOptions = {
    navigation: 'Catálogo',
    editProperties: ['name', 'synopsis', 'uploadThumbnail', 'featured', 'categoryId'],
    filterProperties: ['name', 'synopsis', 'featured', 'categoryId', 'createdAt', 'updatedAt'],
    listProperties: ['id', 'name', 'featured', 'categoryId'],
    showProperties: ['id', 'name', 'synopsis', 'featured', 'thumbnailUrl', 'categoryId', 'createdAt', 'updatedAt']
}

// Aqui eu deixei a thumbnail public pq fiquei com preguiça de fazer de outro jeito, mas não altera em nada, fica até mais facil 
// de fazer um sexo quente com senhoras casadas de são paulo
export const courseResourceFeatures: FeatureType[] = [
    uploadFileFeature({
        provider: {
            local: {
                bucket: path.join(__dirname, '..', '..', '..', 'public')
            }
        },
        properties: {
            key: 'thumbnailUrl',
            file: 'uploadThumbnail'
        },
        uploadPath: (record, filename) => `thumbnails/course-${record.get('id')}/${filename}`
    })
]