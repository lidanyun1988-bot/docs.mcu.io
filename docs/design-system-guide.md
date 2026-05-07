# 设计系统组件使用指南

## 📦 组件列表

已创建以下 5 个设计系统组件：

### 1. PrincipleGrid - 原则卡片网格
**用途**：展示设计原则、核心理念等

**位置**：`src/components/PrincipleGrid/`

**特性**：
- ✅ 支持 2/3/4 列布局
- ✅ 悬停动画效果
- ✅ 自动适应亮色/暗色模式
- ✅ 响应式设计

**示例**：
```mdx
<PrincipleGrid 
  cards={[
    { icon: '🎯', title: 'AI 优先', description: '描述内容' },
    { icon: '🌗', title: '双主题适配', description: '描述内容' },
  ]} 
  columns={2} 
/>
```

---

### 2. ColorTokenTable - 颜色 Token 表
**用途**：展示语义化颜色系统

**位置**：`src/components/ColorTokenTable/`

**特性**：
- ✅ 语义化颜色 Token
- ✅ 可选显示 HEX 值
- ✅ 悬停高亮效果
- ✅ 移动端响应式布局

**示例**：
```mdx
<ColorTokenTable 
  tokens={[
    { name: '主文本', description: '正文、标题', cssVar: '--color-text-primary' },
    { name: '次级文本', description: '辅助说明', cssVar: '--color-text-secondary' },
  ]} 
  showHex={false}
/>
```

---

### 3. SpacingRuler - 间距刻度可视化
**用途**：展示基于 4px 基准的间距系统

**位置**：`src/components/SpacingRuler/`

**特性**：
- ✅ 预设常用间距值（4px - 48px）
- ✅ 支持自定义间距值
- ✅ 可自定义颜色
- ✅ 悬停缩放动画

**示例**：
```mdx
{/* 使用默认值 */}
<SpacingRuler />

{/* 自定义间距值 */}
<SpacingRuler 
  values={[
    { px: 4, description: '最小间距' },
    { px: 8, description: '紧凑间距' },
    { px: 16, description: '标准间距' },
  ]} 
/>
```

---

### 4. LiveDemo - 交互式演示区
**用途**：组件预览和交互演示

**位置**：`src/components/LiveDemo/`

**特性**：
- ✅ 可自定义标题和描述
- ✅ 支持透明背景模式
- ✅ 内置 DemoButton 和 DemoBadge 组件
- ✅ 按钮支持多种变体、尺寸和状态

**示例**：
```mdx
<LiveDemo title="按钮演示" description="四种语义变体">
  <div style={{ display: 'flex', gap: '12px' }}>
    <DemoButton variant="primary">主要操作</DemoButton>
    <DemoButton variant="outline">次要操作</DemoButton>
    <DemoButton variant="ghost">幽灵按钮</DemoButton>
    <DemoButton variant="danger">危险操作</DemoButton>
  </div>
</LiveDemo>
```

**支持的按钮变体**：
- `primary` - 主要操作
- `outline` - 次要操作
- `ghost` - 幽灵按钮
- `danger` - 危险操作

**支持的按钮尺寸**：
- `sm` - 小号
- `md` - 默认（中号）
- `lg` - 大号

**支持的徽章变体**：
- `default` - 默认
- `info` - 信息
- `success` - 成功
- `warning` - 警告
- `danger` - 危险

---

### 5. TypographyScale - 字体阶梯
**用途**：展示完整的字阶系统

**位置**：`src/components/TypographyScale/`

**特性**：
- ✅ 预设标准字阶（11px - 22px）
- ✅ 支持自定义字阶
- ✅ 显示字体规格（大小/字重/行高）
- ✅ 悬停高亮效果

**示例**：
```mdx
{/* 使用默认字阶 */}
<TypographyScale showSpecs={true} />

{/* 自定义字阶 */}
<TypographyScale 
  levels={[
    { size: '32px', weight: 700, lineHeight: 1.3, label: '超大标题' },
    { size: '24px', weight: 600, lineHeight: 1.4, label: '大标题' },
    { size: '16px', weight: 400, lineHeight: 1.7, label: '正文' },
  ]} 
  showSpecs={true}
/>
```

---

## 🚀 快速开始

### 步骤 1：导入组件

在 MDX 文件顶部导入所需组件：

```mdx
---
id: my-page
title: 我的页面
---

import { 
  PrincipleGrid, 
  ColorTokenTable, 
  SpacingRuler, 
  LiveDemo, 
  DemoButton, 
  DemoBadge,
  TypographyScale 
} from '@site/src/components/DesignSystem';
```

### 步骤 2：使用组件

在 Markdown 内容中直接使用：

```mdx
## 设计原则

<PrincipleGrid cards={[
  { icon: '🎯', title: 'AI 优先', description: '每页都有结构化摘要' },
  { icon: '🌗', title: '双主题适配', description: '亮色/暗色模式自动切换' },
]} columns={2} />

## 间距系统

<SpacingRuler />
```

---

## 📁 文件结构

```
developer-hub-docs/
├── src/
│   ├── components/
│   │   ├── PrincipleGrid/
│   │   │   ├── index.tsx          # 组件实现
│   │   │   └── styles.module.css  # 组件样式
│   │   ├── ColorTokenTable/
│   │   │   ├── index.tsx
│   │   │   └── styles.module.css
│   │   ├── SpacingRuler/
│   │   │   ├── index.tsx
│   │   │   └── styles.module.css
│   │   ├── LiveDemo/
│   │   │   ├── index.tsx
│   │   │   └── styles.module.css
│   │   ├── TypographyScale/
│   │   │   ├── index.tsx
│   │   │   └── styles.module.css
│   │   └── DesignSystem/
│   │       └── index.ts           # 统一导出
│   └── css/
│       └── design-system.css      # 全局样式变量
├── docs/
│   └── design-system-components.mdx  # 示例文档
├── docusaurus.config.ts           # 已更新配置
└── sidebars.ts                    # 已更新侧边栏
```

---

## 🎨 样式变量

所有组件使用 CSS 变量，自动适应亮色/暗色模式：

### 文本颜色
- `--color-text-primary` - 主文本
- `--color-text-secondary` - 次级文本
- `--color-text-tertiary` - 三级文本
- `--color-text-info` - 信息文本
- `--color-text-success` - 成功文本
- `--color-text-warning` - 警告文本
- `--color-text-danger` - 危险文本

### 背景颜色
- `--color-background-primary` - 主背景
- `--color-background-secondary` - 次级背景
- `--color-background-tertiary` - 三级背景
- `--color-background-info` - 信息背景
- `--color-background-success` - 成功背景
- `--color-background-warning` - 警告背景
- `--color-background-danger` - 危险背景

### 边框颜色
- `--color-border-primary` - 主边框
- `--color-border-secondary` - 次级边框
- `--color-border-tertiary` - 三级边框

---

## ✅ 最佳实践

### 1. 组件选择

| 场景 | 推荐组件 |
|------|---------|
| 展示设计理念 | PrincipleGrid |
| 说明颜色系统 | ColorTokenTable |
| 解释间距规范 | SpacingRuler |
| 演示组件效果 | LiveDemo |
| 展示字体系统 | TypographyScale |

### 2. 性能优化

- ✅ 只导入需要的组件
- ✅ 避免在同一页面使用过多演示组件
- ✅ 使用透明背景模式减少视觉干扰

### 3. 可访问性

- ✅ 确保颜色对比度符合 WCAG AA 标准
- ✅ 为图标添加 `aria-hidden="true"` 属性
- ✅ 使用语义化的 HTML 结构

### 4. 响应式设计

- ✅ 在移动端测试所有组件
- ✅ 使用 `flexWrap: 'wrap'` 处理按钮组
- ✅ 避免过宽的表格和演示区

---

## 🔧 自定义扩展

### 添加新的组件变体

以按钮为例，添加新的变体：

```css
/* src/components/LiveDemo/styles.module.css */
.btnCustom {
  background: linear-gradient(45deg, #ff6b6b, #feca57);
  color: white;
  border: none;
}

.btnCustom:hover {
  opacity: 0.9;
  transform: translateY(-1px);
}
```

```tsx
// src/components/LiveDemo/index.tsx
export function DemoButton({ variant = 'primary', ... }) {
  const btnClass = [
    styles.btn,
    styles[`btn${variant.charAt(0).toUpperCase() + variant.slice(1)}`],
    // ... 其他逻辑
  ].join(' ');
  
  return <button className={btnClass}>{children}</button>;
}
```

### 添加新的间距值

```tsx
<SpacingRuler 
  values={[
    { px: 64, description: '超大间距，用于页面分隔' },
    { px: 96, description: '极大间距，用于特殊布局' },
  ]} 
/>
```

---

## 📚 示例代码

### 完整的 MDX 页面示例

```mdx
---
id: getting-started
title: 快速入门
sidebar_label: 快速入门
---

import { PrincipleGrid, SpacingRuler, LiveDemo, DemoButton } from '@site/src/components/DesignSystem';

# 快速入门

欢迎使用 XX32 MCU 开发！

## 核心原则

<PrincipleGrid cards={[
  { icon: '⚡', title: '快速上手', description: '5 分钟完成第一个 LED 闪烁项目' },
  { icon: '📚', title: '完整文档', description: '覆盖所有外设的详细使用指南' },
  { icon: '🔧', title: '易于调试', description: '提供丰富的调试工具和技巧' },
]} columns={3} />

## 开发环境要求

<SpacingRuler 
  values={[
    { px: 8, description: '代码块内边距' },
    { px: 16, description: '段落间距' },
    { px: 24, description: '章节间距' },
  ]} 
/>

## 开始你的第一个项目

<LiveDemo title="操作按钮" description="选择你的操作">
  <div style={{ display: 'flex', gap: '12px' }}>
    <DemoButton variant="primary">创建项目</DemoButton>
    <DemoButton variant="outline">查看示例</DemoButton>
    <DemoButton variant="ghost">了解更多</DemoButton>
  </div>
</LiveDemo>
```

---

## 🐛 常见问题

### Q: 组件样式不生效怎么办？

A: 确保已在 `docusaurus.config.ts` 中引入了 `design-system.css`：

```ts
theme: {
  customCss: ['./src/css/custom.css', './src/css/design-system.css'],
},
```

### Q: 如何在暗色模式下优化显示效果？

A: 所有组件已自动支持暗色模式，使用 CSS 变量即可：

```css
.principleCard {
  background: var(--color-background-primary);
  color: var(--color-text-primary);
}
```

### Q: 可以组合使用多个组件吗？

A: 当然可以！组合使用能创建更丰富的页面效果：

```mdx
<PrincipleGrid cards={[...]} />
<SpacingRuler values={[...]} />
<LiveDemo title="演示">...</LiveDemo>
```

---

## 📖 相关资源

- [设计系统组件展示](./design-system-components) - 所有组件的完整演示
- [Docusaurus MDX 文档](https://docusaurus.io/docs/markdown-features/react) - 如何在 MDX 中使用 React 组件
- [CSS Modules](https://github.com/css-modules/css-modules) - CSS Modules 使用指南
