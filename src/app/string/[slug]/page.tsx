'use client';

import { Encoder, EncoderProps } from '@/components/Encoder';
import { notFound } from 'next/navigation';

const encodings: Array<EncoderProps & { name: string }> = [
  {
    name: 'base64',
    atob: x => Buffer.from(x).toString('base64'),
    btoa: x => Buffer.from(x, 'base64').toString('utf-8'),
  },
  {
    name: 'url',
    atob: x => encodeURIComponent(x),
    btoa: x => decodeURIComponent(x),
  },
]

export default function StringEncodePage({ params }: { params: { slug: string } }) {
  const { slug } = params;

  const props = encodings.find(x => x.name === slug);
  if (!props) {
    notFound();
  }

  return (
    <div className='h-full max-h-96'>
      <Encoder {...props} />
    </div>
  )
}
