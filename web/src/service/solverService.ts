import {spawn} from 'child_process';
import path from 'node:path';

const winExecutablePath = path.join(process.cwd(), "dist", 'executable.exe');
const linuxExecutablePath = "/app/dist/executable";
const executablePath = process.platform === 'win32' ? winExecutablePath : linuxExecutablePath;

export interface SolverInput {
    complete_image_base64: string;
    piece_image_base64: string;
}

export interface SolverOutputItem {
    name: string;
    base64: string;
}

export async function solver(data: SolverInput): Promise<SolverOutputItem[]> {
    console.log('executablePath', executablePath);
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
            } catch {
                reject(new Error('Failed to parse output'));
            }
        });

        // 發送輸入數據到 Python 腳本
        process.stdin.write(JSON.stringify(data));
        process.stdin.end();
    });
}
