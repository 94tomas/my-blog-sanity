// sanity.js
import {createClient} from '@sanity/client'
// Import using ESM URL imports in environments that supports it:
// import {createClient} from 'https://esm.sh/@sanity/client'

export const client = createClient({
    // projectId: 'your-project-id',
    // dataset: 'your-dataset-name',
    // useCdn: true, // set to `false` to bypass the edge cache
    // apiVersion: '2023-05-03', // use current date (YYYY-MM-DD) to target the latest API version
    // // token: process.env.SANITY_SECRET_TOKEN // Only if you want to update content with the client

    projectId: import.meta.env.PUBLIC_SANITY_PROJECT_ID,
    dataset: import.meta.env.PUBLIC_SANITY_DATASET,
    apiVersion: import.meta.env.PUBLIC_SANITY_API_VERSION,
    useCdn: import.meta.env.PUBLIC_SANITY_USE_CDN,
})

// uses GROQ to query content: https://www.sanity.io/docs/groq
export async function getPosts() {
    const posts = await client.fetch('*[_type == "post"] {title, slug, mainImage, publishedAt}')
    console.log(posts);
    return posts
}

export async function getPostBySlug(slug) {
    const post = await client.fetch(`*[_type == "post" && slug.current == $slug][0] {title, mainImage, publishedAt, body}`, {slug})
    console.log(post);
    return post
}

// export async function createPost(post: Post) {
//     const result = client.create(post)
//     return result
// }

// export async function updateDocumentTitle(_id, title) {
//     const result = client.patch(_id).set({title})
//     return result
// }