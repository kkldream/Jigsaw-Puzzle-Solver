export function toBase64(file: File): Promise<string> {
    return new Promise<string>((resolve) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result as string);
        reader.readAsDataURL(file);
    });
}

export async function getBase64FromUrl(url: string): Promise<string> {
    const response = await fetch(url);
    const buffer = await response.arrayBuffer();
    return Buffer.from(buffer).toString('base64');
}

export function getFileTypeAndExtension(base64: string) {
    // 檢查字串格式是否符合Base64 data URI
    const match = base64.match(/^data:(image\/\w+);base64,/);

    if (match) {
        const fileType = match[1]; // 例如 'image/png'
        const extension = fileType.split('/')[1]; // 例如 'png'

        return {
            fileType: fileType, // 圖片的 MIME 類型
            extension: extension // 副檔名
        };
    } else {
        throw new Error("Invalid Base64 string format");
    }
}
