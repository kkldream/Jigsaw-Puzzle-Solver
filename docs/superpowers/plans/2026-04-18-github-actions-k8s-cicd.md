# GitHub Actions 與 K8s CI/CD 遷移 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 以 GitHub Actions 取代 Jenkins，新增 `ci.yml`、`deploy.yml` 與 `k8s` manifests，讓 `main` / `dev` 可部署到 Kubernetes。

**Architecture:** 以兩份 workflow 分離 CI 與 CD。`ci.yml` 處理 lint 與 Docker build 驗證；`deploy.yml` 處理 image build/push、K8s Secret 更新與 `kubectl apply -k`。K8s 採用 `base + overlays` 的 kustomize 結構。

**Tech Stack:** GitHub Actions, Docker, Kubernetes, Kustomize, Next.js, Node.js, PyInstaller

---

### Task 1: 建立設計與規劃文件

**Files:**
- Create: `docs/superpowers/specs/2026-04-18-github-actions-k8s-cicd-design.md`
- Create: `docs/superpowers/plans/2026-04-18-github-actions-k8s-cicd.md`

- [ ] **Step 1: 寫入設計文件**

```text
建立遷移目標、workflow 拆分、runner / registry / namespace、k8s 結構、secret 策略與驗證策略。
```

- [ ] **Step 2: 寫入實作計畫**

```text
建立本計畫文件，列出 workflow、k8s、驗證、PR 與 Action 檢查等任務。
```

- [ ] **Step 3: 確認文件已寫入**

Run: `Get-ChildItem docs/superpowers/specs,docs/superpowers/plans`
Expected: 看到本次新增的 spec 與 plan 檔案

- [ ] **Step 4: Commit**

```bash
git add docs/superpowers/specs/2026-04-18-github-actions-k8s-cicd-design.md docs/superpowers/plans/2026-04-18-github-actions-k8s-cicd.md
git commit -m "docs: add github actions migration spec and plan"
```

### Task 2: 建立 GitHub Actions workflow

**Files:**
- Create: `.github/workflows/ci.yml`
- Create: `.github/workflows/deploy.yml`

- [ ] **Step 1: 撰寫 CI workflow**

```yaml
name: CI

on:
  push:
    branches: [main, dev]
  pull_request:
    branches: [main, dev]

jobs:
  verify:
    runs-on: kkldream-jigsaw-puzzle-solver
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: yarn
          cache-dependency-path: web/yarn.lock
      - run: yarn install --frozen-lockfile
        working-directory: web
      - run: yarn lint
        working-directory: web
      - run: docker build -t jigsaw-puzzle-solver-ci:${{ github.sha }} -f Dockerfile .
```

- [ ] **Step 2: 撰寫 Deploy workflow**

```yaml
name: Deploy to K8s

on:
  push:
    branches: [main, dev]
  workflow_dispatch:

env:
  IMAGE_NAME: jigsaw-puzzle-solver
  IMAGE_REGISTRY: registry.kkserver.net
  K8S_NAMESPACE: apps
```

- [ ] **Step 3: 加入 deploy job 內容**

```yaml
steps:
  - uses: actions/checkout@v4
  - name: Set deploy context
    run: |
      set -euo pipefail
      REF_NAME="${{ github.ref_name }}"
      SHORT_SHA=$(echo "${{ github.sha }}" | cut -c1-7)
      REF_SLUG=$(echo "$REF_NAME" | tr '[:upper:]' '[:lower:]' | sed -E 's#[^a-z0-9._-]+#-#g; s#-+#-#g; s#(^[-.]+|[-.]+$)##g')
      IMAGE_TAG="${REF_SLUG}-${SHORT_SHA}"
      IMAGE_REF="${{ env.IMAGE_REGISTRY }}/${{ env.IMAGE_NAME }}"
      echo "IMAGE_TAG=${IMAGE_TAG}" >> "$GITHUB_ENV"
      echo "IMAGE_REF=${IMAGE_REF}" >> "$GITHUB_ENV"
```

- [ ] **Step 4: Commit**

```bash
git add .github/workflows/ci.yml .github/workflows/deploy.yml
git commit -m "ci: add github actions workflows"
```

### Task 3: 建立 Kubernetes manifests

**Files:**
- Create: `k8s/base/kustomization.yaml`
- Create: `k8s/base/deployment.yaml`
- Create: `k8s/base/service.yaml`
- Create: `k8s/overlays/main/kustomization.yaml`
- Create: `k8s/overlays/main/deployment-patch.yaml`
- Create: `k8s/overlays/main/service-patch.yaml`
- Create: `k8s/overlays/dev/kustomization.yaml`
- Create: `k8s/overlays/dev/deployment-patch.yaml`
- Create: `k8s/overlays/dev/service-patch.yaml`

- [ ] **Step 1: 建立 base kustomization**

```yaml
apiVersion: kustomize.config.k8s.io/v1beta1
kind: Kustomization
resources:
  - deployment.yaml
  - service.yaml
```

- [ ] **Step 2: 建立 base deployment / service**

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: jigsaw-puzzle-solver
spec:
  replicas: 1
```

- [ ] **Step 3: 建立 main / dev overlays**

```yaml
apiVersion: kustomize.config.k8s.io/v1beta1
kind: Kustomization
namespace: apps
nameSuffix: -main
resources:
  - ../../base
```

- [ ] **Step 4: Commit**

```bash
git add k8s
git commit -m "deploy: add k8s manifests"
```

### Task 4: 驗證 workflow 與 k8s 設定

**Files:**
- Test: `.github/workflows/ci.yml`
- Test: `.github/workflows/deploy.yml`
- Test: `k8s/overlays/main/kustomization.yaml`
- Test: `k8s/overlays/dev/kustomization.yaml`

- [ ] **Step 1: 執行 lint 驗證**

Run: `yarn install --frozen-lockfile && yarn lint`
Expected: 若失敗，取得實際錯誤並評估是否屬既有問題

- [ ] **Step 2: 執行 Docker build 驗證**

Run: `docker build -t jigsaw-puzzle-solver-local -f Dockerfile .`
Expected: image build 成功

- [ ] **Step 3: 驗證 kustomize overlay**

Run: `kubectl kustomize k8s/overlays/main` 及 `kubectl kustomize k8s/overlays/dev`
Expected: 皆可正確輸出 Deployment 與 Service YAML

- [ ] **Step 4: Commit**

```bash
git add .
git commit -m "chore: verify github actions migration config"
```

### Task 5: 提交 PR 並檢查 Action

**Files:**
- Modify: Git history / PR metadata

- [ ] **Step 1: 檢查工作樹狀態**

Run: `git status --short`
Expected: 僅包含本次變更，無意外檔案

- [ ] **Step 2: 推送分支**

Run: `git push -u origin feat/github-actions-k8s-cicd`
Expected: 分支成功上傳

- [ ] **Step 3: 建立 PR 到 dev**

```text
Title: ci: migrate Jenkins pipeline to GitHub Actions
Base: dev
Head: feat/github-actions-k8s-cicd
```

- [ ] **Step 4: 檢查 GitHub Actions 執行狀態**

Run: 透過 GitHub UI 或 API 查詢 PR / branch 對應 workflow run
Expected: 至少看到 `CI` 觸發；若 `deploy` 也觸發，記錄成功或失敗原因
