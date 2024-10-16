const MAX_DIMENSION = 300;

export async function resizeImage(file: File): Promise<File> {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = function (e: ProgressEvent<FileReader>) {
            const img = new Image();
            img.onload = function () {
                const canvas = document.createElement('canvas');
                let width = img.width;
                let height = img.height;

                if (width > height) {
                    if (width > MAX_DIMENSION) {
                        height *= MAX_DIMENSION / width;
                        width = MAX_DIMENSION;
                    }
                } else {
                    if (height > MAX_DIMENSION) {
                        width *= MAX_DIMENSION / height;
                        height = MAX_DIMENSION;
                    }
                }

                canvas.width = width;
                canvas.height = height;
                const ctx = canvas.getContext('2d');
                if (!ctx) {
                    reject(new Error("Canvas 2D Context is null"));
                    return;
                }
                ctx.drawImage(img, 0, 0, width, height);
                canvas.toBlob(
                    (blob) => {
                        if (!blob) {
                            reject(new Error("Blob creation failed"));
                            return;
                        }
                        resolve(new File([blob], file.name, {type: 'image/jpeg'}));
                    },
                    'image/jpeg',
                    0.85
                );
            };
            img.onerror = () => reject(new Error("Image loading failed"));
            if (typeof e.target?.result === 'string') {
                img.src = e.target.result;
            } else {
                reject(new Error("Failed to load image"));
            }
        };
        reader.onerror = () => reject(new Error("File reading failed"));
        reader.readAsDataURL(file);
    });
}
