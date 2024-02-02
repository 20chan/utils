import { removeBg } from '@/lib/bg';
import { writeFile } from 'fs/promises';
import path from 'path';

export const POST = async (req: Request) => {
  const formData = await req.formData();
  const file = formData.get('file') as File | null;
  if (!file) {
    return Response.json({ error: 'No file' }, { status: 400 });
  }

  const ext = path.extname(file.name);
  const name = Buffer.from(path.basename(file.name)).toString('base64url');

  const inputPath = `tmp/input/${name}.${ext}`;
  const outputPath = `tmp/output/${name}.png`;
  await writeFile(inputPath, new Uint8Array(await file.arrayBuffer()));

  await removeBg(inputPath, outputPath);

  return Response.json({
    ok: true,
    name,
  });
}