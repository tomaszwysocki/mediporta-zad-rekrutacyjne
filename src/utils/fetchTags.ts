import axios from 'axios'
import { SortOrder } from '../components/TagsTable'

export const fetchTags = async (
    page: number = 1,
    pageSize: number = 30,
    order: SortOrder = 'desc',
    field: string = 'popular'
) => {
    const FILTER = '!)RaDD.4RNgOBtXX9fkJcT*xO'

    const res = await axios.get(
        `https://api.stackexchange.com/2.3/tags?page=${page}&pagesize=${pageSize}&order=${order}&sort=${field}&site=stackoverflow&filter=${FILTER}`
    )
    return res.data
}
