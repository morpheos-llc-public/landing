module.exports = function(eleventyConfig) {
  // Copy static assets
  eleventyConfig.addPassthroughCopy("banner");
  eleventyConfig.addPassthroughCopy("blog.css");
  eleventyConfig.addPassthroughCopy("styles.css");
  eleventyConfig.addPassthroughCopy("_posts/images");
  eleventyConfig.addPassthroughCopy("CNAME");
  eleventyConfig.addPassthroughCopy("invite");
  
  // Blog posts collection with custom permalink structure
  eleventyConfig.addCollection("posts", function(collection) {
    return collection.getFilteredByGlob("_posts/**/*.md").map(post => {
      // Create a slug from the filename
      const slug = post.fileSlug
        .replace(/^\d{4}-\d{2}-\d{2}-\d{2}-/, '')  // Remove date and sequence number
        .replace(/^\d{4}-\d{2}-\d{2}-/, '');       // Remove date without sequence number
      
      // Set the permalink to /blog/slug/
      post.data.permalink = `/blog/${slug}/`;
      
      // Ensure date is properly set
      if (!post.data.date) {
        // Extract date from filename if not set in front matter
        const match = post.fileSlug.match(/^(\d{4}-\d{2}-\d{2})/);
        if (match) {
          // Create date in local timezone
          const [year, month, day] = match[1].split('-');
          post.data.date = new Date(year, month - 1, day);
  }
}
      
      // Set the layout
      post.data.layout = "blog/post";
      
      return post;
    }).sort((a, b) => b.date - a.date); // Sort by date, newest first
  });

  // Date formatting filters
  eleventyConfig.addFilter("dateIso", date => {
    if (!date) return '';
    return date.toISOString();
  });
  
  eleventyConfig.addFilter("dateReadable", date => {
    if (!date) return '';
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      timeZone: 'UTC' // Ensure consistent date display
    });
  });

  return {
    dir: {
      input: ".",
      output: "_site",
      includes: "_includes",
      data: "_data",
      layouts: "_includes"
    },
    templateFormats: ["html", "md", "njk"],
    htmlTemplateEngine: "njk",
    markdownTemplateEngine: "njk",
    permalink: false,
    pathPrefix: "/"
  };
}; 