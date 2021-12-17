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
            <div contenteditable ref="contentEditable" :value="input" @input="handleInput"></div>
        </div>
        <div class="column">
            <div v-html="compiledMarkdown"></div>
        </div>
    </div>

    <div class="columns">
        <div class="column">
            <button @click="save" class="button is-primary">Save</button>
        </div>
    </div>
</template>

<script lang="ts">
import { Post } from '@/mocks'
import { computed, defineComponent, onMounted, PropType, ref, watch, watchEffect } from 'vue'
import highlight from 'highlight.js'
import { marked } from 'marked'

export default defineComponent({
    props: {
        post: {
            type: Object as () => PropType<Post>,
            /* default: () => ({
                title: 'Arrow Function Expression'
            }), */
            validator: (post: Post) => !!post.title
        }
    },
    emits: {
        save: (post: Post) => {
            return true
        }
    },
    setup(props, ctx) {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        //@ts-ignore
        const title = ref<string | number>(props.post.title)
        const content = ref('## Title\n Enter your post content.')
        const input = ref('')

        const parseHtml = (str: string) => {
            input.value = marked.parse(str, {
                gfm: true,
                breaks: true,
                highlight: (code: string) => {
                    return highlight.highlightAuto(code).value
                }
            })
        }

        watch(content, (newVal) => {
            parseHtml(newVal)
        }, { immediate: true })

        const compiledMarkdown = computed(() => {
            return marked(input.value, { sanitize: false })
        })

        const contentEditable = ref<HTMLDivElement | null>(null)

        const handleInput = () => {
            if (!contentEditable.value) {
                throw Error('this should not happen')
            }
            input.value = contentEditable.value.textContent || ''
        }

        const save = () => {
            const newPost: Post = {
                ...props.post,
                 // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                title: title.value,
                html: input.value,
                markdown: content.value,
            }

            ctx.emit('save', newPost)
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
            handleInput,
            compiledMarkdown,
            save
        }
    }
})


</script>

<style>
</style>