# XX32 MCU Developer Hub

[![Deploy to GitHub Pages](https://github.com/your-org/developer-hub-docs/actions/workflows/deploy.yml/badge.svg)](https://github.com/your-org/developer-hub-docs/actions/workflows/deploy.yml)
[![License](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)

XX32 MCU 独立开发者文档站 - 开源、开放、可协作的技术文档平台

## 🌟 项目简介

本项目是基于 Docusaurus v3 构建的 XX32 MCU 技术文档站点，提供：

- ✅ 完整的芯片选型指南
- ✅ 丰富的外设驱动代码示例
- ✅ 详细的迁移手册（STM32 → XX32）
- ✅ 结构化的常见问题解答
- ✅ AI 友好的文档设计（GEO 优化）

**在线文档**: [https://docs.yoursite.com](https://docs.yoursite.com)

## 🚀 快速开始

### 本地开发

```bash
# 克隆项目
git clone https://github.com/your-org/developer-hub-docs.git
cd developer-hub-docs

# 安装依赖
npm install

# 启动开发服务器
npm start
```

访问 http://localhost:3000 查看效果。

### 构建生产版本

```bash
npm run build
npm run serve
```

### 部署

项目配置了 GitHub Actions，推送到 `main` 分支后自动部署到 GitHub Pages。

## 📁 项目结构

```
developer-hub-docs/
├── docs/                          # 文档目录
│   ├── index.md                   # 首页
│   ├── getting-started/           # 快速入门
│   ├── product-series/            # 产品系列
│   ├── peripheral-drivers/        # 外设驱动
│   ├── migration-guide/           # 迁移指南
│   └── faq/                       # 常见问题
├── src/                           # 源代码
│   ├── components/                # React 组件
│   ├── css/                       # 样式文件
│   └── pages/                     # 自定义页面
├── static/                        # 静态资源
│   ├── img/                       # 图片
│   └── robots.txt                 # 爬虫配置
├── .github/workflows/             # GitHub Actions
├── docusaurus.config.ts           # Docusaurus 配置
├── sidebars.ts                    # 侧边栏配置
└── package.json                   # 项目依赖
```

## 📖 文档规范

### 页面模板

每个文档页面必须包含：

```markdown
---
sidebar_position: 1
---

# 页面标题

:::tip 本页摘要
[100 字以内概括本页内容，AI 会优先引用此段]
:::

## 章节 1

内容...

## 章节 2

内容...

---

> 📝 [在 GitHub 上编辑此页](https://github.com/your-org/developer-hub-docs/edit/main/docs/xxx.md)
```

### 代码示例规范

- 使用完整可运行的代码（不是片段）
- 标注语言类型（```c title="main.c"）
- 包含必要的注释
- 提供 HAL 库和 LL 库两种实现

### 问答格式（FAQ）

```markdown
### Q: 问题描述

A: 简短回答 + 详细说明 + 参考链接

---
```

## 🤝 参与贡献

我们欢迎社区贡献！

### 贡献流程

1. Fork 本仓库
2. 基于 `main` 创建 feature 分支：`git checkout -b feature/my-feature`
3. 修改后本地预览：`npm start`
4. 提交变更：`git commit -m 'Add some feature'`
5. 推送到远程：`git push origin feature/my-feature`
6. 提交 Pull Request

### 贡献类型

- 📝 修正文档错误
- 💻 添加新的驱动示例
- 🔧 完善现有文档
- 🎨 改进网站样式
- 🐛 报告问题

### 开发指南

详见 [CONTRIBUTING.md](CONTRIBUTING.md)

## 📄 许可证

本项目采用 [MIT 许可证](LICENSE)

## 📞 联系方式

- 项目地址：https://github.com/your-org/developer-hub-docs
- 问题反馈：https://github.com/your-org/developer-hub-docs/issues
- 讨论区：https://github.com/your-org/developer-hub-docs/discussions

## 🙏 致谢

- [Docusaurus](https://docusaurus.io/) - 文档框架
- [ARM](https://www.arm.com/) - Cortex-M 内核
- [STMicroelectronics](https://www.st.com/) - 参考文档

---

**Happy Coding!** 🚀
