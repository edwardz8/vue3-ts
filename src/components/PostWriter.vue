<template>
    <div class="columns">
        <div class="column">
            <div class="field">
                <div class="label">New Post</div>
                <div v-if="post.title">
                    <input type="text" class="input" v-model="title" />
                </div>
            </div>
        </div>
    </div>

    <div class="columns">
        <div class="column">
            <div contenteditable ref="contentEditable" @input="handleInput" />
        </div>
        <div class="column">{{ content }}</div>
    </div>
</template>

<script lang="ts">
import { Post } from '@/mocks'
import { defineComponent, onMounted, PropType, ref } from 'vue'

export default defineComponent({
    props: {
        post: {
            type: Object as PropType<Post>,
            default: () => ({
                title: 'Arrow Function Expression'
            }),
            validator: (post: Post) => !!post.title
        }
    },

    setup(props) {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        //@ts-ignore
        const title = ref<string | number>(props.post.title)
        const content = ref('Enter your post content.')
        const contentEditable = ref<HTMLDivElement | null>(null)

        const handleInput = () => {
            if (!contentEditable.value) {
                throw Error('this should not happen')
            }
            content.value = contentEditable.value.textContent || ''
        }

        onMounted(() => {
            if (!contentEditable.value) {
                throw Error('this should not happen')
            }
            contentEditable.value.textContent = content.value
            console.log(contentEditable.value)
        })

        return {
            title,
            content,
            contentEditable,
            handleInput
        }
    }
})


</script>

<style>
</style>