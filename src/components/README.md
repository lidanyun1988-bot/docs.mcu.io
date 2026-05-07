# Design System Components

设计系统组件库 - 为 Docusaurus 文档站提供美观、一致的 UI 组件

## 📦 已创建组件

### 1. PrincipleGrid - 原则卡片网格
- **用途**：展示设计原则、核心理念
- **特性**：支持 2/3/4 列布局，悬停动画，响应式
- **文件**：`src/components/PrincipleGrid/`

```mdx
<PrincipleGrid 
  cards={[
    { icon: '🎯', title: 'AI 优先', description: '每页都有结构化摘要' },
  ]} 
  columns={2} 
/>
```

### 2. ColorTokenTable - 颜色 Token 表
- **用途**：展示语义化颜色系统
- **特性**：自动适应主题，可选 HEX 值，悬停高亮
- **文件**：`src/components/ColorTokenTable/`

```mdx
<ColorTokenTable 
  tokens={[
    { name: '主文本', description: '正文、标题', cssVar: '--color-text-primary' },
  ]} 
/>
```

### 3. SpacingRuler - 间距刻度可视化
- **用途**：展示基于 4px 基准的间距系统
- **特性**：预设常用值，可自定义，悬停缩放
- **文件**：`src/components/SpacingRuler/`

```mdx
<SpacingRuler 
  values={[
    { px: 8, description: '紧凑间距' },
    { px: 16, description: '标准间距' },
  ]} 
/>
```

### 4. LiveDemo - 交互式演示区
- **用途**：组件预览和交互演示
- **特性**：可自定义标题，支持透明背景，内置按钮和徽章
- **文件**：`src/components/LiveDemo/`

```mdx
<LiveDemo title="按钮演示">
  <div style={{ display: 'flex', gap: '12px' }}>
    <DemoButton variant="primary">主要操作</DemoButton>
    <DemoButton variant="outline">次要操作</DemoButton>
  </div>
</LiveDemo>
```

### 5. TypographyScale - 字体阶梯
- **用途**：展示完整的字阶系统
- **特性**：预设标准字阶，显示规格，可自定义
- **文件**：`src/components/TypographyScale/`

```mdx
<TypographyScale showSpecs={true} />
```

## 🚀 快速开始

### 导入组件

```mdx
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

### 使用组件

在 MDX 文件中直接使用：

```mdx
## 设计原则

<PrincipleGrid cards={[
  { icon: '🎯', title: 'AI 优先', description: '描述内容' },
]} columns={2} />

## 间距系统

<SpacingRuler />
```

## 📁 文件结构

```
src/
├── components/
│   ├── PrincipleGrid/
│   │   ├── index.tsx
│   │   └── styles.module.css
│   ├── ColorTokenTable/
│   │   ├── index.tsx
│   │   └── styles.module.css
│   ├── SpacingRuler/
│   │   ├── index.tsx
│   │   └── styles.module.css
│   ├── LiveDemo/
│   │   ├── index.tsx
│   │   └── styles.module.css
│   ├── TypographyScale/
│   │   ├── index.tsx
│   │   └── styles.module.css
│   └── DesignSystem/
│       └── index.ts
└── css/
    └── design-system.css
```

## 🎨 样式变量

所有组件使用 CSS 变量，自动适应亮色/暗色模式：

### 主要变量
- `--color-text-primary` - 主文本
- `--color-text-secondary` - 次级文本
- `--color-text-tertiary` - 三级文本
- `--color-background-primary` - 主背景
- `--color-background-secondary` - 次级背景
- `--color-border-tertiary` - 边框

## 📖 文档

- [使用指南](./docs/design-system-guide.md) - 详细的使用说明
- [组件展示](./docs/design-system-components.mdx) - 所有组件的在线演示

## ✅ 特性

- ✅ **响应式设计** - 所有组件在移动端和桌面端都有良好表现
- ✅ **暗色模式支持** - 自动适应亮色/暗色主题
- ✅ **可访问性** - 符合 WCAG AA 标准
- ✅ **易于定制** - 基于 CSS Modules，易于扩展
- ✅ **性能优化** - 按需导入，最小化打包体积

## 🔧 配置

已在 `docusaurus.config.ts` 中配置：

```ts
theme: {
  customCss: ['./src/css/custom.css', './src/css/design-system.css'],
},
```

已在 `sidebars.ts` 中添加：

```ts
{
  type: 'category',
  label: '六、设计系统',
  items: [
    'design-system-guide',
    'design-system-components',
  ],
}
```

## 📝 使用示例

完整示例请参考：
- `docs/design-system-components.mdx` - 组件展示页面
- `docs/design-system-guide.md` - 使用指南

## 🎯 最佳实践

1. **只导入需要的组件** - 减少打包体积
2. **使用语义化变体** - 如 danger 用于删除操作
3. **适度使用演示组件** - 避免页面过于花哨
4. **测试响应式效果** - 确保移动端显示正常

## 🤝 贡献

欢迎提交 Issue 和 Pull Request 来改进这些组件！

## 📄 许可证

MIT
