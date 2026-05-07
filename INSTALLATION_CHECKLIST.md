# 设计系统组件安装清单

## ✅ 已完成的任务

### 1. 组件创建
- [x] **PrincipleGrid** - 原则卡片网格组件
  - [x] `src/components/PrincipleGrid/index.tsx`
  - [x] `src/components/PrincipleGrid/styles.module.css`

- [x] **ColorTokenTable** - 颜色 Token 表组件
  - [x] `src/components/ColorTokenTable/index.tsx`
  - [x] `src/components/ColorTokenTable/styles.module.css`

- [x] **SpacingRuler** - 间距刻度可视化组件
  - [x] `src/components/SpacingRuler/index.tsx`
  - [x] `src/components/SpacingRuler/styles.module.css`

- [x] **LiveDemo** - 交互式演示区组件
  - [x] `src/components/LiveDemo/index.tsx`
  - [x] `src/components/LiveDemo/styles.module.css`
  - [x] 包含 DemoButton 和 DemoBadge 子组件

- [x] **TypographyScale** - 字体阶梯组件
  - [x] `src/components/TypographyScale/index.tsx`
  - [x] `src/components/TypographyScale/styles.module.css`

### 2. 统一配置
- [x] **统一导出文件** - `src/components/DesignSystem/index.ts`
- [x] **全局样式文件** - `src/css/design-system.css`
- [x] **Docusaurus 配置** - 已更新 `docusaurus.config.ts`
- [x] **侧边栏配置** - 已更新 `sidebars.ts`

### 3. 文档
- [x] **组件展示页面** - `docs/design-system-components.mdx`
- [x] **使用指南文档** - `docs/design-system-guide.md`
- [x] **组件 README** - `src/components/README.md`

---

## 🧪 测试步骤

### 步骤 1：安装依赖（如果需要）

```bash
cd developer-hub-docs
npm install
```

### 步骤 2：启动开发服务器

```bash
npm run start
```

### 步骤 3：访问文档

打开浏览器访问：`http://localhost:3000/docs/design-system-components`

### 步骤 4：验证组件

检查以下功能：
- [ ] 原则卡片网格显示正常
- [ ] 颜色 Token 表颜色正确
- [ ] 间距刻度可视化效果良好
- [ ] 交互式演示区按钮可点击
- [ ] 字体阶梯显示正确
- [ ] 暗色模式切换正常
- [ ] 响应式布局在移动端正常

---

## 📋 组件使用快速参考

### 导入语法

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

### 使用示例

#### 1. 原则卡片网格
```mdx
<PrincipleGrid 
  cards={[
    { icon: '🎯', title: '标题', description: '描述' },
  ]} 
  columns={2} 
/>
```

#### 2. 颜色 Token 表
```mdx
<ColorTokenTable 
  tokens={[
    { name: '主文本', description: '正文', cssVar: '--color-text-primary' },
  ]} 
/>
```

#### 3. 间距刻度
```mdx
<SpacingRuler 
  values={[
    { px: 8, description: '紧凑间距' },
  ]} 
/>
```

#### 4. 交互式演示
```mdx
<LiveDemo title="演示标题">
  <DemoButton variant="primary">按钮</DemoButton>
</LiveDemo>
```

#### 5. 字体阶梯
```mdx
<TypographyScale showSpecs={true} />
```

---

## 🎨 自定义指南

### 修改组件样式

每个组件使用 CSS Modules，修改对应的 `.module.css` 文件即可：

```css
/* src/components/PrincipleGrid/styles.module.css */
.principleCard {
  /* 自定义样式 */
  border-radius: 16px; /* 更大的圆角 */
}
```

### 添加新的颜色 Token

在 `src/css/design-system.css` 中添加：

```css
:root {
  --color-custom: #your-color;
}
```

### 扩展组件功能

修改对应的 `index.tsx` 文件，添加新的 props 或变体。

---

## 🐛 故障排查

### 问题：组件样式不生效

**解决方案**：
1. 检查 `docusaurus.config.ts` 是否已添加 `design-system.css`
2. 重启开发服务器
3. 清除浏览器缓存

### 问题：导入路径错误

**解决方案**：
确保使用正确的导入路径：
```mdx
import { PrincipleGrid } from '@site/src/components/DesignSystem';
```

### 问题：暗色模式不正常

**解决方案**：
1. 确保使用 CSS 变量而非硬编码颜色
2. 检查 `design-system.css` 中的暗色模式定义
3. 在 Docusaurus 配置中启用暗色模式

---

## 📊 文件清单

### 组件文件（10 个）
- [x] `src/components/PrincipleGrid/index.tsx`
- [x] `src/components/PrincipleGrid/styles.module.css`
- [x] `src/components/ColorTokenTable/index.tsx`
- [x] `src/components/ColorTokenTable/styles.module.css`
- [x] `src/components/SpacingRuler/index.tsx`
- [x] `src/components/SpacingRuler/styles.module.css`
- [x] `src/components/LiveDemo/index.tsx`
- [x] `src/components/LiveDemo/styles.module.css`
- [x] `src/components/TypographyScale/index.tsx`
- [x] `src/components/TypographyScale/styles.module.css`

### 配置文件（3 个）
- [x] `src/components/DesignSystem/index.ts`
- [x] `src/css/design-system.css`
- [x] `docusaurus.config.ts` (已更新)

### 文档文件（3 个）
- [x] `docs/design-system-components.mdx`
- [x] `docs/design-system-guide.md`
- [x] `src/components/README.md`

### 配置文件（1 个）
- [x] `sidebars.ts` (已更新)

**总计：17 个文件**

---

## 🎯 下一步建议

### 立即可做
1. 启动开发服务器查看效果
2. 在现有文档中尝试使用新组件
3. 根据实际需求调整组件样式

### 短期优化
1. 为组件添加 TypeScript 类型定义
2. 添加单元测试
3. 创建更多使用示例

### 长期规划
1. 添加更多组件（如表格、列表等）
2. 创建组件 Storybook
3. 编写组件开发规范

---

## 📞 支持

如有问题，请查看：
- [使用指南](./docs/design-system-guide.md) - 详细使用说明
- [组件展示](./docs/design-system-components.mdx) - 在线演示

---

**创建日期**: 2026-05-06  
**版本**: v1.0.0  
**状态**: ✅ 已完成
