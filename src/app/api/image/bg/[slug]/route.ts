import { readFile } from 'fs/promises';

export const GET = async (req: Request, { params }: { params: { slug: string } }) => {
  const { slug } = params;

  const path = `tmp/output/${slug}.png`;
  const file = await readFile(path);
  return new Response(file, {
    status: 200,
    headers: {
      'Content-Type': 'image/png',
    },
  });
}