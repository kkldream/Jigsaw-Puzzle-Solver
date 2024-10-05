# Jigsaw Puzzle Solver

說明待補...

## 開發環境建置

1. 安裝 Python 開發環境
    ```bash
    pip install opencv-python numpy matplotlib pyinstaller
    ```
2. 使用 PyInstaller 生成執行檔
    ```bash
    cd python
    pyinstaller --distpath ../web/dist --onefile executable.py
    ```
3. 安裝 Next.js 開發環境
    ```bash
    cd ../web
    yarn
    ```
4. 啟動 Next.js 開發伺服器
    ```bash
    yarn dev
    ```
