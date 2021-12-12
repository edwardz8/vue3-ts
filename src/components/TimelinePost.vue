<template>
    <a :key="post.id" class="panel-block">
        <div>
            <a>{{ post.title }}</a>
            <div>{{ post.created.format('Do MMM') }}</div>
        </div>
    </a>
</template>

<script lang="ts">
import { Post } from '@/mocks'
import { defineComponent } from 'vue'

export default defineComponent({
    name: 'TimelinePost',
    props: {
        post: {
            type: Object as () => Post
        }
    }
})
</script>