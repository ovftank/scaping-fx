# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Rules

0. Luôn luôn phản hồi bằng tiếng Việt
1. **Code Rules**:
    - **BẮT BUỘC** sử dụng `vercel-react-best-practices` skill trước khi viết React/Next.js code
    - **BẮT BUỘC** sử dụng `web-design-guidelines` skill khi viết UI code
    - Sử dụng `ast-grep` skill để tìm kiếm code patterns: `/ast-grep:ast-grep`
    - Sử dụng `rg` (ripgrep) cho non-code search thay vì grep
    - **KHÔNG** cần `resolve-library-id` khi truy vấn documentation - sử dụng trực tiếp các library ID đã biết:
        - TailwindCSS: `websites/tailwindcss`
        - LightweightCharts: `tradingview/lightweight-charts`
        - Lordicon: `websites/lordicon`
        - Zustand: `websites/zustand_pmnd_rs`
        - Next.js: `vercel/next.js`
        - better-sqlite3: `wiselibs/better-sqlite3`
        - Prisma: `prisma/docs`

2. **Development Workflow**:
    - Luôn đọc file trước khi đề xuất thay đổi
    - Sử dụng TodoWrite cho tasks phức tạp (3+ steps)
    - Nếu yêu cầu mơ hồ hoặc thiếu ngữ cảnh: HỎI người dùng trước khi giả định.

3. **Code Principles (KISS, YAGNI, DRY)**:
    - **KISS** (Keep It Simple, Stupid): Giữ code đơn giản, dễ hiểu, dễ bảo trì
    - **YAGNI** (You Aren't Gonna Need It): KHÔNG implement tính năng "trong trường hợp cần sau này" - chỉ làm những gì được yêu cầu
    - **DRY** (Don't Repeat Yourself): Tránh lặp code, nhưng KHÔNG lạm dụng nếu vi phạm KISS/YAGNI

4. **API Response Rules**:
    - Chỉ trả về field mà frontend THỰC SỰ sử dụng
    - Giữ logic đơn giản, không over-abstraction

5. **Frontend Rules**:
    - Chỉ render data mà backend thực sự trả về
    - Không tạo hàm/component "trong trường hợp cần sau này" (tuân thủ YAGNI)
    - **BẮT BUỘC** sử dụng `axios` cho tất cả API calls, **KHÔNG** dùng `fetch()`

```tsx
// CORRECT
import axios from 'axios';
const { data } = await axios.get('/api/prices');

// WRONG
const response = await fetch('/api/prices');
```

## Code Style Rules

### 1. Function Declaration

- **BẮT BUỘC** sử dụng arrow function cho tất cả function
- **KHÔNG** sử dụng function declaration style

### 2. HTML Tags

- **KHÔNG** sử dụng thẻ `h1` → `h6`
- Sử dụng `div`, `span`, `p` với TailwindCSS classes để styling

```tsx
// CORRECT
<div className="text-2xl font-bold">Title</div>

// WRONG
<h1>Title</h1>
```

### 3. File Naming Convention

- **BẮT BUỘC** sử dụng **kebab-case** cho tất cả tên file
- Component file: `kebab-case.tsx` (ví dụ: `trading-chart.tsx`, `user-profile.tsx`)
- Utility file: `kebab-case.ts` (ví dụ: `format-price.ts`, `api-client.ts`)
- **Exception**: Chỉ sử dụng `PascalCase` cho component export name bên trong file

```tsx
//  CORRECT
// File: trading-chart.tsx
export const TradingChart = () => { ... }

//  WRONG
// File: TradingChart.tsx
export const TradingChart = () => { ... }
```

### 4. Import Paths

- Sử dụng alias `@/*` cho tất cả internal imports
- Prisma client import: `from '@/lib/generated/prisma/client'`

### 5. Type Export Pattern

- **BẮT BUỘC** sử dụng `export type` để re-export tất cả types từ file types
- **KHÔNG** sử dụng `export` cho từng interface/type

```tsx
//  CORRECT - types/api.ts
interface RegisterRequest { ... }
interface LoginRequest { ... }
export type { RegisterRequest, LoginRequest };

//  WRONG - types/api.ts
export interface RegisterRequest { ... }
export interface LoginRequest { ... }
```

- Import chỉ một dòng duy nhất:

```tsx
//  CORRECT
import type { RegisterRequest, LoginRequest } from '@/types/api';

//  WRONG
import { type RegisterRequest } from '@/types/api';
import { type LoginRequest } from '@/types/api';
```

### 6. Component Declaration Pattern

- **BẮT BUỘC** sử dụng pattern sau cho tất cả React components:

```tsx
import type { FC } from 'react';

const ComponentName: FC = () => {
    return <>...</>;
};

export default ComponentName;
```

- **KHÔNG** sử dụng `export const ComponentName = () => {}`
- Component name trong file phải là **PascalCase**
- File name phải là **kebab-case**

```tsx
//  CORRECT
// File: hero-section.tsx
import type { FC } from 'react';

const HeroSection: FC = () => {
    return (
        <>...</>
    );
};

export default HeroSection;

//  WRONG
// File: hero-section.tsx
export const HeroSection = () => { ... }

//  WRONG
// File: HeroSection.tsx
export const HeroSection = () => { ... }
```

## MCP Servers

### Next.js MCP Server

- **BẮT BUỘC**: Gọi `init` tool đầu mỗi Next.js session
- Luôn dùng `nextjs_docs` (Next.js MCP Server) hoặc `mcp__context7__query-docs` với `vercel/next.js` cho Next.js documentation queries
- Dùng `nextjs_index` để discover running dev servers và available tools

### Prisma MCP Server

- Sử dụng Prisma MCP tools cho database operations:
  - `migrate-dev`: Tạo và apply migrations (cần description)
  - `migrate-reset`: Reset database (chỉ dev)
  - `migrate-status`: Kiểm tra migration status
