module.exports = {
  eleventyComputed: {
    posts: function(data) {
      return data.collections.posts;
    }
  }
}; 