import moment from 'moment'

export interface Post {
    id: string
    title: string 
    created: moment.Moment
    html?: string 
    markdown?: string 
}

export const today: Post = {
    id: '1',
    title: 'today',
    created: moment().subtract(1, 'seconds')
}

export const thisWeek: Post = {
    id: '2',
    title: 'this week',
    created: moment().subtract(2, 'days')
}

export const thisMonth: Post = {
    id: '3',
    title: 'this month',
    created: moment().subtract(12, 'days')
} 