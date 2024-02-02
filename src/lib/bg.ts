import { exec } from 'child_process';

export async function removeBg(inputPath: string, outputPath: string) {
  return new Promise((resolve, reject) => {
    exec(`python3 -m carvekit -i "${inputPath}" -o "${outputPath}" --device cuda`, (error: any, stdout: any, stderr: any) => {
      resolve(stdout)
    });
  })
}