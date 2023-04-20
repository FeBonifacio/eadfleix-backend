import React, { useEffect, useState } from 'react';
import { H1, H2, Table, TableHead, TableRow, TableBody, TableCell  } from  '@adminjs/design-system'
import { ApiClient, useCurrentAdmin } from 'adminjs';


export default function Dashboard() {
    const [resources, setResources] = useState<{ [ key: string ]: number}>()
    //Pegar o otario que está logado e na linha 26
    const [currentAdmin] = useCurrentAdmin()
    const api = new ApiClient()

    useEffect(() => {
        fetchDashboardData()
    }, [])// isso para não ficar no loop infinito

    //função para obter os dados de contagem das coisas que tem
    async function fetchDashboardData(){
        const res = await api.getDashboard()
        setResources(res.data)
    }

    return (
        // Para usar o react tem mudar na linha 17 tsconfig
        // O codigo da tabela eu peguei na net :>
    <section style={{ padding:'1.5rem' }}>
            <H1>Vamos Aprender ?, {currentAdmin?.firstName}</H1> // colocar o nome do otario

        <section style={{ backgroundColor: '#FFF', padding: '1.5rem' }}>
    <H2>Resumo</H2>
    <Table>
        <TableHead>
        <TableRow style={{ backgroundColor: '#FF0043' }}>
            <TableCell style={{ color: "#FFF" }}>Recurso</TableCell>
            <TableCell style={{ color: "#FFF" }}>Registros</TableCell>
        </TableRow>
        </TableHead>
        <TableBody>
        {
            // Isso é tipo um IF === ?
            resources ?
            Object.entries(resources).map(([resource, count]) => (
                <TableRow key={resource}>
                <TableCell>{resource}</TableCell>
                <TableCell>{count}</TableCell>
                </TableRow>
            ))
            :
            <></>
        }
        </TableBody>
    </Table>
        </section>
    </section>
    )
}