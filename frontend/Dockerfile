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

# 複製 Node.js 應用程序文件
COPY package*.json ./
RUN yarn

COPY . .

CMD ["yarn", "dev"]
