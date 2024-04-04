import { Meta, StoryObj } from '@storybook/react'

import RowCountController from '../components/RowCountController'

const meta: Meta<typeof RowCountController> = {
    component: RowCountController,
}

export default meta
type Story = StoryObj<typeof RowCountController>

export const Default: Story = {
    render: args => <RowCountController {...args}></RowCountController>,
}
