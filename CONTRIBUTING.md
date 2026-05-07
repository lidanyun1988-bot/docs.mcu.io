# 贡献指南

感谢您对本项目的关注！我们欢迎任何形式的贡献，包括但不限于：

- 修正文档错误
- 添加新的驱动示例
- 完善现有文档
- 改进网站样式
- 报告问题

## 开始之前

在开始贡献之前，请阅读以下指南：

### 行为准则

请尊重他人，保持友好和专业的沟通态度。

### 知识水平要求

- 熟悉 Markdown 语法
- 了解 Docusaurus 基本用法
- 具备 MCU 开发经验（用于编写技术文档）

## 贡献流程

### 1. Fork 项目

点击 GitHub 页面右上角的 "Fork" 按钮。

### 2. 克隆项目

```bash
git clone https://github.com/your-username/developer-hub-docs.git
cd developer-hub-docs
```

### 3. 创建分支

```bash
git checkout -b feature/your-feature-name
# 或
git checkout -b fix/your-fix-name
```

### 4. 安装依赖

```bash
npm install
```

### 5. 本地预览

```bash
npm start
```

访问 http://localhost:3000 预览您的更改。

### 6. 进行修改

根据您的贡献类型进行相应的修改：

#### 文档修改

- 修正错别字或语法错误
- 添加新的技术内容
- 完善现有文档

#### 代码示例

- 确保代码完整可运行
- 添加必要的注释
- 遵循代码风格

### 7. 提交更改

```bash
git add .
git commit -m 'Add: 添加 XXX 驱动示例'
```

提交信息格式：
- `Add:` 新增内容
- `Fix:` 修复问题
- `Update:` 更新内容
- `Remove:` 删除内容

### 8. 推送更改

```bash
git push origin feature/your-feature-name
```

### 9. 创建 Pull Request

1. 访问原仓库
2. 点击 "New Pull Request"
3. 选择您的分支
4. 填写 PR 描述
5. 提交 PR

## PR 审核标准

您的 PR 将从以下方面审核：

### 内容准确性

- 技术细节是否正确
- 代码是否可运行
- 链接是否有效

### 格式规范

- Markdown 格式是否符合规范
- 代码是否有适当的注释
- 文件命名是否规范

### 完整性

- 是否包含必要的描述
- 是否有示例代码
- 是否有截图（如适用）

## 文档规范

### 页面元数据

每个文档页面必须包含：

```markdown
---
sidebar_position: 1
---

# 页面标题

:::tip 本页摘要
[100 字以内概括本页内容]
:::
```

### 代码块

使用带语言标注的代码块：

````markdown
```c title="main.c"
int main(void) {
    return 0;
}
```
````

### 链接

- 内部链接使用相对路径：`[链接文字](/docs/xxx)`
- 外部链接使用完整 URL

### 图片

- 图片放在 `static/img/` 目录
- 使用相对路径引用：`/img/xxx.png`

## 常见问题

### Q: 我可以提交哪些类型的 PR？

A: 任何有助于改善文档的贡献都欢迎！

- 修正错别字
- 完善技术细节
- 添加新的驱动示例
- 改进页面布局
- 报告并修复问题

### Q: 我的 PR 会被拒绝吗？

A: 如果存在以下情况，可能会被要求修改：

- 技术内容不正确
- 格式不符合规范
- 缺少必要的上下文

### Q: 如何报告问题？

A: 请使用 GitHub Issues 报告：

1. 搜索是否已有相同问题
2. 选择合适的 Issue 模板
3. 详细描述问题和复现步骤

## 联系方式

如有疑问，欢迎通过以下方式联系：

- GitHub Issues: 报告问题
- GitHub Discussions: 讨论区
- 邮件: support@example.com

---

感谢您的贡献！🎉
