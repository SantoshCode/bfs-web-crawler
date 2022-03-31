const { headLineCrawler } = require('./headlineCrawler')
const { categoryCrawler } = require('./categoryCrawler')

const levelCrawler = async (level, inputData) => {
	const { href } = inputData
	if (level === 3) return (await headLineCrawler(href)).slice(0, 15)

	const title = inputData.title.toLowerCase()
	if (level === 0) return [inputData]

	if (level === 1)
		return (
			await categoryCrawler(
				href,
				'ul > li > a[href^="https://www.bbc.com/"]'
			)
		).slice(0, 3)

	if (level === 2)
		return (await categoryCrawler(href, `a[href^="/${title}/"]`)).slice(
			1,
			4
		)
}

module.exports = { levelCrawler }
