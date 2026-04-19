# AGENTS.md

本文件提供在 Jigsaw Puzzle Solver repository 內協作時的實務指引。目標是讓貢獻者在不破壞既有流程的前提下，快速理解專案、找到正確檔案、使用一致的語言與修改邊界。

## 專案概觀

Jigsaw Puzzle Solver 是一個拼圖定位輔助工具。使用者會先建立專案並上傳完整拼圖影像，再於專案頁上傳局部拼圖片段照片。系統會呼叫 Python 影像比對 solver，回傳特徵分布、特徵匹配等結果圖，幫助使用者判斷該片拼圖應放置的位置。

## 技術堆疊

- 前端與 API：Next.js 14、React 18、App Router、Tailwind CSS
- 狀態管理：Zustand
- 資料庫：MongoDB + Mongoose
- 物件儲存：AWS S3
- 影像求解：Python、OpenCV / SIFT
- 打包與執行：PyInstaller、Docker
- CI / CD：GitHub Actions
- 部署：Kubernetes base + `main` / `dev` overlays

## 重要目錄與檔案

- `README.md`：給使用者與開發者的專案總覽。
- `AGENTS.md`：本文件，提供協作與修改指引。
- `Dockerfile`：正式建置流程，包含 Python solver 與 Next.js 應用。
- `.github/workflows/`：CI 與部署 workflow。
- `k8s/base/`：共用 Kubernetes 資源定義。
- `k8s/overlays/dev/`：開發環境覆蓋設定。
- `k8s/overlays/main/`：正式環境覆蓋設定。
- `python/solver.py`：拼圖比對核心邏輯。
- `python/executable.py`：solver 打包入口。
- `web/src/app/page.tsx`：首頁。
- `web/src/app/project/page.tsx`：專案列表頁。
- `web/src/app/project/[projectId]/page.tsx`：專案詳情與求解入口。
- `web/src/app/api/project/route.ts`：專案列表 / 建立。
- `web/src/app/api/solve/route.ts`：局部拼圖片段求解。
- `web/src/service/solverService.ts`：Next.js 呼叫 Python 執行檔的橋接。

## 本機開發、測試、建置

### Python solver

```bash
cd python
pip install -r requirements.txt
pip install pyinstaller
pyinstaller --distpath ../web/dist --onefile executable.py
```

### Web app

```bash
cd web
corepack enable
corepack prepare yarn@1.22.22 --activate
yarn install
yarn dev
```

### 驗證與建置

```bash
cd web
yarn lint
yarn build
yarn start
```

## 貢獻規則

- 優先做小範圍、可驗證的修改，不要把內容調整擴大成架構重寫。
- 若修改 UI 文案，請同步檢查首頁、Projects、About、modal 與可見提示是否仍然一致。
- 若修改 API、solver 介面或資料結構，必須確認前端型別、API route、S3 / MongoDB 流程是否仍相容。
- 不要隨意改動 `Dockerfile`、`.github/workflows/`、`k8s/`。這些檔案會直接影響 CI/CD 與部署行為。
- 專案可能存在使用者尚未提交的變更。除非明確要求，請不要回滾與當前任務無關的修改。

## 文案與語言指引

- Repository 文件以繁體中文為主，面向開發者與貢獻者。
- 網站導覽與主要公共頁面目前以英文為主，例如 `Home`、`Projects`、`About`、`New Project`。
- App 內既有的工作流標籤與操作提示可保留繁體中文，例如：
  - `建立新的專案`
  - `參考完整拼圖`
  - `上傳部分拼圖`
- 避免使用泛用佔位詞，例如 `Your Company`、`Julo...`、`Upload a picture`。
- 文案應明確描述三件事：
  - 完整拼圖影像是什麼
  - 局部拼圖片段照片是什麼
  - 系統會產出哪些比對結果

## 部署與環境注意事項

- `web/src/service/solverService.ts` 在不同平台使用不同執行檔路徑；內容改動時不要破壞既有路徑假設。
- `.env` 相關設定至少涉及 MongoDB 與 AWS S3。文件可以改善，但不要擅自更改變數命名與讀取邏輯。
- GitHub Actions 會對 `main`、`dev` 分支執行不同部署上下文；請避免未經確認就改動 branch、image tag、secret 名稱或 Kustomize 路徑。
- K8s overlays 已區分 `main` 與 `dev`，若只是內容或文件修改，不應連帶更動 deployment / service patch。

## 適合優先改善的範圍

- README、AGENTS、About page、首頁與 Projects 頁面的說明文字。
- 顯而易見的 placeholder 文案、`sr-only` 品牌名稱、上傳提示文字。
- 不改邏輯的可讀性改善，例如更清楚的段落、標題、說明卡片。

## 不要輕易變更的範圍

- Python solver 演算法與輸出格式。
- API route 的 request / response 契約。
- MongoDB schema 欄位名稱。
- Docker multi-stage build 流程。
- GitHub Actions 部署邏輯。
- Kubernetes `base` 與 `overlays` 的部署設定。
