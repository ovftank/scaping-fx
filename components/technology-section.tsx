'use client';

import type { FC } from 'react';

const TechnologySection: FC = () => {
    return (
        <section className='relative bg-black py-24' id='technology'>
            <div className='mx-auto max-w-7xl px-6'>
                <div className='mb-16 flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end'>
                    <div>
                        <div className='mb-4 text-3xl font-bold tracking-tight sm:text-4xl'>Công Nghệ &amp; Cộng Đồng</div>
                        <p className='max-w-lg text-gray-400'>Hệ sinh thái giao dịch Vàng toàn diện với sự hỗ trợ của AI và thông báo trực tiếp.</p>
                    </div>
                    <a className='group flex items-center gap-1 rounded font-medium text-amber-500 transition-colors hover:text-white focus-visible:ring-2 focus-visible:ring-amber-500/50 focus-visible:outline-none' href='#'>
                        Tìm hiểu thêm
                        <span className='material-symbols-outlined text-lg transition-transform group-hover:translate-x-1'>arrow_forward</span>
                    </a>
                </div>
                <div className='grid gap-8 sm:grid-cols-2'>
                    <div className='group relative overflow-hidden rounded-xl border border-white/10 bg-[#0f0f0f] p-10 transition-all hover:border-amber-500/50 hover:bg-[#151515]'>
                        <div className='absolute top-0 right-0 p-4 opacity-10 transition-opacity group-hover:opacity-20'>
                            <span className='material-symbols-outlined text-8xl text-white'>psychology</span>
                        </div>
                        <div className='mb-8 flex h-16 w-16 items-center justify-center rounded-lg border border-amber-500/20 bg-amber-500/10 text-amber-500'>
                            <span className='material-symbols-outlined text-4xl'>psychology</span>
                        </div>
                        <div className='mb-4 text-2xl font-bold text-white'>Phân tích XAU/USD 24/7</div>
                        <p className='text-base leading-relaxed text-gray-400'>Thuật toán độc quyền phân tích tâm lý thị trường và dữ liệu vĩ mô theo thời gian thực để dự đoán các điểm đảo chiều của giá Vàng với độ chính xác tối ưu.</p>
                    </div>
                    <div className='group relative overflow-hidden rounded-xl border border-white/10 bg-[#0f0f0f] p-10 transition-all hover:border-amber-500/50 hover:bg-[#151515]'>
                        <div className='absolute top-0 right-0 p-4 opacity-10 transition-opacity group-hover:opacity-20'>
                            <span className='material-symbols-outlined text-8xl text-white'>send</span>
                        </div>
                        <div className='mb-8 flex h-16 w-16 items-center justify-center rounded-lg border border-amber-500/20 bg-amber-500/10 text-amber-500'>
                            <span className='material-symbols-outlined text-4xl'>notifications_active</span>
                        </div>
                        <div className='mb-4 text-2xl font-bold text-white'>Thông báo Telegram 24/7</div>
                        <p className='text-base leading-relaxed text-gray-400'>Nhận thông báo tín hiệu Entry, SL, TP ngay lập tức qua Telegram. Không bao giờ bỏ lỡ cơ hội giao dịch quan trọng dù bạn đang ở bất cứ đâu.</p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default TechnologySection;
