import { Meta, StoryObj } from '@storybook/react'
import TagsTable from '../components/TagsTable'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { queryClientConfig } from '../utils/queryClientConfig'

const queryClient = new QueryClient(queryClientConfig)

const meta: Meta<typeof TagsTable> = {
    component: TagsTable,
    decorators: [
        story => (
            <QueryClientProvider client={queryClient}>
                {story()}
            </QueryClientProvider>
        ),
    ],
    args: {
        paginationModel: {
            page: 0,
            pageSize: 30,
        },
    },
    argTypes: {
        paginationModel: {
            page: { control: { type: 'number', min: 1, max: 500, step: 1 } },
            pageSize: {
                control: { type: 'number', min: 1, max: 100, step: 1 },
            },
        },
    },
}

export default meta
type Story = StoryObj<typeof TagsTable>

export const Default: Story = {
    render: args => <TagsTable {...args}></TagsTable>,
    decorators: [
        story => (
            <QueryClientProvider client={queryClient}>
                {story()}
            </QueryClientProvider>
        ),
    ],
}
