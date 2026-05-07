---
sidebar_position: 1
---

# 外设驱动概览

:::tip 本页摘要
外设驱动模块提供 XX32 MCU 所有常用外设的完整驱动代码示例，包括 GPIO、USART、SPI、I2C、ADC、DMA 等，每个示例都包含 HAL 库和 LL 库两种实现方式，可直接用于项目开发。
:::

## 模块说明

本模块提供完整可运行的外设驱动代码，涵盖 XX32 MCU 的所有常用外设。

## 驱动列表

### 基础外设

| 外设 | 说明 | HAL 库示例 | LL 库示例 |
|------|------|-----------|----------|
| [GPIO](/docs/peripheral-drivers/gpio) | 通用输入输出 | ✅ | ✅ |
| [RCC](#) | 时钟配置 | ✅ | ✅ |
| [NVIC](#) | 中断控制器 | ✅ | ✅ |

### 通信接口

| 外设 | 说明 | HAL 库示例 | LL 库示例 |
|------|------|-----------|----------|
| [USART](/docs/peripheral-drivers/usart) | 串口通信 | ✅ | ✅ |
| [SPI](/docs/peripheral-drivers/spi) | SPI 总线 | ✅ | ✅ |
| [I2C](/docs/peripheral-drivers/i2c) | I2C 总线 | ✅ | ✅ |
| [CAN](/docs/peripheral-drivers/can) | CAN 总线 | ✅ | ✅ |
| [USB](/docs/peripheral-drivers/usb) | USB 设备 | ✅ | ❌ |

### 模拟外设

| 外设 | 说明 | HAL 库示例 | LL 库示例 |
|------|------|-----------|----------|
| [ADC](/docs/peripheral-drivers/adc) | 模数转换器 | ✅ | ✅ |
| [DAC](/docs/peripheral-drivers/dac) | 数模转换器 | ✅ | ✅ |

### 定时器

| 外设 | 说明 | HAL 库示例 | LL 库示例 |
|------|------|-----------|----------|
| [TIM](/docs/peripheral-drivers/tim) | 通用定时器 | ✅ | ✅ |
| [PWM](/docs/peripheral-drivers/pwm) | PWM 输出 | ✅ | ✅ |
| [RTC](/docs/peripheral-drivers/rtc) | 实时时钟 | ✅ | ✅ |
| [WDG](/docs/peripheral-drivers/wdg) | 看门狗 | ✅ | ✅ |

### 高级功能

| 外设 | 说明 | HAL 库示例 | LL 库示例 |
|------|------|-----------|----------|
| [DMA](/docs/peripheral-drivers/dma) | DMA 控制器 | ✅ | ✅ |
| [SDIO](/docs/peripheral-drivers/sdio) | SD 卡接口 | ✅ | ❌ |

## 代码结构说明

每个外设示例都包含：

### 1. 完整工程结构

```
Project/
├── Core/
│   ├── Inc/
│   │   ├── main.h
│   │   └── xxx.h        # 外设配置头文件
│   └── Src/
│       ├── main.c       # 主程序
│       └── xxx.c        # 外设驱动代码
├── Drivers/
│   ├── HAL/            # HAL 库
│   └── CMSIS/          # CMSIS 标准
└── Makefile / .ioc     # 项目配置
```

### 2. 代码流程

```
初始化流程:
1. 系统时钟配置 (SystemClock_Config)
2. 外设时钟使能 (__HAL_RCC_XXX_CLK_ENABLE)
3. GPIO 配置 (MX_XXX_Init)
4. 外设参数配置 (HAL_XXX_Init)
5. 使能外设 (__HAL_XXX_ENABLE)
6. 开始使用 (HAL_XXX_Start / HAL_XXX_Transmit)
```

### 3. HAL 库 vs LL 库

**HAL 库特点**:
- ✅ 高级 API，易于使用
- ✅ 跨平台兼容性好
- ✅ 支持中断和 DMA
- ❌ 代码量较大，速度略慢

**LL 库特点**:
- ✅ 直接操作寄存器，速度快
- ✅ 代码量小，效率高
- ❌ 需要熟悉寄存器
- ❌ 不同系列需修改代码

**推荐**:
- 快速开发、原型验证 → 使用 HAL 库
- 性能关键、资源受限 → 使用 LL 库

## 使用建议

### 1. 代码复用

所有示例代码都可直接复制到项目中使用：
1. 复制 `xxx.c` 和 `xxx.h` 到项目
2. 根据实际引脚修改 GPIO 配置
3. 调用初始化函数和驱动函数

### 2. 调试技巧

- 使用串口打印调试信息
- 使用逻辑分析仪抓取波形
- 使用 IDE 的调试功能单步执行
- 查看寄存器值确认配置

### 3. 性能优化

- 关闭未使用的外设时钟
- 使用 DMA 代替 CPU 搬运数据
- 关键代码使用 LL 库
- 合理配置中断优先级

## 常见问题

### Q: 代码无法运行？

A: 检查：
1. 时钟配置是否正确
2. 外设时钟是否已使能
3. GPIO 配置是否与代码一致
4. 中断是否已启用

### Q: 通信速率不达标？

A: 检查：
1. 系统时钟频率
2. 外设时钟分频系数
3. 波特率/频率配置
4. 总线负载情况

### Q: 功耗过高？

A: 优化：
1. 关闭未使用的外设时钟
2. 使用低功耗模式
3. 降低系统时钟频率
4. 使用中断代替轮询

## 下一步

选择您需要的驱动开始学习：

- [GPIO 驱动](/docs/peripheral-drivers/gpio) - 基础外设
- [USART 驱动](/docs/peripheral-drivers/usart) - 串口通信
- [SPI 驱动](/docs/peripheral-drivers/spi) - SPI 总线
- [I2C 驱动](/docs/peripheral-drivers/i2c) - I2C 总线

---

> 📝 [在 GitHub 上编辑此页](https://github.com/your-org/developer-hub-docs/edit/main/docs/peripheral-drivers/index.md)
