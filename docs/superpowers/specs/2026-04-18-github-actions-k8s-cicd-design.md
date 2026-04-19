# GitHub Actions 與 K8s CI/CD 遷移設計

**日期**: 2026-04-18  
**專案**: Jigsaw Puzzle Solver

## 目標

將目前以 Jenkins 執行的 Docker build 與單機容器部署流程，重構為 GitHub Actions + Kubernetes 的 CI/CD。新流程需參考 `kkldream/Food-Map-Server` 的 workflow 與 `k8s` 目錄結構，並保留 `main` / `dev` 雙分支部署能力。

## 現況摘要

- 目前 CI/CD 定義在根目錄 `Jenkinsfile`
- Jenkins 僅在 `main` 分支部署
- 部署方式為 Jenkins 主機直接 `docker build` 與 `docker run`
- 應用埠為 `3000`
- 應用執行需要以下敏感變數：
  - `MONGODB_URL`
  - `AWS_ACCESS_KEY_ID`
  - `AWS_SECRET_ACCESS_KEY`
  - `AWS_REGION`
- 專案目前沒有 repo 內的 `k8s` manifests，也沒有 GitHub Actions workflow

## 設計決策

### 1. Workflow 拆分

採用兩份 workflow：

- `ci.yml`
  - 針對 `push` / `pull_request` 到 `main`、`dev`
  - 執行 `web` 的 `yarn lint`
  - 執行根目錄 `Dockerfile` 的 Docker build 驗證
- `deploy.yml`
  - 針對 `push` 到 `main`、`dev`
  - 支援 `workflow_dispatch`
  - 建立映像、推送到 registry、更新 K8s Secret、部署到 K8s

此拆分讓 lint 問題不直接阻塞部署，同時仍保留 CI 可見性。

### 2. 執行環境

- GitHub Actions runner label: `kkldream-jigsaw-puzzle-solver`
- Container registry: `registry.kkserver.net`
- Kubernetes namespace: `apps`
- 部署目標透過 runner 上既有的 `docker` 與 `kubectl` 設定完成

### 3. Kubernetes 結構

建立與 `Food-Map-Server` 類似的 `k8s` 結構：

- `k8s/base`
  - `deployment.yaml`
  - `service.yaml`
  - `kustomization.yaml`
- `k8s/overlays/main`
- `k8s/overlays/dev`

`base` 放共用 Deployment / Service，overlay 負責：

- namespace
- name suffix
- label / selector 覆蓋
- secret name 覆蓋
- image registry / tag 覆蓋

### 4. 分支與命名

- app 名稱：`jigsaw-puzzle-solver`
- overlay:
  - `main` -> `jigsaw-puzzle-solver-main`
  - `dev` -> `jigsaw-puzzle-solver-dev`
- secret:
  - `jigsaw-puzzle-solver-secrets-main`
  - `jigsaw-puzzle-solver-secrets-dev`
- image:
  - `registry.kkserver.net/jigsaw-puzzle-solver:<branch>-<short_sha>`

### 5. Secret 管理

敏感值維持 GitHub Repository Secrets -> Kubernetes Secret：

- `MONGODB_URL`
- `AWS_ACCESS_KEY_ID`
- `AWS_SECRET_ACCESS_KEY`
- `AWS_REGION`

不使用 ConfigMap 儲存敏感值。

### 6. Kubernetes 資源內容

Deployment：

- 單副本 `replicas: 1`
- `containerPort: 3000`
- `NODE_ENV=production`
- `envFrom.secretRef`
- readiness / liveness probe 均打 `/`
- 保守 resources requests / limits

Service：

- `ClusterIP`
- `port: 3000`
- `targetPort: 3000`

本次不新增 Ingress，由既有外部流量入口另行管理。

## 資訊安全與操作邊界

- workflow 不將明文 secret 寫入 repo
- workflow 僅在 `main` / `dev` 自動部署
- `pull_request` 僅執行 CI，不碰叢集
- 所有 K8s 寫入均限定於 `apps` namespace

## 驗證策略

本次重構完成後，至少驗證：

- `web` 的 `yarn lint` 可執行
- root `Dockerfile` 可 build
- `kubectl kustomize` 或等效指令可展開 `k8s/overlays/main` 與 `k8s/overlays/dev`
- workflow YAML 結構正確
- 建立 PR 到 `dev` 後，確認 GitHub Actions 的 `ci` / `deploy` 執行狀態

## 風險

- 若 runner 未預先登入 `registry.kkserver.net`，push 會失敗
- 若 runner 的 `kubectl` context 或權限不足，deploy 會失敗
- 若目前程式既有 lint 問題，`ci.yml` 可能失敗，但這不應阻塞 `deploy.yml`
