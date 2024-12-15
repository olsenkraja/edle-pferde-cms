// File: src/pages/api/[collection]/[slug].json.js

import {getCollection} from "astro:content"

export const GET = async ({params}) => {
    const {collection} = params;
    const items = await getCollection(collection)

    return new Response(JSON.stringify(items), {
        headers: {
            'Content-Type': 'application/json',
            'Cache-Control': 'no-store, max-age=0'
        }
    });
};

export async function getStaticPaths({params}) {
    const files = import.meta.glob('../../../content/**/*.{mdoc,mdx}', { eager: true })
    let paths = []

    Object.keys(files).map(file => {
        let f = file.replace('../../../content/', '')
            .replace('.mdoc', '')
            .replace('.mdx', '')
            .split('/')
        paths.push({params: {collection: f[0]}})
    })

    return paths;
}