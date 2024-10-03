import { spawn } from 'child_process';
import {pathToImageBase64} from './utils.js';

const executablePath = '../python/dist/executable.exe';

async function process(data) {
    return new Promise((resolve, reject) => {
        
        const process = spawn(executablePath);
        
        let outputData = '';
        
        process.stdout.on('data', (data) => {
            outputData += data.toString();
        });
        
        process.stderr.on('data', (data) => {
            console.error(`stderr: ${data}`);
        });
        
        process.on('close', (code) => {
            if (code !== 0) {
                reject(new Error(`Process exited with code ${code}`));
                return;
            }
            
            try {
                const result = JSON.parse(outputData);
                resolve(result);
            } catch (e) {
                reject(new Error('Failed to parse output'));
            }
        });
        
        // 發送輸入數據到 Python 腳本
        process.stdin.write(JSON.stringify(data));
        process.stdin.end();
    });
}

// 使用範例
async function main() {
    try {
        const complete_image_base64 = await pathToImageBase64('../puzzle_complete.jpg');
        const piece_image_base64 = await pathToImageBase64('../puzzle_pieces_1.jpg');

        const result = await process({
          complete_image_base64: complete_image_base64,
          piece_image_base64: piece_image_base64,
        });

        console.log('Processing result:', result);
    } catch (error) {
        console.error('Processing failed:', error);
    }
}

main();
