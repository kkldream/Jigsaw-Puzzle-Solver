const files = [
    {
        name: '蠟筆小新',
        source: 'https://down-tw.img.susercontent.com/file/cn-11134207-7qukw-lhkp6bnmczxf4a',
    },
    {
        name: '寶可夢',
        source: 'https://www.jinn-foot.com.tw/data/editor/images/%E7%9B%92%E8%A3%9D%E6%8B%BC%E5%9C%96/1000%E7%89%87%E7%9B%92%E8%A3%9D/%E5%AF%B6%E5%8F%AF%E5%A4%A2%201000%E7%89%87%E7%9B%92%E8%A3%9D%E6%8B%BC%E5%9C%96(D)-%E5%85%A7%E6%8B%BC.jpg',
    },
    {
        name: '迪士尼公主系列',
        source: 'https://mall.iopenmall.tw/website/uploads_product/website_7233/P0723300465110_3_57346722.jpeg?hash=12132',
    },
    {
        name: '弱智拼圖',
        source: 'https://media.istockphoto.com/id/1442727551/zh/%E5%90%91%E9%87%8F/incomplete-jigsaw-puzzle.jpg?s=612x612&w=0&k=20&c=JlFkiDdqvDasOmksJ0vLBavK-ThqvEkbwAnR-1xTDwY=',
    },
    {
        name: '字母拼圖',
        source: 'https://m.media-amazon.com/images/I/7160h91M4nL._AC_UF894,1000_QL80_.jpg',
    },
    {
        name: '撒了一地拼圖',
        source: 'https://shoplineimg.com/62a06588ddc6f4001641725d/62b0781603336b002412fd2a/800x.jpg?',
    },
]

export default function ProjectSelectImages({max}) {
    return (
        <ul role="list"
            className="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 sm:gap-x-6 lg:grid-cols-4 xl:gap-x-8">
            {(max ? files.splice(0, max) : files).map((file, index) => (
                <li key={index} className="relative">
                    <div
                        className="group aspect-h-7 aspect-w-10 block w-full overflow-hidden rounded-lg bg-gray-100 focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 focus-within:ring-offset-gray-100">
                        <img src={file.source} alt=""
                             className="pointer-events-none object-cover group-hover:opacity-75"/>
                        <button type="button" className="absolute inset-0 focus:outline-none">
                            <span className="sr-only">View details for {file.name}</span>
                        </button>
                    </div>
                    <p className="pointer-events-none mt-2 block truncate text-sm font-medium text-gray-900">{file.name}</p>
                </li>
            ))}
        </ul>
    )
}
