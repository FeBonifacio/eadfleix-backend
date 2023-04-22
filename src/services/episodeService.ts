import { Response } from "express";
import path from "path";
import fs from "fs";

export const episodeService = {
    streamEpisodeToResponse: (res: Response, videoUrl: string, range: string | undefined) => {
        // Entrar na pasta uploads
        const filePath = path.join(__dirname, '..', '..', 'uploads', videoUrl)
        const fileStat = fs.statSync(filePath)
        
        // Isso aqui é o carregamento do video e em qual parte o usuario está, peguei na net

        if (range) {
            const parts = range.replace(/bytes=/, '').split('-')

            const start = parseInt(parts[0], 10) // 1026

            const end = parts[1] ? parseInt(parts[1], 10) : fileStat.size - 1 // 7752

            const chunkSize = (end - start) + 1

            const file = fs.createReadStream(filePath, { start, end })

            const head = {
                'Content-Range': `bytes ${start}-${end}/${fileStat.size}`,
                'Accept-Ranges': 'bytes',
                'Content-Length': chunkSize,
                'Content-Type': 'video/mp4'
            }

            // 206 === conteudo parcial, video vai ser carregado de acordo com o q o otário assiste
            res.writeHead(206, head)

            file.pipe(res)
        } else {
            // Caso ocorra um erro, ele devolve o video inteiro
            const head = {
                'Content-Length': fileStat.size,
                'Content-Type': 'video/mp4'
            }

            // 200 pq vai dar o video inteiro, só que é pesado
            res.writeHead(200, head)

            fs.createReadStream(filePath).pipe(res)
        }
    }
}