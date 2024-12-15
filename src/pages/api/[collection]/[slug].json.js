import {getCollection} from "astro:content"

export const GET = async ({params}) => {
    const {collection, slug} = params;
    const items = await getCollection(collection)
    const item = items.find(i => i.slug === slug)

    return new Response(JSON.stringify(item), {
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
        paths.push({params: {collection: f[0], slug: f[1]}})
    })

    return paths;
}