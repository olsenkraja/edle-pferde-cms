// File: src/pages/api/[collectionName]/[slug].json.js

import {getCollection} from "astro:content"

export const GET = async ({params}) => {
    const {collectionName} = params;
    const items = await getCollection(collectionName)

    return new Response(JSON.stringify(items), {
        headers: {
            'Content-Type': 'application/json',
            'Cache-Control': 'no-store, max-age=0'
        }
    });
};

// Optional: Define static paths for pre-rendering
export async function getStaticPaths({params}) {
    const files = import.meta.glob('../../../content/**/*.mdoc')
    let paths = []
    Object.keys(files).map(file => {
        let f = file.replace('../../../content/', '').replace('.mdoc', '').split('/')
        paths.push({params: {collectionName: f[0], slug: f[1]}})
    })

    return paths;
}