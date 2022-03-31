const { levelCrawler } = require('./levelCrawler')

async function bfs(start, adjacencyList) {
	const visited = new Set()
	const queue = [start]

	while (queue.length > 0) {
		const url = queue.shift()
		const urlChildren = adjacencyList.get(url)
		for (const url of urlChildren) {
			if (url) {
				// crawling child url
				const data = await levelCrawler(3, { href: url })
				return data
			}
			if (!visited.has(url)) {
				visited.add(url)
				queue.push(url)
			}
		}
	}
}

module.exports = { bfs }
