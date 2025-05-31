const Parser = require('rss-parser');
const fs = require('fs');
const path = require('path');

const parser = new Parser();

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

            // Create the markdown content with preview and link
            const content = `---
layout: blog/post
title: ${item.title}
date: ${dateStr}
substack_url: ${item.link}
---

${item.content}

---

*This is a preview of the full post. [Read the complete article on Substack](${item.link})*
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