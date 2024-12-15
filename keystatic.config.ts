import {collection, config, fields, singleton} from '@keystatic/core'

function getDocumentBlock(imagePath: string, label = 'Content') {
    return fields.mdx({
        label,
        options: {
            divider: true,
            link: true,
            image: {
                directory: 'public/' + imagePath,
                publicPath: imagePath,
                schema: {
                    title: fields.text({
                        label: 'Caption',
                    }),
                },
            },
        },
        // components: {
        //   'youtube-video': component({
        //     label: 'YouTube Video',
        //     schema: {
        //       youtubeVideoId: fields.text({
        //         label: 'YouTube Video ID',
        //         description: 'The ID of the YouTube video (not the full URL)',
        //         validation: {
        //           length: {
        //             min: 1,
        //           },
        //         },
        //       }),
        //     },
        //     preview: (props) =>
        //       props.fields.youtubeVideoId.value ? (
        //         <ShowcaseYouTubeVideo videoId={props.fields.youtubeVideoId.value} />
        //       ) : (
        //         <p>Please enter a YouTube video ID</p>
        //       ),
        //   }),
        // },
    })
}

function getHorseInput(label: string) {
    return fields.conditional(
        fields.checkbox({label: 'Is ' + label + ' our horse?'}),
        {
            true: fields.relationship({
                label: label,
                collection: 'horses'
            }),
            false: fields.text({
                label: label
            }),
        }
    )
}

export default config({
    storage: {
        kind: 'local',
        // kind: 'github',
        // repo: 'olsenkraja/edle-pferde-astro'
    },
    ui: {
        brand: {
            name: 'Edle Pferde',
        },
        navigation: {
            content: ['posts', 'horses', 'albums'],
            defaults: ['texts', 'contact'],
        },
    },
    collections: {
        posts: collection({
            columns: ['title', 'date'],
            label: 'Posts',
            entryLayout: 'content',
            slugField: 'title',
            path: 'src/content/posts/*',
            format: {contentField: 'content'},
            schema: {
                title: fields.slug({name: {label: 'Title'}}),
                content: getDocumentBlock('images/posts'),
                cover_image: fields.image({
                    label: 'Cover image',
                    directory: 'public/images/posts/cover_images',
                    publicPath: '/images/posts/cover_images/',
                    validation: {
                        isRequired: true,
                    },
                }),
                date: fields.date({
                    label: 'Event date and time',
                    defaultValue: new Date().toISOString().split('T')[0],
                    validation: {
                        isRequired: true
                    },
                }),
                horses: fields.array(
                    fields.relationship({
                        label: 'Horses',
                        collection: 'horses',
                        validation: {
                            isRequired: true,
                        },
                    }),
                    {
                        label: 'Horses',
                        itemLabel: (item) => item.value || 'Please select an horse',
                    }
                ),
            },
        }),
        horses: collection({
            columns: ['name', 'birth_year'],
            label: 'Horses',
            slugField: 'name',
            path: 'src/content/horses/*',
            format: {contentField: 'content'},
            schema: {
                name: fields.slug({name: {label: 'Full name'}}),
                family: fields.text({label: 'Family'}),
                gender: fields.select({
                    label: 'Gender',
                    options: [
                        {label: 'Hengst', value: 'Hengst'},
                        {label: 'Wallach', value: 'Wallach'},
                        {label: 'Stute', value: 'Stute'},
                    ],
                    defaultValue: 'Hengst'
                }),
                profile_picture: fields.image({
                    label: 'Profile picture',
                    directory: 'public/images/horses',
                    publicPath: '/images/horses/',
                    validation: {
                        isRequired: true
                    },
                }),
                profile_picture_alt_text: fields.text({label: 'Profile picture / Alt text'}),
                status: fields.select({
                    label: 'Status',
                    options: [
                        {label: 'Active', value: 'active'},
                        {label: 'Inactive', value: 'inactive'},
                        {label: 'Fro sale', value: 'for-sale'},
                    ],
                    defaultValue: 'active'
                }),
                birth_year: fields.text({
                    label: 'Birth year',
                }),
                breed: fields.text({label: 'Breed'}),
                size: fields.text({label: 'Size'}),
                color: fields.text({label: 'Color'}),
                bio: fields.text({label: 'Bio', multiline: true}),
                content: getDocumentBlock('images/horses'),
                father: getHorseInput('Father'),
                mother: getHorseInput('Mother'),
                fathers_father: getHorseInput('Father\'s Father'),
                fathers_mother: getHorseInput('Father\'s Mother'),
                mothers_father: getHorseInput('Mother\'s Father'),
                mothers_mother: getHorseInput('Mother\'s Mother'),
                children: fields.array(
                    fields.relationship({
                        label: 'Children',
                        collection: 'horses'
                    }),
                    {
                        label: 'Children',
                        itemLabel: (item) => item.value || 'Please select an horse',
                    }
                ),
            },
        }),
        albums: collection({
            label: 'Albums',
            slugField: 'name',
            path: 'src/content/albums/*',
            schema: {
                name: fields.text({
                    label: 'Album name',
                }),
                date: fields.date({
                    label: 'Event date and time',
                    defaultValue: new Date().toISOString().split('T')[0],
                    validation: {
                        isRequired: true
                    },
                }),
                photos: fields.array(fields.image({
                    label: 'Photo',
                    directory: 'public/images/albums',
                    publicPath: '/images/albums/',
                }))
            }
        })
    },
    singletons: {
        texts: singleton({
            label: 'Texts',
            path: 'src/content/texts',
            schema: {
                homepage_about_text: fields.text({
                    label: 'Homepage: About text',
                    multiline: true,
                }),
                homepage_horses_headline: fields.text({
                    label: 'Homepage: Horses headline',
                }),
                homepage_horses_description: fields.text({
                    label: 'Homepage: Horses description',
                    multiline: true,
                }),
                homepage_about_headline: fields.text({
                    label: 'Homepage: About headline',
                }),
                homepage_about_description: fields.text({
                    label: 'Homepage: About description',
                    multiline: true,
                }),
                homepage_gallery_headline: fields.text({
                    label: 'Homepage: Gallery headline',
                }),
                homepage_gallery_description: fields.text({
                    label: 'Homepage: Gallery description',
                    multiline: true,
                }),
                footer: fields.text({
                    label: 'Footer',
                    multiline: true,
                }),
                about_page: getDocumentBlock('images/about_page', 'About page'),
                impressum_page: getDocumentBlock('images/impressum_page', 'Impressum page'),
            }
        }),
        contact: singleton({
            label: 'Contact',
            path: 'src/content/contact',
            schema: {
                email_address: fields.text({
                    label: 'Email address',
                }),
                phone_number: fields.text({
                    label: 'Phone number',
                }),
                mobile_phone_number: fields.text({
                    label: 'Mobile phone number',
                }),
                facebook: fields.text({
                    label: 'Facebook',
                    description: 'The Facebook handle (not full URL!)',
                }),
                instagram: fields.text({
                    label: 'Instagram',
                    description: 'The Instagram username (not full URL!)',
                }),
            },
        }),
    },
})
