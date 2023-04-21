
export function getPaginationParams(query: any): [page: number, perPage: number] {
     // isso aqui faz a conversão das paginas para ficar bonitinho
    const { page, perPage } = query

    // Pega os paramentros da forma correta
    const perPageNumber = typeof perPage === 'string' && parseInt(perPage, 10) > 0
        ? parseInt(perPage, 10)
        : 10

    const pageNumber = typeof page === 'string' &&  parseInt(page, 10) > 0
        ? parseInt(page, 10)
        : 1

        return [pageNumber, perPageNumber]
}