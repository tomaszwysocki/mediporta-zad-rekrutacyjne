import { Button, Input, InputLabel, Stack } from '@mui/material'
import { ChangeEvent, KeyboardEvent, useRef, useState } from 'react'
import { PaginationModel } from '../types/state.types'
import { validateInput } from '../utils/validateInput'

interface RowCountControllerProps {
    setPaginationModel: React.Dispatch<React.SetStateAction<PaginationModel>>
}

const RowCountController = ({
    setPaginationModel,
}: RowCountControllerProps) => {
    const [value, setValue] = useState('')
    const inputRef = useRef<HTMLInputElement | null>(null)

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        const inputValue = event.target.value

        if (validateInput(+inputValue)) {
            setValue(inputValue)
        }
    }

    const handleClick = () => {
        const newPageSize = +inputRef.current!.value

        if (validateInput(newPageSize)) {
            setPaginationModel(prevPaginationModel => ({
                ...prevPaginationModel,
                pageSize: newPageSize,
            }))
        }
    }

    const handleKeyDown = (event: KeyboardEvent<HTMLElement>) => {
        if (event.key === 'Enter') {
            handleClick()
        }
    }

    return (
        <Stack
            direction={'row'}
            alignSelf={'end'}
            alignItems={'center'}
            gap={'10px'}
            marginBottom={'5px'}
        >
            <InputLabel>Rows per page:</InputLabel>
            <Input
                type='number'
                inputRef={inputRef}
                onChange={handleChange}
                value={value}
                inputProps={{ min: 1, max: 100 }}
                onKeyDown={handleKeyDown}
            />
            <Button variant='contained' type='submit' onClick={handleClick}>
                Change
            </Button>
        </Stack>
    )
}

export default RowCountController
