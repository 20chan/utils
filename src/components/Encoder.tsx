'use client';

import classNames from 'classnames';
import { useState } from 'react';

type ConvertFn = (x: string) => string | null;

export interface EncoderProps {
  atob?: ConvertFn;
  btoa?: ConvertFn;
}

export function Encoder({
  atob,
  btoa,
}: EncoderProps) {
  const [a, setA] = useState<string>('');
  const [b, setB] = useState<string>('');
  const [aError, setAError] = useState<boolean>(false);
  const [bError, setBError] = useState<boolean>(false);

  const handleAChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setA(e.target.value);
    try {
      setB(atob!(e.target.value)!);
      setAError(false);
    } catch {
      setAError(true);
    }
  }
  const handleBChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setB(e.target.value);
    try {
      setA(btoa!(e.target.value)!);
      setBError(false);
    } catch {
      setBError(true);
    }
  }

  const className = 'flex-1 resize-none bg-transparent border-2 border-half-white/50 p-2 text-half-white focus:outline-none';

  return (
    <div className='flex flex-row items-stretch w-full h-full flex-1 gap-2'>
      {
        atob ? (
          <textarea
            className={classNames(className, {
              'border-half-red/50': aError,
            })}
            value={a}
            onChange={handleAChange}
          />
        ) : (
          <div className='flex-1'>
            {a}
          </div>
        )
      }
      {
        btoa ? (
          <textarea
            className={classNames(className, {
              'border-half-red/50': bError,
            })}
            value={b}
            onChange={handleBChange}
          />
        ) : (
          <div className='flex-1'>
            {b}
          </div>
        )
      }
    </div>
  );
}
