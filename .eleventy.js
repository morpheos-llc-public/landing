module.exports = function(eleventyConfig) {
  // Copy static assets
  eleventyConfig.addPassthroughCopy("banner");
  eleventyConfig.addPassthroughCopy("blog.css");
  eleventyConfig.addPassthroughCopy("styles.css");
  
  // Blog posts collection with custom permalink structure
  eleventyConfig.addCollection("posts", function(collection) {
    return collection.getFilteredByGlob("_posts/**/*.md").map(post => {
      // Create a slug from the filename
      const slug = post.fileSlug.replace(/^\d{4}-\d{2}-\d{2}-/, '');
      // Set the permalink to /blog/slug/
      post.data.permalink = `/blog/${slug}/`;
      // Set the layout to blog/post
      post.data.layout = "blog/post";
      // Ensure date is properly set
      if (!post.data.date) {
        // Extract date from filename if not set in front matter
        const match = post.fileSlug.match(/^(\d{4}-\d{2}-\d{2})-/);
        if (match) {
          post.data.date = new Date(match[1]);
        }
      }
      return post;
    });
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
      day: "numeric"
    });
  });

  return {
    dir: {
      input: ".",
      output: "_site",
      includes: "_includes",
      data: "_data"
    },
    templateFormats: ["html", "md", "njk"],
    htmlTemplateEngine: "njk",
    markdownTemplateEngine: "njk"
  };
}; 