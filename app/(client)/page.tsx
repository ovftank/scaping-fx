import HeroSection from '@/components/hero-section';
import HistorySection from '@/components/history-section';
import LiveSignalsSection from '@/components/live-signals-section';
import PartnersSection from '@/components/partners-section';
import TechnologySection from '@/components/technology-section';
import type { FC } from 'react';

const Page: FC = () => {
    return (
        <>
            <HeroSection />
            <TechnologySection />
            <LiveSignalsSection />
            <HistorySection />
            <PartnersSection />
        </>
    );
};

export default Page;
