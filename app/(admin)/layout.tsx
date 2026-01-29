import '@/app/globals.css';
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
        default: 'Admin | ScapingFx',
        template: '%s | Admin'
    }
};

import type { FC } from 'react';

const AdminLayout: FC<{ children: React.ReactNode }> = ({ children }) => {
    return (
        <html lang='vi' className={`${montserrat.variable} scroll-smooth antialiased`} suppressHydrationWarning>
            <body className='bg-gray-900 text-white'>{children}</body>
        </html>
    );
};

export default AdminLayout;
