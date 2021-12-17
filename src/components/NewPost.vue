<template>
    <div>
        <post-writer :post="newPost" @save="save" />
    </div>
</template>

<script lang="ts">
import { Post } from '@/mocks'
import { useStore } from '../store/store'
import { useRouter } from 'vue-router'
import moment from 'moment'
import { defineComponent } from 'vue'
import PostWriter from './PostWriter.vue'

export default defineComponent({
    components: { PostWriter },

    setup() {
        const newPost: Post = {
            id: '-1',
            title: 'Enter Title',
            /* todo: date time stamp with moment.js
            *
            * currently we are simulating the time on save
            * 
            */
            created: moment().subtract(1, 'second')
        }

        const store = useStore()
        const router = useRouter()

        const save = async (post: Post) => {
            await store.createPost(post)
            router.push('/')
            console.log('post', post)
        }

        return {
            newPost,
            save
        }
    }
})


</script>

<style>
</style>