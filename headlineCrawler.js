const { default: axios } = require('axios')
const cheerio = require('cheerio')

const headLineCrawler = async url => {
	const category = url.split('/')[3]
	const { data } = await axios.get(url)
	const $ = cheerio.load(data)
	let htmlList = $(`a[class="rectangle-story-item__title"]`)
	if (category === 'sport' || category === 'news') {
		htmlList = $(`h3`)
	}

	const headlineData = []

	htmlList.each((_i, ele) => {
		const title = $(ele).text()
		const lenCheck = title.split(' ').length === 1

		!lenCheck && headlineData.push({title, category})
	})
	return headlineData
}
module.exports = { headLineCrawler }
