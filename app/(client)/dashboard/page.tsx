import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import Dashboard from '@/components/dashboard';
import type { Recommendation } from '@/types/recommendation';
const fetchRecommendation = async (token: string): Promise<Recommendation  |null> => {
    try {
        const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
        const response = await fetch(`${baseUrl}/api/anticipate`, {
            headers: {
                Authorization: `Bearer ${token}`
            },
            cache: 'no-store'
        });

        if (!response.ok) {
            return null;
        }

        return await response.json();
    } catch {
        return null;
    }
};

const DashboardPage = async () => {
    const cookieStore = await cookies();
    const authToken = cookieStore.get('auth_token')?.value;

    if (!authToken) {
        redirect('/dang-nhap');
    }

    const recommendation = await fetchRecommendation(authToken);

    return (
        <div className='relative overflow-hidden border-t border-white/5 bg-black'>
            <div className='pointer-events-none absolute top-1/4 left-1/4 h-96 w-96 rounded-full bg-amber-500/5 blur-[128px]' />
            <div className='relative z-10 mx-auto max-w-7xl px-4 py-6 sm:px-6 sm:py-12'>
                <Dashboard  recommendation={recommendation}/>
            </div>
        </div>
    );
};

export default DashboardPage;
