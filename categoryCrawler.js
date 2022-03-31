const axios = require('axios')
const cheerio = require('cheerio')

const categoryCrawler = async (url, filter) => {
	const { data } = await axios.get(url)
	const $ = cheerio.load(data)

	const htmlList = $(filter)

	const _data = []

	htmlList.each((_i, ele) => {
		const title = $(ele).text()
		const lenCheck =
			title.split(' ').length === 1 &&
			title !== 'Home' &&
			title !== 'Reel' &&
			title !== 'Weather' &&
			title !== 'Future'

		const href = $(ele).attr('href')
		lenCheck &&
			_data.push({
				title,
				href: href.startsWith('https')
					? href
					: `https://www.bbc.com${href}`,
			})
	})
	return _data
}

module.exports = { categoryCrawler }
