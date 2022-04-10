const { levelCrawler } = require("./levelCrawler")

const bfs = async (start, level) => {
    const queue = [{
        href: start, level: 1
    }]
    const visited = new Set()

    console.log({queue})
    const headlines = []

    while(queue.length > 0){
        const item = queue.shift()

        const children = await levelCrawler(item)

        console.log({children})

        for (const child of children){
            if(child?.title){
                headlines.push(child)
            }
            else if(!visited.has(child.href)) {
                visited.add(child.href)
                queue.push(child)
           }
        }
        if(children[0]?.level !== 4 && children[0]?.level > level ) {
                break
        }
    }
    console.log({visited})
    console.log({headlines})
}

bfs('https://bbc.com', 3)
