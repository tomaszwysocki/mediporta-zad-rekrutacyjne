import { DataGrid, GridColDef, GridSortModel } from '@mui/x-data-grid'
import { useQuery } from '@tanstack/react-query'
import { fetchTags } from '../utils/fetchTags'
import { Item, Tags } from '../types/api.types'
import { PaginationModel } from '../types/state.types'
import { Box } from '@mui/material'
import { useCallback, useEffect, useState } from 'react'
import ErrorAlert from './ErrorAlert'

interface TagsTableProps {
    paginationModel: PaginationModel
    setPaginationModel: React.Dispatch<React.SetStateAction<PaginationModel>>
}

export type SortOrder = 'asc' | 'desc'

interface SortOptions {
    sort: SortOrder
    field: string
}

const TagsTable = ({ paginationModel, setPaginationModel }: TagsTableProps) => {
    const [sortOptions, setSortOptions] = useState<SortOptions>({
        sort: 'desc',
        field: 'popular',
    })
    const pageSize = paginationModel.pageSize
    const page = paginationModel.page + 1

    const columns: GridColDef[] = [
        { field: 'name', headerName: 'Name', width: 300 },
        { field: 'count', headerName: 'Count', width: 300 },
    ]

    const { data, isError, isLoading } = useQuery<Tags>({
        queryKey: ['tags', { page, pageSize, ...sortOptions }],
        queryFn: () =>
            fetchTags(page, pageSize, sortOptions.sort, sortOptions.field),
    })

    const [rowCountState, setRowCountState] = useState<number>(data?.total || 0)

    useEffect(() => {
        setRowCountState(prevRowCountState =>
            data?.total !== undefined ? data?.total : prevRowCountState
        )
    }, [data?.total])

    const tags = data?.items ?? []

    const handleSortModelChange = useCallback((sortModel: GridSortModel) => {
        let sort: SortOrder = 'desc'
        let field = 'popular'

        if (sortModel.length > 0) {
            sort = sortModel[0].sort || 'desc'
            field = sortModel[0].field || 'popular'
        }

        if (field === 'count') {
            field = 'popular'
        }

        setSortOptions({ sort, field })
    }, [])

    return (
        <Box height={700} position={'relative'}>
            <DataGrid
                getRowId={(row: Item) => row.name}
                rowCount={rowCountState}
                columns={columns}
                loading={isLoading}
                rows={tags}
                paginationMode='server'
                sortingMode='server'
                onPaginationModelChange={setPaginationModel}
                pageSizeOptions={[paginationModel.pageSize]}
                paginationModel={paginationModel}
                onSortModelChange={handleSortModelChange}
            />
            {isError && <ErrorAlert isError={isError} />}
        </Box>
    )
}

export default TagsTable
