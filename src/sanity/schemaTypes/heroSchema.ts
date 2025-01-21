export const heroSchema = {
    name: 'heroSection',
    title: 'Hero Section',
    type: 'document',
    fields: [
        {
            name: 'paragraph1',
            title: 'Paragraph 1',
            type: 'text'
        },
        {
            name: 'heading',
            title: 'Heading',
            type: 'string'
        },
        {
            name: 'paragraph2',
            title: 'Paragraph 2',
            type: 'text'
        },
        {
            name: 'ctaButton',
            title: 'CTA Button',
            type: 'string'
        },
        {
            name: 'leftImage',
            title: 'Left Image',
            type: 'image'
        },
        {
            name: 'rightImage',
            title: 'Right Image',
            type: 'image'
        }
    ]
}