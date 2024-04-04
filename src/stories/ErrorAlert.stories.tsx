import { Meta, StoryObj } from '@storybook/react'

import ErrorAlert from '../components/ErrorAlert'

const meta: Meta<typeof ErrorAlert> = {
    component: ErrorAlert,
}

export default meta
type Story = StoryObj<typeof ErrorAlert>

export const Default: Story = {
    render: () => <ErrorAlert isError={true}></ErrorAlert>,
}
