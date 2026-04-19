import ProjectMenu from "@/app/_components/ProjectMenu";

export default function Home() {
    return (
        <div className="py-24 sm:py-32 lg:pb-40">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <div className="mx-auto max-w-2xl text-center">
                    <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
                        <span className="text-red-600">J</span>
                        igsaw P
                        <span className="text-red-600">u</span>
                        zz
                        <span className="text-red-600">l</span>
                        e S
                        <span className="text-red-600">o</span>
                        lver
                    </h1>
                    <p className="mt-6 text-lg leading-8 text-gray-600">
                        Jigsaw Puzzle Solver 會先讓你上傳完整拼圖作為參考，再上傳手上的局部拼圖片段照片，
                        系統會產出特徵分布與特徵匹配等比對結果圖，協助你判斷這片拼圖最可能的位置。你也可以從這裡快速查看最近的專案並繼續處理中的拼圖。
                    </p>
                </div>
                <div className="mt-16 flow-root sm:mt-24">
                    <div
                        className="-m-2 rounded-xl bg-gray-900/5 p-2 ring-1 ring-inset ring-gray-900/10 lg:-m-4 lg:rounded-2xl lg:p-4">
                        <ProjectMenu max={4}/>
                    </div>
                </div>
                <div className="mt-10 flex items-center justify-center gap-x-6">
                    <a href="/project" className="text-sm font-semibold leading-6 text-gray-900">
                        查看更多專案 <span aria-hidden="true">→</span>
                    </a>
                </div>
            </div>
        </div>
    );
}
