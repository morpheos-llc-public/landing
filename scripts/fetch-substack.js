const Parser = require('rss-parser');
const fs = require('fs');
const path = require('path');
const { JSDOM } = require('jsdom');
const TurndownService = require('turndown');

const parser = new Parser({
    customFields: {
        item: [
            ['content:encoded', 'contentEncoded']
        ]
    }
});

const turndownService = new TurndownService({
    headingStyle: 'atx',
    codeBlockStyle: 'fenced'
});

// Function to process HTML content
async function processContent(content) {
    const dom = new JSDOM(content);
    const document = dom.window.document;
    
    // Convert HTML to Markdown
    let markdown = turndownService.turndown(dom.serialize());

    // Post-process Markdown to clean up image syntax
    // First, remove any extra link wrappers around images
    markdown = markdown.replace(/\[\s*!\[([^\]]*)\]\(([^)]+)\)\s*\]\([^)]+\)/g, '![$1]($2)');
    
    // Then, clean up any remaining Substack image URLs that might have extra parameters
    markdown = markdown.replace(/!\[([^\]]*)\]\((https:\/\/substackcdn\.com\/image\/fetch\/[^)]+)\)/g, (match, alt, url) => {
        // Extract the actual image URL from the Substack CDN URL
        const actualUrl = url.match(/https%3A%2F%2F[^)]+/);
        if (actualUrl) {
            const decodedUrl = decodeURIComponent(actualUrl[0]);
            return `![${alt}](${decodedUrl})`;
        }
        return match;
    });

    // Remove any lines that are just '](https://substackcdn.com/image/fetch/...)' to clean up extra junk
    markdown = markdown.replace(/^\s*\]\(https:\/\/substackcdn\.com\/image\/fetch\/[^)]+\)\s*$/gm, '');

    return markdown;
}

async function fetchSubstackPosts() {
    try {
        // Fetch the RSS feed
        const feed = await parser.parseURL('https://morpheos.substack.com/feed');
        
        // Create _posts directory if it doesn't exist
        const postsDir = path.join(__dirname, '..', '_posts');
        if (!fs.existsSync(postsDir)) {
            fs.mkdirSync(postsDir, { recursive: true });
        }

        // Process each post
        for (const item of feed.items) {
            // Create a filename from the date and title
            const date = new Date(item.isoDate);
            const dateStr = date.toISOString().split('T')[0];
            const titleSlug = item.title
                .toLowerCase()
                .replace(/[^a-z0-9]+/g, '-')
                .replace(/(^-|-$)/g, '');
            const filename = `${dateStr}-${titleSlug}.md`;

            // Check if post already exists
            const filePath = path.join(postsDir, filename);
            if (fs.existsSync(filePath)) {
                console.log(`Post already exists: ${filename}`);
                continue;
            }

            // Use content:encoded if available, otherwise use content
            const postContent = item.contentEncoded || item.content;
            
            // Process the content
            const processedContent = await processContent(postContent);

            // Create the markdown content
            const content = `---
layout: blog/post
title: ${item.title}
date: ${dateStr}
substack_url: ${item.link}
---

${processedContent}

---

*This post was originally published on [Substack](${item.link})*
`;

            // Write the file
            fs.writeFileSync(filePath, content);
            console.log(`Created post: ${filename}`);
        }
    } catch (error) {
        console.error('Error fetching Substack feed:', error);
    }
}

// Run the script
fetchSubstackPosts(); 