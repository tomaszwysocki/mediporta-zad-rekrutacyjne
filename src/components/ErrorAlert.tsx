import { Alert, AlertTitle, Snackbar } from '@mui/material'
import { SyntheticEvent, useState } from 'react'

interface ErrorAlertProps {
    isError: boolean
}

const ErrorAlert = ({ isError }: ErrorAlertProps) => {
    const [open, setOpen] = useState(isError)

    const handleClose = (_event?: SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return
        }

        setOpen(false)
    }

    return (
        <Snackbar
            open={open}
            onClose={handleClose}
            autoHideDuration={5000}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
        >
            <Alert onClose={handleClose} severity='error' variant='filled'>
                <AlertTitle>Error</AlertTitle>
                An error occurred while accessing the API.
            </Alert>
        </Snackbar>
    )
}

export default ErrorAlert
