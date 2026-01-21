import nextVitals from 'eslint-config-next/core-web-vitals';
import nextTs from 'eslint-config-next/typescript';
import { defineConfig, globalIgnores } from 'eslint/config';

const eslintConfig = defineConfig([
    ...nextVitals,
    ...nextTs,
    // Override default ignores of eslint-config-next.
    globalIgnores([
        // Default ignores of eslint-config-next:
        '.next/**',
        'out/**',
        'build/**',
        'next-env.d.ts'
    ]),
    {
        rules: {
            // Warn when using <a href> instead of <Link> for internal navigation
            '@next/next/no-html-link-for-pages': 'warn'
        }
    }
]);

export default eslintConfig;
