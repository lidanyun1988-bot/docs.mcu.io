---
sidebar_position: 1
slug: /
title: 首页
---

import Link from '@docusaurus/Link';
import styles from './index.module.css';

:::tip 本页摘要
XX32 MCU Developer Hub 是面向 MCU 独立开发者的技术文档站点，提供完整的芯片选型指南、外设驱动示例、迁移手册和常见问题解答，助力开发者快速上手 XX32 系列 MCU 开发。
:::

# 欢迎使用 XX32 MCU 开发者文档站

XX32 MCU Developer Hub 是专为独立开发者打造的 MCU 技术文档平台。我们提供完整的技术参考、驱动示例和迁移指南，帮助您快速掌握 XX32 系列微控制器的开发。

## 文档导航

<div className={styles.features}>

<div className={styles.featureCard}>

### 🚀 快速入门

从零开始学习 XX32 MCU 开发，包括环境搭建、第一个项目创建和基础外设使用。

<Link to="/docs/getting-started">开始学习 →</Link>

</div>

<div className={styles.featureCard}>

### 🏭 产品系列

详细了解 XX32 全系列 MCU 产品特性，包括 Cortex-M0/M3/M4/M7 各型号的规格对比。

<Link to="/docs/product-series">查看产品 →</Link>

</div>

<div className={styles.featureCard}>

### 💻 外设驱动

完整的外设驱动代码示例，涵盖 GPIO、USART、SPI、I2C、ADC、DMA 等常用外设。

<Link to="/docs/peripheral-drivers">查看驱动 →</Link>

</div>

<div className={styles.featureCard}>

### 📦 迁移指南

从 STM32 迁移到 XX32 的完整指南，包含引脚兼容、寄存器对比和代码差异说明。

<Link to="/docs/migration-guide">查看迁移 →</Link>

</div>

<div className={styles.featureCard}>

### ❓ 常见问题

开发过程中常见的硬件、软件、兼容性和选型问题解答。

<Link to="/docs/faq">查看 FAQ →</Link>

</div>

</div>

## 为什么选择 XX32 MCU

- **高性能**：最高 240MHz 主频，配备 DSP 指令和 FPU
- **低功耗**：多电源域设计，支持多种低功耗模式
- **丰富外设**：集成 USB、CAN、SDIO、以太网等常用接口
- **开源生态**：完整的 HAL/LL 库支持，社区活跃
- **Pin-to-Pin 兼容**：与主流 STM32 型号 Pin-to-Pin 兼容

## 参与贡献

本文档站是开源项目，欢迎社区贡献：

- 在 GitHub 上提交 Issue 报告问题
- 提交 Pull Request 完善文档
- 分享您的使用经验

<Link to="https://github.com/your-org/developer-hub-docs">访问 GitHub →</Link>

---

*最后更新时间：{new Date().toLocaleDateString('zh-CN')}*
