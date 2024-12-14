import { config, fields, collection } from '@keystatic/core';

export default config({
  storage: {
    // kind: 'local',
    kind: 'github',
    repo: 'olsenkraja/edle-pferde-astro'
  },
  collections: {
    posts: collection({
      label: 'Posts',
      slugField: 'title',
      path: 'src/content/posts/*',
      format: { contentField: 'content' },
      schema: {
        title: fields.slug({ name: { label: 'Title' } }),
        status: fields.checkbox({
          label: 'active',
        }),
        content: fields.markdoc({
          label: 'Content',
          options: {
            image: {
              directory: 'src/assets/images/posts',
              publicPath: '../../assets/images/posts/',
            },
          },
        }),
      },
    }),
  },
});
