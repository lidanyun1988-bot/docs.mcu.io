---
sidebar_position: 2
---

# Cortex-M3 系列

:::tip 本页摘要
XX32F103 Cortex-M3 系列是经典的主流型 MCU，最高 72MHz 主频，64-512KB Flash，丰富的外设资源，广泛应用于工业控制、消费电子等领域，是 STM32F103 的完美替代品。
:::

## 系列概述

XX32F103 系列基于 ARM Cortex-M3 内核，是 XX32 产品线中最经典、应用最广泛的系列。

### 主要特性

- **内核**: ARM Cortex-M3
- **主频**: 最高 72MHz
- **Flash**: 64KB ~ 512KB
- **SRAM**: 20KB ~ 96KB
- **工作电压**: 2.0V ~ 3.6V
- **工作温度**: -40°C ~ +85°C / 105°C

## 型号命名规则

```
XX32 F 103 C 8 T 6
 │   │  │   │ │ │
 │   │  │   │ │ └─ 温度范围：6=-40~+85°C
 │   │  │   │ └─── 封装：T=LQFP
 │   │  │   └───── 容量：8=64KB, B=128KB, C=256KB, E=512KB
 │   │  └───────── 引脚：C=48, R=64, V=100, Z=144
 │   └───────────── 系列：103=主流型
 └───────────────── 品牌：XX32
```

## 产品对比表

| 型号 | Flash | SRAM | GPIO | 封装 | 主要外设 | 典型应用 |
|------|-------|------|------|------|---------|---------|
| **XX32F103C8T6** | 64KB | 20KB | 51 | LQFP64 | USART3, SPI2, I2C2, ADC12, TIM10 | 通用控制 |
| **XX32F103CBT6** | 128KB | 20KB | 51 | LQFP64 | 同上 | 通用控制 |
| **XX32F103RBT6** | 128KB | 20KB | 80 | LQFP64 | USART3, SPI2, I2C2, ADC12, TIM10 | 工业控制 |
| **XX32F103VBT6** | 128KB | 20KB | 112 | LQFP100 | USART5, SPI3, I2C2, ADC3, TIM17 | 复杂系统 |
| **XX32F103ZET6** | 512KB | 96KB | 140 | LQFP144 | 全部外设 | 高端应用 |

## 芯片框图

```
                    ┌─────────────────────────────────┐
                    │      XX32F103 系列框图          │
                    │                                 │
    ┌───────────────┤  ARM Cortex-M3 Core (72MHz)     │
    │               │  ┌─────────────────────────┐   │
    │               │  │ Flash (64KB~512KB)      │   │
    │               │  │ SRAM (20KB~96KB)        │   │
    │               │  └─────────────────────────┘   │
    │               │                                 │
    │               │  ┌─────┐ ┌─────┐ ┌─────┐      │
    ├── GPIOA~G ────┤  │GPIO │ │ RCC │ │ NVIC│      │
    │               │  └─────┘ └─────┘ └─────┘      │
    │               │                                 │
    │               │  ┌─────────────────────────┐   │
    ├── USART1~5 ───┤  │ 通信接口                │   │
    ├── SPI1~3 ─────┤  │ USART/SPI/I2C/CAN/USB  │   │
    ├── I2C1~2 ─────┤  └─────────────────────────┘   │
    ├── CAN/USB ────┤                                 │
    │               │  ┌─────────────────────────┐   │
    ├── ADC1~3 ─────┤  │ 模拟外设                │   │
    ├── DAC ────────┤  │ ADC(12bit)/DAC/TIM     │   │
    ├── TIM1~17 ────┤  └─────────────────────────┘   │
    │               │                                 │
    └───────────────┤  电源：2.0V~3.6V              │
                    └─────────────────────────────────┘
```

## 时钟系统

### 时钟源

- **HSI**: 内部 8MHz RC 振荡器
- **HSE**: 外部 4-16MHz 晶振
- **LSI**: 内部 40kHz 低功耗 RC
- **LSE**: 外部 32.768kHz 晶振（RTC）
- **PLL**: 锁相环，最高 72MHz

### 时钟树配置

```
HSE (8MHz) → PLL (×9) → SYSCLK (72MHz)
                        ├─ AHB (72MHz) → APB2 (72MHz) → TIM1
                        │                          └─ APB1 (36MHz) → TIM2~7
                        └─ ADC (≤14MHz)
```

典型配置代码：
```c
// RCC 配置 - 使用 HSE + PLL 达到 72MHz
RCC_OscInitTypeDef RCC_OscInitStruct = {0};
RCC_ClkInitTypeDef RCC_ClkInitStruct = {0};

RCC_OscInitStruct.OscillatorType = RCC_OSCILLATORTYPE_HSE;
RCC_OscInitStruct.HSEState = RCC_HSE_ON;
RCC_OscInitStruct.HSEPredivValue = RCC_HSE_PREDIV_DIV1;
RCC_OscInitStruct.PLL.PLLState = RCC_PLL_ON;
RCC_OscInitStruct.PLL.PLLSource = RCC_PLLSOURCE_HSE;
RCC_OscInitStruct.PLL.PLLMUL = RCC_PLL_MUL9; // 8MHz × 9 = 72MHz
HAL_RCC_OscConfig(&RCC_OscInitStruct);

RCC_ClkInitStruct.ClockType = RCC_CLOCKTYPE_HCLK | RCC_CLOCKTYPE_SYSCLK
                            | RCC_CLOCKTYPE_PCLK1 | RCC_CLOCKTYPE_PCLK2;
RCC_ClkInitStruct.SYSCLKSource = RCC_SYSCLKSOURCE_PLLCLK;
RCC_ClkInitStruct.AHBCLKDivider = RCC_SYSCLK_DIV1;   // 72MHz
RCC_ClkInitStruct.APB1CLKDivider = RCC_HCLK_DIV2;    // 36MHz
RCC_ClkInitStruct.APB2CLKDivider = RCC_HCLK_DIV1;    // 72MHz
HAL_RCC_ClockConfig(&RCC_ClkInitStruct, FLASH_LATENCY_2);
```

## 引脚定义

### XX32F103C8T6 (LQFP64) 关键引脚

| 引脚号 | 引脚名 | 功能 | 备注 |
|--------|--------|------|------|
| 1 | VBAT | 电池供电 | RTC 备用电源 |
| 2 | PC13 | GPIO/WKUP | 唤醒引脚 |
| 3 | PC14 | GPIO/OSC32_IN | LSE 输入 |
| 4 | PC15 | GPIO/OSC32_OUT | LSE 输出 |
| 5 | PD0 | GPIO/FSMC | |
| 6 | PD1 | GPIO/FSMC | |
| ... | ... | ... | ... |
| 23 | PA0 | GPIO/ADC_IN0 | |
| 24 | PA1 | GPIO/ADC_IN1 | |
| 25 | PA2 | GPIO/ADC_IN2/USART2_TX | |
| 26 | PA3 | GPIO/ADC_IN3/USART2_RX | |
| ... | ... | ... | ... |
| 39 | VDD | 电源正 | 3.3V |
| 40 | VSS | 电源地 | GND |
| ... | ... | ... | ... |
| 55 | PA13 | GPIO/SWDIO | 调试接口 |
| 56 | PA14 | GPIO/SWCLK | 调试接口 |
| 57 | PA15 | GPIO/JTDI | |

完整引脚定义请参考数据手册。

## 典型应用场景

### 1. 工业控制

**需求**:
- 多路 PWM 输出（电机控制）
- 多路 ADC 输入（模拟量采集）
- CAN 通信（工业总线）

**推荐型号**: XX32F103VBT6（LQFP100）

### 2. 智能家居

**需求**:
- USB 接口（与 PC 通信）
- 多路 UART（连接 WiFi/蓝牙模块）
- 低功耗模式

**推荐型号**: XX32F103CBT6（LQFP48）

### 3. 消费电子

**需求**:
- 低成本
- 小封装
- 基本外设

**推荐型号**: XX32F103C8T6（LQFP64）

## 开发建议

### 1. 最小系统电路

必需组件：
- **电源**: 3.3V LDO（如 AMS1117-3.3）
- **晶振**: 8MHz 主晶振 + 32.768kHz RTC 晶振
- **复位**: 10kΩ上拉 + 100nF 电容
- **去耦**: 每个 VDD/VSS 对加 100nF 电容
- **启动**: BOOT0/BOOT1 跳线（选择启动模式）

### 2. 调试接口

推荐使用 SWD 两线调试接口：
- **SWDIO**: PA13
- **SWCLK**: PA14
- **GND**: GND
- **3.3V**: 可选（如需要供电）

### 3. 外设使用注意事项

- **GPIO**: 上电后默认浮空输入，需配置后使用
- **ADC**: 参考电压 Vref+ 需稳定，建议 2.8V~3.6V
- **USART**: 注意 APB1 最高 36MHz，波特率设置需准确
- **I2C**: 需外接上拉电阻（4.7kΩ~10kΩ）

## 与 STM32F103 的差异

| 项目 | STM32F103 | XX32F103 | 说明 |
|------|-----------|----------|------|
| 内核 | Cortex-M3 | Cortex-M3 | ✅ 完全相同 |
| 主频 | 72MHz | 72MHz | ✅ 相同 |
| 引脚 | 兼容 | 兼容 | ✅ Pin-to-Pin |
| 外设 | 相同 | 相同 | ✅ 寄存器级兼容 |
| 代码 | 100% | 100% | ✅ 无需修改 |
| 价格 | 较高 | 较低 | 💰 性价比优势 |

## 常见问题

### Q: XX32F103 可以直接替换 STM32F103 吗？

A: 是的，XX32F103 与 STM32F103 完全兼容：
- 引脚定义 100% 兼容
- 寄存器定义 100% 兼容
- 代码无需修改
- 可直接使用 STM32CubeMX 配置

### Q: 启动时间是多少？

A: XX32F103 从上电复位到执行 main() 函数约 2-3ms，与 STM32F103 基本一致。

### Q: 支持哪些开发工具？

A: 支持所有 STM32 开发工具：
- IDE: Keil MDK, IAR EWARM, STM32CubeIDE
- 调试器: ST-Link, J-Link, DAP-Link
- 配置工具: STM32CubeMX

## 相关文档

- [数据手册](#) - 详细电气参数
- [参考手册](#) - 寄存器定义
- [STM32F103 数据手册](https://www.st.com/resource/en/datasheet/stm32f103c8.pdf) - 参考文档

## 下一步

- 查看 [Cortex-M4 系列](/docs/product-series/cortex-m4)
- 学习 [外设驱动示例](/docs/peripheral-drivers)
- 阅读 [迁移指南](/docs/migration-guide/stm32f103-to-xx32f103)

---

> 📝 [在 GitHub 上编辑此页](https://github.com/your-org/developer-hub-docs/edit/main/docs/product-series/cortex-m3.md)
