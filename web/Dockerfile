# 階段 1: 構建 Python 可執行文件
FROM python:3.8 AS builder

WORKDIR /app

RUN pip install pyinstaller

COPY ../python/requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY ../python/ .

RUN pyinstaller --onefile executable.py


# 階段 2: 設置 Node.js 環境
FROM node:18-slim

WORKDIR /app

# 安裝必要的系統依賴
RUN apt-get update && apt-get install -y \
    libgl1-mesa-glx \
    libglib2.0-0 \
    libsm6 \
    libxext6 \
    libxrender-dev \
    libglvnd0 \
    libgl1 \
    libglx0 \
    libegl1 \
    libgles2 \
    libglvnd-dev

# 從構建階段複製 Python 可執行文件
COPY --from=builder /app/dist/executable ../python/dist/executable

# 複製 Node.js 應用程序文件
COPY package*.json ./
RUN yarn

COPY . .

RUN yarn build

CMD ["yarn", "start"]
