'use client';

import classNames from 'classnames';
import { useRouter } from 'next/navigation';
import { ChangeEvent, useCallback, useEffect, useRef, useState } from 'react';
import { useDropzone } from 'react-dropzone';

export default function BgPage() {
  const [preview, setPreview] = useState<string | null>(null);
  const [result, setResult] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleUpload = useCallback(async (files: File[]) => {
    if (files.length === 0) {
      setPreview(null);
      return;
    }

    const formData = new FormData();
    formData.append('file', files[0]);

    if (preview) {
      URL.revokeObjectURL(preview);
    }
    setPreview(URL.createObjectURL(files[0]));
    setLoading(true);

    const resp = await fetch('/api/image/bg', {
      method: 'POST',
      body: formData,
    });
    const body = await resp.json();
    setResult(body.name);
    setLoading(false);
  }, [setResult]);

  const {
    getRootProps,
    getInputProps,
    isDragActive,
    acceptedFiles,
  } = useDropzone({
    multiple: false,
    onDrop: handleUpload,
  });

  return (
    <div className='flex flex-col items-center w-full h-full'>
      <div className='flex flex-row items-stretch w-full flex-1 gap-2'>
        <div className='flex-1' {...getRootProps()}>
          <label
            htmlFor='file'
            className={classNames('flex flex-col items-center justify-center w-full h-full border-2 border-half-white/50 cursor-pointer hover:bg-half-white/5 group file:bg-half-white', {
              'bg-half-white/20': isDragActive,
            })}
          >
            {preview ? (
              <img src={`${preview}`} className='w-full h-full object-contain max-h-[35rem]' />
            ) : (
              isDragActive ? (
                <span>
                  DROP IT
                </span>
              ) : (
                <span>
                  Upload image or drag and drop image here
                </span>
              )
            )}
          </label>
          <input id='file' type='file' className='hidden' {...getInputProps()} />
        </div>

        <div className='flex-1 border-2 border-half-white/50'>
          {
            loading && (
              <div className='flex items-center justify-center w-full h-full'>
                processing...
              </div>
            )
          }
          {result && (
            <img src={`/api/image/bg/${result}`} className='w-full h-full object-contain max-h-[35rem]' />
          )}
        </div>
      </div>

      <div className='flex-grow'>
      </div>
    </div>
  )
}
