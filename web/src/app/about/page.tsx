export default function Page() {
    return (
        <div className="px-6 py-24 sm:py-32 lg:px-8">
            <div className="mx-auto max-w-5xl">
                <div className="mx-auto max-w-3xl text-center">
                    <h2 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">About</h2>
                    <p className="mt-6 text-lg leading-8 text-gray-600">
                        Jigsaw Puzzle Solver 是一個協助拼圖定位的網站工具。當你手上有一片不知道該放哪裡的拼圖時，
                        不需要只靠肉眼反覆比對整張拼圖；你可以先保存完整拼圖影像，再上傳局部拼圖片段照片，讓系統協助你縮小可能位置。
                    </p>
                </div>

                <div className="mx-auto mt-16 grid max-w-5xl grid-cols-1 gap-6 lg:grid-cols-3">
                    <div className="rounded-2xl bg-white p-8 shadow-sm ring-1 ring-gray-200">
                        <h3 className="text-lg font-semibold text-gray-900">它能做什麼</h3>
                        <p className="mt-4 text-sm leading-6 text-gray-600">
                            每個專案都會先建立一張完整拼圖的參考圖。完成後，你可以上傳局部拼圖片段照片，系統會產出視覺化的比對結果圖，幫助你更快找出這片拼圖可能的位置。
                        </p>
                    </div>
                    <div className="rounded-2xl bg-white p-8 shadow-sm ring-1 ring-gray-200">
                        <h3 className="text-lg font-semibold text-gray-900">適合誰使用</h3>
                        <p className="mt-4 text-sm leading-6 text-gray-600">
                            它適合喜歡拼圖的人、一起挑戰大拼圖的家庭，也適合想把比對流程整理得更清楚、不想每次都從頭重新找位置的使用者。
                        </p>
                    </div>
                    <div className="rounded-2xl bg-white p-8 shadow-sm ring-1 ring-gray-200">
                        <h3 className="text-lg font-semibold text-gray-900">為什麼實用</h3>
                        <p className="mt-4 text-sm leading-6 text-gray-600">
                            除了完整拼圖參考圖，專案也會把你的專案列表與比對結果圖整理在一起，之後回到同一個拼圖時，可以直接從瀏覽器接續查看，不必只靠記憶重找。
                        </p>
                    </div>
                </div>

                <div className="mx-auto mt-16 grid max-w-5xl grid-cols-1 gap-8 lg:grid-cols-2">
                    <section className="rounded-2xl bg-gray-50 p-8 ring-1 ring-gray-200">
                        <h3 className="text-xl font-semibold text-gray-900">使用流程</h3>
                        <ol className="mt-6 space-y-4 text-sm leading-6 text-gray-600">
                            <li>1. 建立專案，先上傳完整拼圖影像作為參考。</li>
                            <li>2. 需要確認某片拼圖位置時，開啟對應的專案。</li>
                            <li>3. 上傳該片局部拼圖片段照片，或拍攝局部區域影像。</li>
                            <li>4. 查看系統產生的結果圖，例如特徵分布與特徵匹配結果。</li>
                            <li>5. 根據這些視覺化比對資訊，判斷拼圖最可能放置的位置。</li>
                        </ol>
                    </section>

                    <section className="rounded-2xl bg-gray-50 p-8 ring-1 ring-gray-200">
                        <h3 className="text-xl font-semibold text-gray-900">技術做法</h3>
                        <ul className="mt-6 space-y-4 text-sm leading-6 text-gray-600">
                            <li>網站介面與 API 由 Next.js 提供。</li>
                            <li>MongoDB 用來保存專案資料與影像相關資訊。</li>
                            <li>AWS S3 負責儲存上傳的拼圖圖片。</li>
                            <li>Python 搭配 OpenCV 與 SIFT 進行影像特徵分析。</li>
                            <li>Docker、GitHub Actions 與 Kubernetes 支援建置與部署流程。</li>
                        </ul>
                    </section>
                </div>

                <div className="mx-auto mt-16 max-w-4xl rounded-2xl bg-white p-8 shadow-sm ring-1 ring-gray-200">
                    <h3 className="text-xl font-semibold text-gray-900">你會看到哪些結果</h3>
                    <p className="mt-4 text-sm leading-6 text-gray-600">
                        Solver 不會只回傳一句簡單的文字答案，而是提供可以實際檢視的結果圖，讓你看到影像特徵如何分布、上傳的拼圖片段和完整拼圖之間如何匹配。遇到不容易一眼判斷的位置時，這些圖會比單純描述更有幫助。
                    </p>
                    <p className="mt-4 text-sm leading-6 text-gray-600">
                        整體來說，Jigsaw Puzzle Solver 想做的是把原本容易卡住的人工找片流程，整理成一套清楚、可重複使用的操作方式，讓影像比對與專案管理可以在同一個介面中完成。
                    </p>
                </div>
            </div>
        </div>
    );
}
