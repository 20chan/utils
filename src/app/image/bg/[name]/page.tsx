import { stat } from 'fs/promises';
import path from 'path';

export default async function BgPage({ params }: { params: { name: string } }) {
  const { name } = params;

  return (
    <div>
      <img src={`/api/image/bg/${name}`} />
    </div>
  )
}