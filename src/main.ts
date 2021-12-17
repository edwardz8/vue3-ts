import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import random from 'lodash/random'
import { today, thisWeek, thisMonth } from './mocks'
import 'highlight.js/styles/dark.css'

function delay() {
    return new Promise(res => {
        setTimeout(res, 1000)
    })
}

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
axios.get = async (url: string) => {
    if (url === '/posts') {
        await delay()
        return Promise.resolve({
            data: [today, thisWeek, thisMonth]
        })
    }
}

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
axios.post = async (url: string, post: Post) => {
    if (url === '/posts') {
        const id = random(10, 900000)
        await delay()
        return Promise.resolve({
            data: {...post, id}
        })
    }
}

createApp(App).use(store).use(router).mount('#app')