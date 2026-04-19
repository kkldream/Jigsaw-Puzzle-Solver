import sharp from 'sharp';

export async function base64UrlToWidthAndHeight(
    base64Url: string,
): Promise<{ width: number; height: number }> {
    const base64 = base64Url.replace(/^data:image\/\w+;base64,/, '');
    const buffer = Buffer.from(base64, 'base64');
    const metadata = await sharp(buffer).metadata();
    if (metadata.width == null || metadata.height == null) {
        throw new Error('無法解析圖片尺寸');
    }
    return { width: metadata.width, height: metadata.height };
}
