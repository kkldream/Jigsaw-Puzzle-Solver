export function imageFileToBase64Url(file: File): Promise<string> {
    return new Promise<string>((resolve) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result as string);
        reader.readAsDataURL(file);
    });
}

export async function imageUrlToBase64(url: string): Promise<string> {
    const response = await fetch(url);
    const buffer = await response.arrayBuffer();
    return Buffer.from(buffer).toString('base64');
}

export function base64UrlToFileTypeAndExtension(base64Url: string) {
    // 檢查字串格式是否符合Base64 data URI
    const match = base64Url.match(/^data:(image\/\w+);base64,/);

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

export function base64ToBase64Url(base64: string) {
    let format = '';
    if (base64.startsWith('/9j')) {
        format = 'jpeg';
    } else if (base64.startsWith('iVBORw0KGgo')) {
        format = 'png';
    } else if (base64.startsWith('R0lGODdh') || base64.startsWith('R0lGODlh')) {
        format = 'gif';
    } else if (base64.startsWith('UklGR')) {
        format = 'webp';
    } else {
        throw new Error('未知的圖片格式');
    }
    return `data:image/${format};base64,${base64}`;
}
