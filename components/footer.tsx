'use client';

import type { FC } from 'react';

const Footer: FC = () => {
    return (
        <div className='border-t border-white/10 bg-[#050505] py-24' id='footer'>
            <div className='mx-auto max-w-7xl px-6'>
                <div className='mb-16'>
                    <span className='material-symbols-outlined text-amber-500'>candlestick_chart</span>
                    <span className='text-lg font-bold text-white'>
                        Scaping<span className='text-amber-500'>Fx</span>
                    </span>
                    <p className='max-w-2xl text-sm leading-relaxed text-gray-500'>ScapingFx cung cấp các tín hiệu giao dịch Vàng (XAU/USD) được hỗ trợ bởi AI cho mục đích tham khảo. Giao dịch Vàng ký quỹ mang lại rủi ro cao, vui lòng cân nhắc kỹ trước khi tham gia.</p>
                </div>
                <div className='flex flex-col items-center justify-between gap-4 border-t border-white/5 pt-8 sm:flex-row'>
                    <p className='text-xs text-gray-600'>© 2026 ScapingFx. Chuyên gia tín hiệu Vàng.</p>
                </div>
            </div>
        </div>
    );
};

export default Footer;
