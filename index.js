const { bfs } = require('./bfs')
const { URL } = require('./constants')
const { levelCrawler } = require('./levelCrawler')

// root -> bbc.com
// rootChildren -> news categories in bbc.com
// rootChildrenChildren -> categories categories in bbc.com/category

;(async () => {
	const paths = []
	const rootChildren = await levelCrawler(1, { title: 'root', href: URL })

	let rootChildrenChildren = []

	for (const item of rootChildren) {
		const crawledData = await levelCrawler(2, item)

		for (const item2 of crawledData) {
			const isValid =
				!rootChildrenChildren.map(_ => _.href).includes(item2.href) &&
				item2.title
			if (isValid) {
				rootChildrenChildren.push(item2)
				paths.push([item.href, item2.href])
			}
		}
	}

	// console.log({ root: { title: 'root', href: 'bbc.com' } })
	// console.log({ rootChildren })
	// console.log({ rootChildrenChildren })
	// console.log(paths)

	const everyUrls = [
		...rootChildren.map(_ => _.href),
		...rootChildrenChildren.map(_ => _.href),
	]

	// Creating graphs
	const adjacencyList = new Map()

	// Add Node
	const addNode = urlData => {
		adjacencyList.set(urlData, [])
	}

	// Add edge, directed
	const addEdge = (parent, child) => {
		adjacencyList.get(parent).push(child)
	}

	// Create the Graph
	everyUrls.forEach(addNode)
	paths.forEach(path => addEdge(...path))

	for (const item of rootChildren) {
		const data = await bfs(item.href, adjacencyList)

		console.log(`Headlines from ${item.title} with href ${item.href}`)
		console.log(data)
	}
})()
