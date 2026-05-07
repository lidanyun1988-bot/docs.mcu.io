---
sidebar_position: 4
---

# 迁移指南概览

:::tip 本页摘要
迁移指南提供从 STM32Fxxx 迁移到 XX32Fxxx 的完整对照，包括引脚兼容、寄存器对比、代码差异和注意事项，帮助开发者快速完成迁移。
:::

## 迁移概述

XX32 MCU 与 STM32 完全兼容，迁移过程非常简单。

## 兼容性说明

### 100% 兼容

- ✅ 引脚定义（Pin-to-Pin）
- ✅ 寄存器地址和定义
- ✅ 外设功能
- ✅ 时钟系统
- ✅ 中断系统

### 可能需要注意

- ⚠️ Flash 容量可能不同
- ⚠️ 工作温度范围可能不同
- ⚠️ 封装选项可能略有差异

## 迁移步骤

### 1. 硬件迁移

直接替换芯片，无需修改 PCB：
1. 确认封装兼容
2. 确认引脚定义一致
3. 焊接替换

### 2. 软件迁移

代码无需修改：
1. 使用原工程模板
2. 直接编译下载
3. 验证功能

### 3. 验证测试

建议进行完整测试：
1. 基本功能测试
2. 外设功能测试
3. 高低温测试
4. 长期稳定性测试

## 迁移文档

- [STM32F103 → XX32F103](/docs/migration-guide/stm32f103-to-xx32f103)
- [STM32F407 → XX32F407](/docs/migration-guide/stm32f407-to-xx32f407)
- [外设对照表](/docs/migration-guide/peripheral-comparison)

---

> 📝 [在 GitHub 上编辑此页](https://github.com/your-org/developer-hub-docs/edit/main/docs/migration-guide/index.md)
