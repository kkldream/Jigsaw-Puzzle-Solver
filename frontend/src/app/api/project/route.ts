import {ResponseSuccess} from "@/app/api/responseMethod";

export interface ProjectItem {
    id: string;
    name: string;
    imageUrl: string;
}

export interface ApiProjectGet {
    projects: ProjectItem[];
}

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const limit = parseInt(searchParams.get('limit') as string);
    const files = [
        {
            id: "123",
            name: '蠟筆小新',
            imageUrl: 'https://down-tw.img.susercontent.com/file/cn-11134207-7qukw-lhkp6bnmczxf4a',
        },
        {
            id: "123",
            name: '寶可夢',
            imageUrl: 'https://www.jinn-foot.com.tw/data/editor/images/%E7%9B%92%E8%A3%9D%E6%8B%BC%E5%9C%96/1000%E7%89%87%E7%9B%92%E8%A3%9D/%E5%AF%B6%E5%8F%AF%E5%A4%A2%201000%E7%89%87%E7%9B%92%E8%A3%9D%E6%8B%BC%E5%9C%96(D)-%E5%85%A7%E6%8B%BC.jpg',
        },
        {
            id: "123",
            name: '迪士尼公主系列',
            imageUrl: 'https://mall.iopenmall.tw/website/uploads_product/website_7233/P0723300465110_3_57346722.jpeg?hash=12132',
        },
        {
            id: "123",
            name: '弱智拼圖',
            imageUrl: 'https://media.istockphoto.com/id/1442727551/zh/%E5%90%91%E9%87%8F/incomplete-jigsaw-puzzle.jpg?s=612x612&w=0&k=20&c=JlFkiDdqvDasOmksJ0vLBavK-ThqvEkbwAnR-1xTDwY=',
        },
        {
            id: "123",
            name: '字母拼圖',
            imageUrl: 'https://m.media-amazon.com/images/I/7160h91M4nL._AC_UF894,1000_QL80_.jpg',
        },
        {
            id: "123",
            name: '撒了一地拼圖',
            imageUrl: 'https://shoplineimg.com/62a06588ddc6f4001641725d/62b0781603336b002412fd2a/800x.jpg?',
        },
    ];
    return ResponseSuccess<ApiProjectGet>({
        projects: files.filter((_, i) => i < limit),
    });
}
