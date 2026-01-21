import { PrismaClient } from '@/lib/generated/prisma/client';
import { PrismaBetterSqlite3 } from '@prisma/adapter-better-sqlite3';

const adapter = new PrismaBetterSqlite3({
    url: process.env.DATABASE_URL ?? 'file:./dev.db'
});

const prisma = new PrismaClient({ adapter });

const main = async () => {
    await prisma.user.upsert({
        where: { username: 'admin' },
        update: {},
        create: {
            username: 'admin',
            password: 'admin123',
            role: 'ADMIN',
            active: true
        }
    });
};

main()
    .catch((e) => {
        console.error('seed failed:', e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
