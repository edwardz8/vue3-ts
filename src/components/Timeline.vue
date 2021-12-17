<template>
    <nav class="is-primary panel">
        <span class="panel-tabs">
            <a
                v-for="period in periods"
                :key="period"
                :class="[period === currentPeriod ? 'is-active' : '']"
                @click="setPeriod(period)"
            >{{ period }}</a>
        </span>

        <timeline-post v-for="post in posts" :key="post.id" :post="post" class="panel-block" />
    </nav>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from 'vue'
import moment from 'moment'
import { Post } from '@/mocks'
import TimelinePost from './TimelinePost.vue'
import { useStore } from '../store/store'

type Period = 'today' | 'this week' | 'this month'

export default defineComponent({
    name: 'Timeline',

    components: { TimelinePost },

    async setup() {
        const store = useStore()
        const currentPeriod = ref<Period>('today')

        if (!store.getState().posts?.loaded) {
            await store.fetchPosts()
        }
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        //@ts-ignore
        const allPosts: Post[] = store.getState().posts.ids.reduce<string[]>((acc, id) => {
            const thePost = store.getState().posts.all.get(id)
            if (!thePost) {
                throw Error('This post was not found')
            }
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            //@ts-ignore
            return acc.concat((thePost), [])
        }, [])

        const periods = ref(['today', 'this week', 'this month'])

        const posts = computed(() => {
            return allPosts.filter(post => {
                // return [today, thisWeek, thisMonth].filter(post => {
                if (currentPeriod.value === 'today') {
                    return post.created.isAfter(moment().subtract(1, 'day'))
                }
                if (currentPeriod.value === 'this week') {
                    return post.created.isAfter(moment().subtract(1, 'week'))
                }
                if (currentPeriod.value === 'this month') {
                    return post.created.isAfter(moment().subtract(1, 'month'))
                }
                return false
            })
        })

        const setPeriod = (period: Period) => {
            currentPeriod.value = period
        }

        return {
            periods,
            currentPeriod,
            posts,
            setPeriod
        }
    }
})
</script>

