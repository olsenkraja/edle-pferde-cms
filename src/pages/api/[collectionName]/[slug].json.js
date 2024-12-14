import {getCollection} from "astro:content"

export const GET = async ({params}) => {
    const {collectionName, slug} = params;
    const items = await getCollection(collectionName)
    const item = items.find(i => i.slug === slug)

    return new Response(JSON.stringify(item), {
        headers: {
            'Content-Type': 'application/json',
            'Cache-Control': 'no-store, max-age=0'
        }
    });
};

export async function getStaticPaths({params}) {
    const files = import.meta.glob('../../../content/**/*.mdoc')
    let paths = []
    Object.keys(files).map(file => {
        let f = file.replace('../../../content/', '').replace('.mdoc', '').split('/')
        paths.push({params: {collectionName: f[0], slug: f[1]}})
    })

    return paths;
}