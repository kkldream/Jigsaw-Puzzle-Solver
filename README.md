# Jigsaw Puzzle Solver

Jigsaw Puzzle Solver 是一個協助使用者「找出拼圖片段屬於完整拼圖哪個位置」的 Web 應用程式。使用者先建立專案並上傳完整拼圖影像，之後可在專案頁面上傳局部拼圖片段照片，系統會透過影像特徵比對流程產出結果圖，例如特徵分布與特徵配對結果，協助判斷該片拼圖應放置的位置。

## 主要功能

- 建立拼圖專案並保存完整拼圖影像。
- 首頁顯示近期專案，方便快速回到最近處理的拼圖。
- Projects 頁面列出所有專案，已登入使用者可建立新專案。
- 專案詳情頁可上傳局部拼圖片段照片並執行查找。
- 顯示求解結果影像，例如 feature distribution、feature matching 等分析圖。
- 以 MongoDB 保存專案資料，以 AWS S3 保存影像檔案。

## 架構概觀

- `web/`：Next.js 14 前端與 API routes。
- `python/`：以 OpenCV/SIFT 為核心的拼圖求解程式，最終會被打包成可執行檔。
- `MongoDB`：保存專案名稱、影像資訊與基本中繼資料。
- `AWS S3`：保存完整拼圖影像與相關影像資產。
- `Dockerfile`：多階段建置，先打包 Python solver，再建置 Next.js 應用。
- `GitHub Actions`：執行 lint、Docker build，以及 `main` / `dev` 分支的部署流程。
- `k8s/overlays/main`、`k8s/overlays/dev`：分別對應正式與開發環境的 Kubernetes 覆蓋設定。

## Repo 結構

```text
.
├── README.md
├── AGENTS.md
├── Dockerfile
├── .github/workflows/     # CI 與部署流程
├── k8s/                   # base 與 main/dev overlays
├── python/                # OpenCV / SIFT solver 與執行檔入口
└── web/                   # Next.js App Router、API routes、前端元件
```

其中幾個常用位置如下：

- `web/src/app/page.tsx`：首頁。
- `web/src/app/project/page.tsx`：專案列表頁。
- `web/src/app/project/[projectId]/page.tsx`：專案詳情與拼圖查找流程。
- `web/src/app/api/project/route.ts`：專案建立與列表 API。
- `web/src/app/api/solve/route.ts`：呼叫 solver 的 API。
- `web/src/service/solverService.ts`：Next.js 端呼叫 Python 可執行檔的橋接層。
- `python/executable.py`：PyInstaller 打包入口。
- `python/solver.py`：影像比對核心邏輯。

## 本機開發

### 1. 安裝 Python 依賴

```bash
cd python
pip install -r requirements.txt
pip install pyinstaller
```

### 2. 產生 solver 可執行檔

```bash
cd python
pyinstaller --distpath ../web/dist --onefile executable.py
```

### 3. 設定 Web 環境變數

以 `web/.env.example` 為基礎建立 `.env.local`，至少需要：

```env
MONGODB_URL=mongodb://<username>:<password>@<host>:<port>
AWS_ACCESS_KEY_ID=...
AWS_SECRET_ACCESS_KEY=...
AWS_REGION=ap-northeast-1
```

### 4. 安裝前端依賴並啟動開發伺服器

```bash
cd web
corepack enable
corepack prepare yarn@1.22.22 --activate
yarn install
yarn dev
```

預設會啟動在 `http://localhost:3000`。

## 常用指令

```bash
cd web
yarn dev
yarn lint
yarn build
yarn start
```

若要重新產生 solver，可回到 `python/` 再執行一次 PyInstaller 打包。

## 部署概觀

- 根目錄 `Dockerfile` 會先在 Python 階段打包 solver，再在 Node.js 階段安裝前端依賴與建置 Next.js。
- GitHub Actions 的 CI 會在 Pull Request 上執行 `yarn lint` 與 Docker build。
- `main` 與 `dev` 分支推送後會觸發部署 workflow：
  - 建立並推送 Docker image。
  - 以 GitHub Secrets 建立或更新 Kubernetes Secret。
  - 套用 `k8s/overlays/main` 或 `k8s/overlays/dev`。
  - 等待 deployment rollout 完成。

若只是調整內容、文案或 UI，請避免順手變更 Dockerfile、workflow 與 K8s overlay，除非你已確認部署需求真的改變。

## 疑難排解

- `Process exited with code ...`
  - 通常表示 Python solver 可執行檔不存在、打包失敗，或執行環境缺少必要系統函式庫。先重新產生 `web/dist/executable`，再確認 Docker / 主機安裝了 OpenCV 所需依賴。
- `MONGODB_URI is not set`
  - 專案實作實際讀取的是 `MONGODB_URL`。請確認 `.env.local` 已設定且有被 Next.js 載入。
- 上傳成功但查找失敗
  - 先確認 S3 憑證可用、完整拼圖影像可被存取，並檢查 solver 輸出是否能正確解析為 JSON。
- 本機看不到求解結果圖
  - 檢查是否已登入、是否成功上傳局部拼圖片段，以及瀏覽器 console / Next.js server log 是否有 API 錯誤訊息。

## 補充

本專案同時涵蓋前端、影像處理、容器化與 K8s 部署設定。若你要調整文件或介面文案，請優先維持：

- 使用者對「完整拼圖 / 局部拼圖片段 / 比對結果」的理解一致。
- 英文導覽與按鈕文案的一致性。
- 已存在的繁體中文工作流標籤與操作提示。
