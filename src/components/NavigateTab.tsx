'use client';

import classNames from 'classnames';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export type NavigateTabItems = {
  title: string;
  path: string;
  subItems?: NavigateTabItems[];
  description?: string;
}

interface NavigateTabProps {
  items: NavigateTabItems[];
  parentPath?: string;
}

export function NavigateTab({
  items,
  parentPath,
}: NavigateTabProps) {
  const path = usePathname();

  const selectedIndex = items.findIndex(x => {
    return path.startsWith(`${parentPath ?? ''}${x.path}`);
  });

  return (
    <div className='w-full pt-3'>
      <div className='flex flex-row border-b-2 border-b-half-white/20 box-border'>
        {
          items.map((x, i) => {
            const path = `${parentPath ?? ''}${x.path}`;
            return (
              <Link key={path} href={path} className={classNames('px-2 py-1 -mb-0.5 border-b-2 uppercase', {
                'text-half-white border-b-half-white': i === selectedIndex,
                'text-half-white/60 hover:text-half-white/80 border-b-transparent hover:border-b-2 hover:border-b-half-white/50': i !== selectedIndex,
              })}>
                {x.title}
              </Link>
            )
          })
        }
      </div>
      {
        selectedIndex !== -1 && items[selectedIndex].subItems && (
          <NavigateTab items={items[selectedIndex].subItems!} parentPath={`${parentPath ?? ''}${items[selectedIndex].path}`} />
        )
      }
      {
        selectedIndex !== -1 && items[selectedIndex].description && (
          <div className='pt-1 text-half-white/60'>{items[selectedIndex].description}</div>
        )
      }
    </div>
  )
}
