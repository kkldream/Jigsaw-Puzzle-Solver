import {spawn} from 'child_process';

const executablePath = 'C:\\GitHub\\Jigsaw-Puzzle-Solver\\frontend\\public\\executable.exe';

export interface SolverInput {
    complete_image_base64: string;
    piece_image_base64: string;
}

export interface SolverOutputItem {
    name: string;
    base64: string;
}

export async function solver(data: SolverInput): Promise<SolverOutputItem[]> {
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
