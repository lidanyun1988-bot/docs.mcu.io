---
sidebar_position: 2
---

import Link from '@docusaurus/Link';

# 产品系列总览

:::tip 本页摘要
XX32 MCU 产品系列覆盖从入门级到高性能的全方位应用需求，包括 Cortex-M0、M3、M4、M7 四大内核系列，提供丰富的型号选择和 Pin-to-Pin 兼容设计。
:::

## 产品家族概览

XX32 MCU 基于 ARM Cortex-M 内核，提供完整的产品线：

```
高性能系列
├─ Cortex-M7 系列 (XX32F7xx) - 最高 240MHz，双精度 FPU，Cache
│
高性能系列
├─ Cortex-M4 系列 (XX32F4xx) - 最高 180MHz，单精度 FPU，DSP
│
主流系列
├─ Cortex-M3 系列 (XX32F1xx) - 最高 72MHz，经典通用
│
入门系列
└─ Cortex-M0 系列 (XX32F0xx) - 最高 48MHz，低成本
```

## 系列对比

| 特性 | Cortex-M0 | Cortex-M3 | Cortex-M4 | Cortex-M7 |
|------|-----------|-----------|-----------|-----------|
| **最高频率** | 48MHz | 72MHz | 180MHz | 240MHz |
| **Flash** | 16-64KB | 64-512KB | 128KB-2MB | 512KB-2MB |
| **SRAM** | 4-8KB | 20-96KB | 32-512KB | 64-512KB |
| **FPU** | ❌ | ❌ | ✅ 单精度 | ✅ 双精度 |
| **DSP 指令** | ❌ | ❌ | ✅ | ✅ |
| **Cache** | ❌ | ❌ | ❌ | ✅ I/D-Cache |
| **封装** | LQFP32/48/64 | LQFP48/64/100/144 | LQFP64/100/144/BGA | LQFP100/144/BGA |
| **价格区间** | ¥ | ¥¥ | ¥¥¥ | ¥¥¥¥ |

## 快速选型

### 入门级应用（Cortex-M0）

**适用场景**:
- 简单控制任务
- 成本敏感型产品
- 低功耗应用

**代表型号**:
- XX32F030F4/P6 - 16KB Flash，入门首选
- XX32F031F6/P6 - 32KB Flash，丰富外设

<Link to="/docs/product-series/cortex-m0">查看 M0 系列详情 →</Link>

### 通用型应用（Cortex-M3）

**适用场景**:
- 工业控制
- 消费电子
- 电机控制

**代表型号**:
- XX32F103C8T6 - 64KB Flash，经典"Blue Pill"
- XX32F103ZET6 - 512KB Flash，大容量

<Link to="/docs/product-series/cortex-m3">查看 M3 系列详情 →</Link>

### 高性能应用（Cortex-M4）

**适用场景**:
- 数字信号处理
- 音频处理
- 复杂电机控制

**代表型号**:
- XX32F405RGT6 - 1MB Flash，USB/以太网
- XX32F407VGT6 - 1MB Flash，带以太网 MAC

<Link to="/docs/product-series/cortex-m4">查看 M4 系列详情 →</Link>

### 旗舰级应用（Cortex-M7）

**适用场景**:
- 图形界面
- 高速信号处理
- 实时控制

**代表型号**:
- XX32F745ZGT6 - 1MB Flash，双精度 FPU
- XX32F767ZGT6 - 2MB Flash，最高性能

<Link to="/docs/product-series/cortex-m7">查看 M7 系列详情 →</Link>

## Pin-to-Pin 兼容

XX32 系列提供优秀的兼容性：

### 同系列内兼容
- XX32F103C8T6 ↔ XX32F103CBT6（64KB ↔ 128KB）
- XX32F405RGT6 ↔ XX32F407VGT6（不同封装）

### 跨系列兼容
- XX32F103 ↔ XX32F405（部分型号 LQFP64/100 封装兼容）

详细兼容性请查看 [迁移指南](/docs/migration-guide)。

## 封装类型

| 封装代码 | 封装类型 | 引脚数 | 尺寸 (mm) |
|---------|---------|--------|-----------|
| F4 | LQFP | 48 | 7x7 |
| C8 | LQFP | 64 | 10x10 |
| R8 | LQFP | 64 | 10x10 |
| V8 | LQFP | 100 | 14x14 |
| Z8 | LQFP | 144 | 20x20 |
| I9 | BGA | 144 | 10x10 |

## 开发板推荐

### 入门级
- **XX32F030 最小系统板** - ¥15
- **XX32F103C8T6 核心板** - ¥20

### 进阶级
- **XX32F407 探索板** - ¥80
- **XX32F746 发现板** - ¥150

## 下一步

选择您感兴趣的系列开始了解：

- [Cortex-M0 系列](/docs/product-series/cortex-m0)
- [Cortex-M3 系列](/docs/product-series/cortex-m3)
- [Cortex-M4 系列](/docs/product-series/cortex-m4)
- [Cortex-M7 系列](/docs/product-series/cortex-m7)

---

> 📝 [在 GitHub 上编辑此页](https://github.com/your-org/developer-hub-docs/edit/main/docs/product-series/index.md)
