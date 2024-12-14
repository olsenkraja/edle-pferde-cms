export function removeMarkdown(text) {
    text = text.replace(/^#+\s*/gm, '')
    text = text.replace(/(\*{1,2}|_{1,2})([^*_\n]+)\1/g, '$2')
    text = text.replace(/\[([^\]]+)\]\([^\)]+\)/g, '$1')
    text = text.replace(/!\[([^\]]*)\]\([^\)]+\)/g, '')
    text = text.replace(/^[\*\-\+]\s*/gm, '')
    text = text.replace(/^\d+\.\s*/gm, '')
    text = text.replace(/^[-*_]{3,}\s*$/gm, '')
    text = text.replace(/^>\s*/gm, '')
    text = text.replace(/(`{1,3})([^`\n]+)\1/g, '$2')
    text = text.replace(/```[\s\S]*?```/g, '')
    text = text.replace(/\n/g, ' ')
    text = text.replace(/\s+/g, ' ').trim()

    return text;
}