# 英语日记网站实施计划

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 构建一个温馨治愈的英语日记学习网站，支持用户注册登录、日记写作、AI批改、历史记录和统计分析。

**Architecture:** Next.js 14 全栈应用，使用 Supabase 作为数据库和认证服务，OpenAI GPT API 提供智能批改和主题生成，Framer Motion 实现登录动画。

**Tech Stack:** Next.js 14 (App Router), TypeScript, Tailwind CSS, Supabase, OpenAI API, Framer Motion

## Global Constraints

- Node.js >= 18.17.0
- Next.js 14.x
- TypeScript 严格模式
- 使用 App Router（非 Pages Router）
- Supabase PostgreSQL 数据库
- OpenAI API 密钥需要用户自行配置
- 部署到 Vercel

---

## 文件结构

```
/
├── app/
│   ├── (auth)/
│   │   ├── login/
│   │   │   └── page.tsx              # 登录页面（带开锁动画）
│   │   └── register/
│   │       └── page.tsx              # 注册页面
│   ├── (main)/
│   │   ├── page.tsx                  # 主页面（日记写作 + 历史列表）
│   │   └── profile/
│   │       └── page.tsx              # 个人中心页面
│   ├── api/
│   │   ├── auth/
│   │   │   ├── register/route.ts     # 注册 API
│   │   │   ├── login/route.ts        # 登录 API
│   │   │   ├── logout/route.ts       # 退出 API
│   │   │   └── me/route.ts           # 获取当前用户信息
│   │   ├── diary/
│   │   │   ├── today/route.ts        # 获取今日日记
│   │   │   ├── route.ts              # 提交日记
│   │   │   ├── history/route.ts      # 获取历史日记
│   │   │   └── [id]/route.ts         # 获取特定日记
│   │   ├── theme/
│   │   │   ├── today/route.ts        # 获取今日主题
│   │   │   └── regenerate/route.ts   # 重新生成主题
│   │   ├── ai/
│   │   │   ├── correct/route.ts      # 批改日记
│   │   │   └── analyze-mood/route.ts # 分析心情
│   │   └── user/
│   │       ├── stats/route.ts        # 获取统计数据
│   │       └── profile/route.ts      # 更新个人资料
│   ├── layout.tsx                    # 根布局
│   └── globals.css                   # 全局样式
├── components/
│   ├── ui/
│   │   ├── Button.tsx                # 按钮组件
│   │   ├── Input.tsx                 # 输入框组件
│   │   ├── Card.tsx                  # 卡片组件
│   │   └── DiaryPaper.tsx            # 日记纸张组件
│   ├── auth/
│   │   ├── LockAnimation.tsx         # 开锁动画组件
│   │   └── DiaryCover.tsx            # 日记封面组件
│   ├── diary/
│   │   ├── DiaryInput.tsx            # 日记输入组件
│   │   ├── ThemeDisplay.tsx          # 主题显示组件
│   │   ├── CorrectionView.tsx        # 批改展示组件
│   │   └── HistoryList.tsx           # 历史列表组件
│   └── profile/
│       ├── StatsCard.tsx             # 统计卡片
│       ├── MoodAnalysis.tsx          # 心情分析组件
│       └── SettingsForm.tsx          # 设置表单
├── lib/
│   ├── supabase/
│   │   ├── client.ts                 # Supabase 客户端
│   │   ├── server.ts                 # Supabase 服务端
│   │   └── middleware.ts             # 认证中间件
│   ├── openai/
│   │   ├── client.ts                 # OpenAI 客户端
│   │   ├── prompts/
│   │   │   ├── correction.ts         # 批改提示词
│   │   │   ├── theme.ts              # 主题生成提示词
│   │   │   └── mood.ts               # 心情分析提示词
│   │   └── types.ts                  # OpenAI 响应类型
│   └── utils/
│       ├── word-count.ts             # 字数统计工具
│       ├── date-format.ts            # 日期格式化
│       └── validation.ts             # 验证工具
├── hooks/
│   ├── useAuth.ts                    # 认证 hook
│   ├── useDiary.ts                   # 日记 hook
│   └── useStats.ts                   # 统计 hook
├── types/
│   ├── database.ts                   # 数据库类型
│   ├── diary.ts                      # 日记类型
│   └── user.ts                       # 用户类型
├── supabase/
│   └── migrations/
│       └── 001_initial_schema.sql    # 初始数据库迁移
├── public/
│   └── images/
│       ├── stickers/                 # 贴纸图片
│       └── icons/                    # 图标
├── .env.local                        # 环境变量（不提交）
├── .env.example                      # 环境变量示例
├── next.config.js                    # Next.js 配置
├── tailwind.config.ts                # Tailwind 配置
├── tsconfig.json                     # TypeScript 配置
└── package.json                      # 依赖配置
```

---

## Task 1: 项目初始化和基础配置

**Files:**
- Create: `package.json`
- Create: `next.config.js`
- Create: `tsconfig.json`
- Create: `tailwind.config.ts`
- Create: `postcss.config.js`
- Create: `.env.example`
- Create: `.gitignore`

**Interfaces:**
- Produces: Next.js 项目配置，准备好开发环境

- [ ] **Step 1: 初始化 Next.js 项目**

```bash
npx create-next-app@latest english-diary --typescript --tailwind --app --src-dir=false --import-alias="@/*"
cd english-diary
```

- [ ] **Step 2: 安装依赖**

```bash
npm install @supabase/supabase-js @supabase/ssr openai framer-motion
npm install -D @types/node
```

- [ ] **Step 3: 配置 Tailwind CSS**

修改 `tailwind.config.ts`:

```typescript
import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        paper: {
          50: '#F5F1E8',
          100: '#E8DCC8',
        },
        ink: {
          700: '#8B7355',
          800: '#6B5B4F',
          900: '#4A4238',
        },
        accent: {
          green: '#6B8E6B',
          red: '#C94C4C',
        },
      },
      fontFamily: {
        handwriting: ['Caveat', 'Dancing Script', 'Patrick Hand', 'cursive'],
      },
      boxShadow: {
        'paper': '0 2px 8px rgba(74, 66, 56, 0.1)',
        'paper-hover': '0 4px 12px rgba(74, 66, 56, 0.15)',
      },
    },
  },
  plugins: [],
}
export default config
```

- [ ] **Step 4: 配置 TypeScript**

修改 `tsconfig.json`，确保包含：

```json
{
  "compilerOptions": {
    "target": "es5",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [
      {
        "name": "next"
      }
    ],
    "paths": {
      "@/*": ["./*"]
    }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}
```

- [ ] **Step 5: 创建环境变量模板**

创建 `.env.example`:

```bash
# Supabase
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url_here
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key_here
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key_here

# OpenAI
OPENAI_API_KEY=your_openai_api_key_here
```

- [ ] **Step 6: 创建 .gitignore**

确保 `.gitignore` 包含：

```
# dependencies
/node_modules
/.pnp
.pnp.js

# testing
/coverage

# next.js
/.next/
/out/

# production
/build

# misc
.DS_Store
*.pem

# debug
npm-debug.log*
yarn-debug.log*
yarn-error.log*

# local env files
.env*.local

# vercel
.vercel

# typescript
*.tsbuildinfo
next-env.d.ts
```

- [ ] **Step 7: 提交基础配置**

```bash
git add .
git commit -m "chore: initialize Next.js project with Tailwind and TypeScript"
```

---

## Task 2: Supabase 数据库设置

**Files:**
- Create: `supabase/migrations/001_initial_schema.sql`
- Create: `types/database.ts`
- Create: `lib/supabase/client.ts`
- Create: `lib/supabase/server.ts`
- Create: `lib/supabase/middleware.ts`

**Interfaces:**
- Produces: Supabase 客户端和服务端工具，数据库类型定义

- [ ] **Step 1: 创建数据库迁移文件**

创建 `supabase/migrations/001_initial_schema.sql`:

```sql
-- 用户表（扩展 Supabase auth.users）
CREATE TABLE public.users (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  nickname VARCHAR(100),
  avatar_url VARCHAR(500),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- 日记表
CREATE TABLE public.diaries (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES public.users(id) ON DELETE CASCADE NOT NULL,
  content TEXT NOT NULL,
  word_count INTEGER,
  sentence_count INTEGER,
  theme TEXT,
  correction_result JSONB,
  mood VARCHAR(20),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- 索引优化
CREATE INDEX idx_diaries_user_id ON public.diaries(user_id);
CREATE INDEX idx_diaries_created_at ON public.diaries(created_at DESC);

-- Row Level Security (RLS)
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.diaries ENABLE ROW LEVEL SECURITY;

-- 用户表策略：用户只能查看和修改自己的数据
CREATE POLICY "Users can view own profile"
  ON public.users FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Users can update own profile"
  ON public.users FOR UPDATE
  USING (auth.uid() = id);

-- 日记表策略：用户只能访问自己的日记
CREATE POLICY "Users can view own diaries"
  ON public.diaries FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own diaries"
  ON public.diaries FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own diaries"
  ON public.diaries FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own diaries"
  ON public.diaries FOR DELETE
  USING (auth.uid() = user_id);

-- 触发器：自动更新 updated_at
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = TIMEZONE('utc', NOW());
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER set_users_updated_at
  BEFORE UPDATE ON public.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_updated_at();

CREATE TRIGGER set_diaries_updated_at
  BEFORE UPDATE ON public.diaries
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_updated_at();

-- 触发器：创建用户时自动在 public.users 表中插入记录
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.users (id, email, nickname)
  VALUES (NEW.id, NEW.email, COALESCE(NEW.raw_user_meta_data->>'nickname', split_part(NEW.email, '@', 1)));
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_new_user();
```

- [ ] **Step 2: 创建数据库类型定义**

创建 `types/database.ts`:

```typescript
export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          id: string
          email: string
          nickname: string | null
          avatar_url: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          email: string
          nickname?: string | null
          avatar_url?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          email?: string
          nickname?: string | null
          avatar_url?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      diaries: {
        Row: {
          id: string
          user_id: string
          content: string
          word_count: number | null
          sentence_count: number | null
          theme: string | null
          correction_result: Json | null
          mood: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          content: string
          word_count?: number | null
          sentence_count?: number | null
          theme?: string | null
          correction_result?: Json | null
          mood?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          content?: string
          word_count?: number | null
          sentence_count?: number | null
          theme?: string | null
          correction_result?: Json | null
          mood?: string | null
          created_at?: string
          updated_at?: string
        }
      }
    }
  }
}

export type User = Database['public']['Tables']['users']['Row']
export type Diary = Database['public']['Tables']['diaries']['Row']
```

- [ ] **Step 3: 创建 Supabase 客户端（浏览器端）**

创建 `lib/supabase/client.ts`:

```typescript
import { createBrowserClient } from '@supabase/ssr'
import { Database } from '@/types/database'

export function createClient() {
  return createBrowserClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )
}
```

- [ ] **Step 4: 创建 Supabase 客户端（服务端）**

创建 `lib/supabase/server.ts`:

```typescript
import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'
import { Database } from '@/types/database'

export async function createClient() {
  const cookieStore = await cookies()

  return createServerClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll()
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            )
          } catch {
            // The `setAll` method was called from a Server Component.
            // This can be ignored if you have middleware refreshing
            // user sessions.
          }
        },
      },
    }
  )
}
```

- [ ] **Step 5: 创建认证中间件**

创建 `lib/supabase/middleware.ts`:

```typescript
import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({
    request,
  })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value)
          )
          supabaseResponse = NextResponse.next({
            request,
          })
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          )
        },
      },
    }
  )

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (
    !user &&
    !request.nextUrl.pathname.startsWith('/login') &&
    !request.nextUrl.pathname.startsWith('/register') &&
    !request.nextUrl.pathname.startsWith('/auth')
  ) {
    const url = request.nextUrl.clone()
    url.pathname = '/login'
    return NextResponse.redirect(url)
  }

  return supabaseResponse
}
```

创建根目录的 `middleware.ts`:

```typescript
import { updateSession } from '@/lib/supabase/middleware'
import { type NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
  return await updateSession(request)
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}
```

- [ ] **Step 6: 提交 Supabase 配置**

```bash
git add .
git commit -m "feat: add Supabase database schema and client utilities"
```

---

## Task 3: 全局样式和基础 UI 组件

**Files:**
- Create: `app/globals.css`
- Create: `components/ui/Button.tsx`
- Create: `components/ui/Input.tsx`
- Create: `components/ui/Card.tsx`
- Create: `components/ui/DiaryPaper.tsx`

**Interfaces:**
- Produces: 纸质风格基础 UI 组件库

- [ ] **Step 1: 配置全局样式**

修改 `app/globals.css`:

```css
@import url('https://fonts.googleapis.com/css2?family=Caveat:wght@400;500;600;700&family=Dancing+Script:wght@400;500;600;700&family=Patrick+Hand&display=swap');

@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root {
    --paper-50: #F5F1E8;
    --paper-100: #E8DCC8;
    --ink-700: #8B7355;
    --ink-800: #6B5B4F;
    --ink-900: #4A4238;
    --accent-green: #6B8E6B;
    --accent-red: #C94C4C;
  }

  body {
    @apply bg-paper-50 text-ink-900 font-sans;
    background-image: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23d4c4a8' fill-opacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
  }

  h1, h2, h3, h4, h5, h6 {
    @apply font-semibold text-ink-800;
  }
}

@layer components {
  .diary-paper {
    @apply bg-paper-50 rounded-lg shadow-paper;
    background-image: linear-gradient(
      transparent 0px,
      transparent 23px,
      #e0d5c5 23px,
      #e0d5c5 24px,
      transparent 24px
    );
    background-size: 100% 24px;
    background-position: 0 12px;
  }

  .handwriting {
    @apply font-handwriting;
    font-size: 1.1em;
    line-height: 1.8;
  }

  .tape-effect {
    @apply relative;
    &::before {
      content: '';
      @apply absolute -top-3 left-1/2 transform -translate-x-1/2 w-16 h-6 bg-amber-200 opacity-60;
      transform: translateX(-50%) rotate(-2deg);
    }
  }
}

@layer utilities {
  .text-shadow-soft {
    text-shadow: 1px 1px 2px rgba(74, 66, 56, 0.1);
  }
}
```

- [ ] **Step 2: 创建 Button 组件**

创建 `components/ui/Button.tsx`:

```typescript
'use client'

import { ReactNode } from 'react'

interface ButtonProps {
  children: ReactNode
  variant?: 'primary' | 'secondary' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  disabled?: boolean
  loading?: boolean
  onClick?: () => void
  type?: 'button' | 'submit'
  className?: string
}

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  disabled = false,
  loading = false,
  onClick,
  type = 'button',
  className = '',
}: ButtonProps) {
  const baseStyles = 'inline-flex items-center justify-center font-medium rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed'
  
  const variants = {
    primary: 'bg-ink-700 text-white hover:bg-ink-800 shadow-paper hover:shadow-paper-hover',
    secondary: 'bg-paper-100 text-ink-800 hover:bg-paper-50 border border-ink-700',
    ghost: 'text-ink-700 hover:bg-paper-100',
  }
  
  const sizes = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg',
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
    >
      {loading && (
        <svg className="animate-spin -ml-1 mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 2.21.896 4.21 2.346 5.654l1.966-1.966z" />
        </svg>
      )}
      {children}
    </button>
  )
}
```

- [ ] **Step 3: 创建 Input 组件**

创建 `components/ui/Input.tsx`:

```typescript
'use client'

import { forwardRef, InputHTMLAttributes, TextareaHTMLAttributes, ForwardRefRenderFunction } from 'react'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
}

interface TextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string
  error?: string
}

const InputComponent: ForwardRefRenderFunction<HTMLInputElement, InputProps> = (
  { label, error, className = '', ...props },
  ref
) => {
  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-medium text-ink-800 mb-1">
          {label}
        </label>
      )}
      <input
        ref={ref}
        className={`w-full px-4 py-2 bg-paper-50 border border-ink-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent-green transition-shadow ${error ? 'border-accent-red' : ''} ${className}`}
        {...props}
      />
      {error && (
        <p className="mt-1 text-sm text-accent-red">{error}</p>
      )}
    </div>
  )
}

const TextAreaComponent: ForwardRefRenderFunction<HTMLTextAreaElement, TextAreaProps> = (
  { label, error, className = '', ...props },
  ref
) => {
  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-medium text-ink-800 mb-1">
          {label}
        </label>
      )}
      <textarea
        ref={ref}
        className={`w-full px-4 py-3 bg-paper-50 border border-ink-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent-green transition-shadow resize-none ${error ? 'border-accent-red' : ''} ${className}`}
        {...props}
      />
      {error && (
        <p className="mt-1 text-sm text-accent-red">{error}</p>
      )}
    </div>
  )
}

export const Input = forwardRef(InputComponent)
export const TextArea = forwardRef(TextAreaComponent)
```

- [ ] **Step 4: 创建 Card 组件**

创建 `components/ui/Card.tsx`:

```typescript
import { ReactNode } from 'react'

interface CardProps {
  children: ReactNode
  className?: string
  withTape?: boolean
}

export default function Card({ children, className = '', withTape = false }: CardProps) {
  return (
    <div className={`bg-paper-50 rounded-lg shadow-paper p-6 ${withTape ? 'tape-effect' : ''} ${className}`}>
      {children}
    </div>
  )
}
```

- [ ] **Step 5: 创建 DiaryPaper 组件**

创建 `components/ui/DiaryPaper.tsx`:

```typescript
'use client'

import { ReactNode } from 'react'

interface DiaryPaperProps {
  children: ReactNode
  className?: string
  showLines?: boolean
}

export default function DiaryPaper({ children, className = '', showLines = true }: DiaryPaperProps) {
  return (
    <div className={`diary-paper p-6 rounded-lg ${showLines ? '' : 'bg-transparent'} ${className}`}>
      <div className={`${showLines ? 'handwriting' : ''}`}>
        {children}
      </div>
    </div>
  )
}
```

- [ ] **Step 6: 提交基础 UI 组件**

```bash
git add .
git commit -m "feat: add global styles and base UI components with paper texture"
```

---

## Task 4: 用户类型和工具函数

**Files:**
- Create: `types/user.ts`
- Create: `types/diary.ts`
- Create: `lib/utils/word-count.ts`
- Create: `lib/utils/date-format.ts`
- Create: `lib/utils/validation.ts`

**Interfaces:**
- Produces: 用户和日记类型定义，工具函数

- [ ] **Step 1: 创建用户类型**

创建 `types/user.ts`:

```typescript
export interface UserProfile {
  id: string
  email: string
  nickname: string | null
  avatar_url: string | null
  created_at: string
}

export interface UserStats {
  totalDays: number
  totalWords: number
  totalSentences: number
}

export interface MoodAnalysis {
  mood: 'joy' | 'anger' | 'sadness' | 'happiness'
  percentage: number
  healingMessage: string
}

export interface UpdateProfileRequest {
  nickname?: string
  avatar_url?: string
}
```

- [ ] **Step 2: 创建日记类型**

创建 `types/diary.ts`:

```typescript
export interface Correction {
  originalText: string
  correctedText: string
  errorType: 'grammar' | 'vocabulary' | 'style'
  explanation: string
  position: {
    start: number
    end: number
  }
}

export interface CorrectionResult {
  overallComment: string
  corrections: Correction[]
  score: number
}

export interface DiaryEntry {
  id: string
  user_id: string
  content: string
  word_count: number | null
  sentence_count: number | null
  theme: string | null
  correction_result: CorrectionResult | null
  mood: string | null
  created_at: string
}

export interface DiaryFormData {
  content: string
  theme?: string
}
```

- [ ] **Step 3: 创建字数统计工具**

创建 `lib/utils/word-count.ts`:

```typescript
export function countWords(text: string): number {
  const words = text.trim().split(/\s+/).filter(word => word.length > 0)
  return words.length
}

export function countSentences(text: string): number {
  const sentences = text.split(/[.!?]+/).filter(sentence => sentence.trim().length > 0)
  return sentences.length
}

export function validateDiaryLength(text: string): { isValid: boolean; message: string } {
  const wordCount = countWords(text)
  const minWords = 300

  if (wordCount < minWords) {
    return {
      isValid: false,
      message: `建议至少写 ${minWords} 词。当前：${wordCount} 词`,
    }
  }

  return {
    isValid: true,
    message: `已达到 ${wordCount} 词`,
  }
}
```

- [ ] **Step 4: 创建日期格式化工具**

创建 `lib/utils/date-format.ts`:

```typescript
export function formatDate(dateString: string): string {
  const date = new Date(dateString)
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    weekday: 'long',
  }
  return date.toLocaleDateString('zh-CN', options)
}

export function formatDateShort(dateString: string): string {
  const date = new Date(dateString)
  const options: Intl.DateTimeFormatOptions = {
    month: 'short',
    day: 'numeric',
  }
  return date.toLocaleDateString('zh-CN', options)
}

export function isToday(dateString: string): boolean {
  const date = new Date(dateString)
  const today = new Date()
  return date.toDateString() === today.toDateString()
}
```

- [ ] **Step 5: 创建验证工具**

创建 `lib/utils/validation.ts`:

```typescript
export function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

export function validatePassword(password: string): { isValid: boolean; message: string } {
  if (password.length < 8) {
    return {
      isValid: false,
      message: '密码至少需要 8 个字符',
    }
  }

  return {
    isValid: true,
    message: '',
  }
}

export function validateNickname(nickname: string): { isValid: boolean; message: string } {
  if (nickname.length === 0) {
    return {
      isValid: true,
      message: '',
    }
  }

  if (nickname.length > 100) {
    return {
      isValid: false,
      message: '昵称不能超过 100 个字符',
    }
  }

  return {
    isValid: true,
    message: '',
  }
}
```

- [ ] **Step 6: 提交工具函数**

```bash
git add .
git commit -m "feat: add user and diary types with utility functions"
```

---

## Task 5: OpenAI 客户端和提示词

**Files:**
- Create: `lib/openai/client.ts`
- Create: `lib/openai/types.ts`
- Create: `lib/openai/prompts/correction.ts`
- Create: `lib/openai/prompts/theme.ts`
- Create: `lib/openai/prompts/mood.ts`

**Interfaces:**
- Produces: OpenAI 客户端和结构化提示词

- [ ] **Step 1: 创建 OpenAI 客户端**

创建 `lib/openai/client.ts`:

```typescript
import OpenAI from 'openai'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

export default openai

export async function generateCompletion(prompt: string, model: 'gpt-4' | 'gpt-3.5-turbo' = 'gpt-3.5-turbo') {
  const response = await openai.chat.completions.create({
    model,
    messages: [
      {
        role: 'system',
        content: 'You are a helpful English writing teacher.',
      },
      {
        role: 'user',
        content: prompt,
      },
    ],
    temperature: 0.7,
  })

  return response.choices[0].message.content || ''
}
```

- [ ] **Step 2: 创建 OpenAI 响应类型**

创建 `lib/openai/types.ts`:

```typescript
export interface CorrectionResponse {
  overallComment: string
  corrections: Array<{
    originalText: string
    correctedText: string
    errorType: 'grammar' | 'vocabulary' | 'style'
    explanation: string
    position: {
      start: number
      end: number
    }
  }>
  score: number
}

export interface ThemeResponse {
  theme: string
  description: string
}

export interface MoodResponse {
  mood: 'joy' | 'anger' | 'sadness' | 'happiness'
  percentage: number
  healingMessage: string
}
```

- [ ] **Step 3: 创建批改提示词**

创建 `lib/openai/prompts/correction.ts`:

```typescript
import { CorrectionResponse } from '../types'

export function createCorrectionPrompt(diaryContent: string): string {
  return `
As an experienced English teacher, please correct the following English diary entry. Identify grammar errors, vocabulary usage issues, and style improvements.

Return your response in the following JSON format:
{
  "overallComment": "A brief overall comment about the writing",
  "corrections": [
    {
      "originalText": "the original text with error",
      "correctedText": "the corrected version",
      "errorType": "grammar/vocabulary/style",
      "explanation": "explanation of the error and correction",
      "position": {
        "start": 0,
        "end": 10
      }
    }
  ],
  "score": 85
}

Score should be between 0-100.

Diary entry:
"""
${diaryContent}
"""

Please provide helpful and encouraging feedback, focusing on the most important corrections.
`
}

export function parseCorrectionResponse(response: string): CorrectionResponse {
  try {
    const jsonMatch = response.match(/\{[\s\S]*\}/)
    if (jsonMatch) {
      return JSON.parse(jsonMatch[0])
    }
    throw new Error('No valid JSON found in response')
  } catch (error) {
    console.error('Failed to parse correction response:', error)
    return {
      overallComment: 'Unable to process corrections at this time.',
      corrections: [],
      score: 0,
    }
  }
}
```

- [ ] **Step 4: 创建主题生成提示词**

创建 `lib/openai/prompts/theme.ts`:

```typescript
import { ThemeResponse } from '../types'

export function createThemePrompt(date: Date): string {
  const dateInfo = {
    year: date.getFullYear(),
    month: date.getMonth() + 1,
    day: date.getDate(),
    weekday: date.toLocaleDateString('en-US', { weekday: 'long' }),
    season: getSeason(date),
    holidays: getHolidays(date),
  }

  return `
Generate a daily English writing theme for ${dateInfo.weekday}, ${dateInfo.month}/${dateInfo.day}/${dateInfo.year}.
Consider: season (${dateInfo.season}), any relevant holidays or events.

Return your response in the following JSON format:
{
  "theme": "A concise theme title",
  "description": "A brief description or writing prompt (1-2 sentences)"
}

Examples:
- "A Memorable Weekend" - "Describe a recent weekend that stands out in your memory. What made it special?"
- "Gratitude Moment" - "Write about something you're grateful for today. Why does it matter to you?"
- "Future Aspirations" - "Describe a goal you hope to achieve in the next year. What steps will you take?"

Provide an engaging and creative theme suitable for English learners.
`
}

function getSeason(date: Date): string {
  const month = date.getMonth() + 1
  if (month >= 3 && month <= 5) return 'spring'
  if (month >= 6 && month <= 8) return 'summer'
  if (month >= 9 && month <= 11) return 'autumn'
  return 'winter'
}

function getHolidays(date: Date): string {
  const month = date.getMonth() + 1
  const day = date.getDate()
  
  const holidays: Record<string, string> = {
    '1/1': 'New Year',
    '2/14': 'Valentine\'s Day',
    '3/8': 'International Women\'s Day',
    '10/1': 'National Day',
    '12/25': 'Christmas',
  }

  const key = `${month}/${day}`
  return holidays[key] || ''
}

export function parseThemeResponse(response: string): ThemeResponse {
  try {
    const jsonMatch = response.match(/\{[\s\S]*\}/)
    if (jsonMatch) {
      return JSON.parse(jsonMatch[0])
    }
    throw new Error('No valid JSON found in response')
  } catch (error) {
    console.error('Failed to parse theme response:', error)
    return {
      theme: 'Daily Reflection',
      description: 'Write about something interesting from your day.',
    }
  }
}
```

- [ ] **Step 5: 创建心情分析提示词**

创建 `lib/openai/prompts/mood.ts`:

```typescript
import { MoodResponse } from '../types'

export function createMoodAnalysisPrompt(diariesContent: string): string {
  return `
Analyze the emotional tone of the following diary entries and determine the predominant mood.

Return your response in the following JSON format:
{
  "mood": "joy/anger/sadness/happiness",
  "percentage": 75,
  "healingMessage": "A warm, healing message appropriate for the mood (1-2 sentences)"
}

Mood options:
- joy: excited, cheerful, enthusiastic
- anger: frustrated, annoyed, upset
- sadness: melancholy, disappointed, sorrowful
- happiness: content, peaceful, satisfied

Percentage should reflect how strongly this mood appears (0-100).

The healing message should be encouraging and supportive, like a caring friend.

Diary entries:
"""
${diariesContent}
"""
`
}

export function parseMoodResponse(response: string): MoodResponse {
  try {
    const jsonMatch = response.match(/\{[\s\S]*\}/)
    if (jsonMatch) {
      return JSON.parse(jsonMatch[0])
    }
    throw new Error('No valid JSON found in response')
  } catch (error) {
    console.error('Failed to parse mood response:', error)
    return {
      mood: 'happiness',
      percentage: 50,
      healingMessage: 'Keep writing and expressing yourself. Every word is a step forward.',
    }
  }
}
```

- [ ] **Step 6: 提交 OpenAI 配置**

```bash
git add .
git commit -m "feat: add OpenAI client and structured prompts for correction, theme, and mood analysis"
```

---

## 执行说明

由于实施计划包含多个复杂任务，建议采用以下执行策略：

1. **优先执行 Task 1-5**：建立项目基础框架
2. **使用 subagent-driven-development**：每个任务由独立的子代理执行，确保隔离和质量
3. **逐步验证**：每个任务完成后进行验证，确保正确性

剩余的 Task 6-15（API 路由、前端页面、部署等）将在第一阶段任务完成后的实施过程中详细展开。

---

## 实施进度检查点

完成 Task 1-5 后，将具备：
- ✅ 完整的项目配置
- ✅ 数据库和认证系统
- ✅ UI 组件库
- ✅ 工具函数
- ✅ OpenAI 集成

这为后续开发提供了坚实的基础。