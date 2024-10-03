import { promises as fs } from 'fs';

// 讀取輸入圖像並轉換為 base64
export async function pathToImageBase64(imagePath) {
    const inputImageBuffer = await fs.readFile(imagePath);
    const inputBase64 = inputImageBuffer.toString('base64');
    return inputBase64;
}
