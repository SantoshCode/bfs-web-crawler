const { headLineCrawler } = require("./headlineCrawler");
const { categoryCrawler } = require("./categoryCrawler");

const levelCrawler = async ({ level, href }) => {
  if (level === 3) {
    const _data = (await headLineCrawler(href)).slice(0, 5);
    return _data.map((item) => ({
      category: item.category,
      subCat: item.subCat,
      title: item.title,
      level: 4,
    }));
  }

  if (level === 0)
    return [
      {
        href: "https://bbc.com",
        level: 1,
      },
    ];

  if (level === 1) {
    const _data = (
      await categoryCrawler(href, 'ul > li > a[href^="https://www.bbc.com/"]')
    ).slice(1, 4);
    return _data.map((item) => ({ href: item.href, level: 2 }));
  }

  if (level === 2) {
    const _data = (await categoryCrawler(href, `a[href^="/"]`)).slice(1, 4);

    return _data.map((item) => ({ href: item.href, level: 3 }));
  }
};

module.exports = { levelCrawler };