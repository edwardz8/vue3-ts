import { Post } from '@/mocks'
import { reactive, readonly } from 'vue'
import axios from 'axios'

interface State {
    posts: PostsState
}

interface PostsState {
    ids: string[]
    all: Map<string, Post>
    loaded: boolean
}

class Store {
    private state: State

    constructor(initial: State) {
        this.state = reactive(initial)
    }

    getState() {
        return this.state
    }

    async fetchPosts() {
        const response = await axios.get<Post[]>('/posts')

        const postsState: PostsState = {
            ids: [],
            all: new Map,
            loaded: true
        }

        for (const post of response.data) {
            postsState.ids.push(post.id)
            postsState.all.set(post.id, post)
        }
        postsState.loaded = true
        this.state.posts = postsState
    }
}

const all = new Map<string, Post>()
// all.set(today.id, today)
// all.set(thisWeek.id, thisWeek)
// all.set(thisMonth.id, thisMonth)

const store = new Store({
    posts: {
        all,
        ids: [],
        loaded: false
    }
})

export function useStore() {
    return store
}

store.getState().posts