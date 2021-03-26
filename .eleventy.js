const moment = require("moment");
const CleanCSS = require("clean-css");
const pluginRss = require("@11ty/eleventy-plugin-rss");
const syntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight");

moment.locale("en");

module.exports = function (eleventyConfig) {
  eleventyConfig.addFilter("dateIso", (date) => {
    return moment(date).toISOString();
  });

  eleventyConfig.addFilter("dateReadable", (date) => {
    return moment(date).utc().format("LL");
  });

  eleventyConfig.addFilter("truncate", (string) => {
    return string.split(" ").slice(0, 3).join(" ");
  });

  eleventyConfig.addFilter("cssmin", function (code) {
    return new CleanCSS({}).minify(code).styles;
  });

  eleventyConfig.addFilter("buildTags", function (tags) {
    return tags
      .filter((t) => t !== "post")
      .map((t) => `#${t}`)
      .join(" ");
  });

  eleventyConfig.addShortcode("excerpt", (article) => extractExcerpt(article));

  eleventyConfig.addPlugin(pluginRss);
  eleventyConfig.addPlugin(syntaxHighlight);

  eleventyConfig.addPassthroughCopy("css");
  eleventyConfig.addPassthroughCopy("script");
  eleventyConfig.addPassthroughCopy("favicon.png");
};

function extractExcerpt(article) {
  if (!article.hasOwnProperty("templateContent")) {
    return null;
  }

  let excerpt = null;
  const content = article.templateContent;

  const separatorsList = [
    { start: "<!-- Excerpt Start -->", end: "<!-- Excerpt End -->" },
    { start: "<p>", end: "</p>" },
  ];

  separatorsList.some((separators) => {
    const startPosition = content.indexOf(separators.start);
    const endPosition = content.indexOf(separators.end);

    if (startPosition !== -1 && endPosition !== -1) {
      excerpt = content
        .substring(startPosition + separators.start.length, endPosition)
        .trim();
      return true; // Exit out of array loop on first match
    }
  });

  return excerpt;
}
