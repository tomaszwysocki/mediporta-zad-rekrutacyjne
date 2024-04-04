import { Stack } from '@mui/material'
import TagsTable from './components/TagsTable'
import RowCountController from './components/RowCountController'
import { useState } from 'react'
import { PaginationModel } from './types/state.types'

function App() {
    const [paginationModel, setPaginationModel] = useState<PaginationModel>({
        page: 0,
        pageSize: 20,
    })

    return (
        <Stack
            maxWidth={800}
            margin={'50px auto 50px'}
            padding={'30px 30px'}
            // alignItems={'end'}
        >
            <RowCountController setPaginationModel={setPaginationModel} />
            <TagsTable
                paginationModel={paginationModel}
                setPaginationModel={setPaginationModel}
            />
        </Stack>
    )
}

export default App
