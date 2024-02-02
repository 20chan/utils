import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { NavigateTab, NavigateTabItems } from '@/components/NavigateTab';
import Link from 'next/link';

const mono = localFont({
  src: [
    {
      path: '../fonts/iosevka-ss04-medium.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../fonts/iosevka-ss04-semibold.woff2',
      weight: '600',
      style: 'semibold',
    },
    {
      path: '../fonts/iosevka-ss04-bold.woff2',
      weight: '700',
      style: 'bold',
    },
  ],
  display: 'block',
});

export const metadata: Metadata = {
  title: "utils",
  description: "utils.0ch.me",
};

const tabs: NavigateTabItems[] = [
  {
    title: 'string',
    path: '/string',
    subItems: [
      {
        title: 'base64',
        path: '/base64',
      },
      {
        title: 'url',
        path: '/url',
      },
    ],
  },
  {
    title: 'image',
    path: '/image',
    subItems: [
      {
        title: 'transparent',
        path: '/bg',
        description: 'Remove background from image',
      },
    ],
  },
];

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${mono.className} p-12 h-screen flex flex-col items-center`}>
        <div className='w-screen max-w-6xl flex flex-col items-center h-full'>
          <Link href='/' className='text-4xl'>
            utils.0ch.me
          </Link>
          <NavigateTab items={tabs} />

          <div className='mt-10 w-full h-full'>
            {children}
          </div>
        </div>
      </body>
    </html>
  );
}
