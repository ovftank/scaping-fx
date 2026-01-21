import '@/app/globals.css';
import Footer from '@/components/footer';
import Header from '@/components/header';
import 'material-symbols/outlined.css';
import type { Metadata } from 'next';
import { Montserrat } from 'next/font/google';

const montserrat = Montserrat({
    subsets: ['latin'],
    display: 'swap',
    variable: '--font-montserrat'
});

const DOMAIN = process.env.DOMAIN ?? 'https://scapingfx.com';

export const metadata: Metadata = {
    metadataBase: new URL(DOMAIN),
    title: {
        default: 'ScapingFx — Tín hiệu Forex AI chính xác',
        template: '%s | ScapingFx'
    },
    description: 'Công cụ phân tích Forex powered by AI với độ chính xác cao. Tín hiệu giao dịch vàng, ngoại hối theo thời gian thực. Giải pháp trading thông minh cho nhà đầu tư hiện đại.',
    applicationName: 'ScapingFx',
    generator: 'Next.js',
    referrer: 'origin-when-cross-origin',
    keywords: ['forex signals', 'ai trading signals', 'tin hieu forex', 'tin hieu vang', 'tin hieu giao dich tu dong', 'fx trading vip', 'forex vietnam', 'dau tu forex', 'phan thi forex', 'scapingfx'],
    authors: [{ name: 'ScapingFx Team', url: DOMAIN }],
    creator: 'ScapingFx',
    publisher: 'ScapingFx',
    alternates: {
        canonical: '/',
        languages: {
            vi: DOMAIN,
            en: `${DOMAIN}/en`
        }
    },
    openGraph: {
        title: 'ScapingFx — Tín hiệu Forex AI chính xác',
        description: 'Nền tảng tín hiệu giao dịch Forex bằng AI với độ chính xác vượt trội. Phân tích tự động vàng, ngoại hối 24/7. Bắt đầu trading thông minh ngay hôm nay.',
        url: DOMAIN,
        siteName: 'ScapingFx',
        locale: 'vi_VN',
        type: 'website',
        images: [
            {
                url: '/og-image.png',
                width: 1200,
                height: 630,
                alt: 'ScapingFx — AI Trading Signals Platform'
            }
        ]
    },
    twitter: {
        card: 'summary_large_image',
        title: 'ScapingFx — Tín hiệu Forex AI chính xác',
        description: 'Nền tảng tín hiệu giao dịch Forex bằng AI với độ chính xác vượt trội. Phân tích tự động vàng, ngoại hối 24/7.',
        images: ['/twitter-image.png']
    },
    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
            'max-video-preview': -1,
            'max-image-preview': 'large',
            'max-snippet': -1
        }
    },
    verification: {
        google: ''
    }
};

import type { FC } from 'react';

const MarketingLayout: FC<{ children: React.ReactNode }> = ({ children }) => {
    return (
        <html lang='vi' className={`${montserrat.variable} scroll-smooth antialiased`} suppressHydrationWarning>
            <body className='bg-black text-white'>
                <div className='bg-grid-pattern pointer-events-none fixed inset-0 z-0 opacity-20' />
                <div className='relative z-10 flex min-h-screen flex-col'>
                    <Header />
                    <div className='flex-1'>{children}</div>
                    <Footer />
                </div>
            </body>
        </html>
    );
};

export default MarketingLayout;