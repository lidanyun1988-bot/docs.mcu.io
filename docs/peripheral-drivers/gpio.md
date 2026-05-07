---
sidebar_position: 2
---

# GPIO 驱动示例

:::tip 本页摘要
本文提供 GPIO 外设的完整驱动代码，涵盖输入、输出、中断三种模式，包含 HAL 库和 LL 库两种实现方式，代码可直接用于项目，约 150 行。
:::

## 外设概述

GPIO（General Purpose Input/Output）是 MCU 最基本的数字 I/O 外设，用于：
- 控制 LED、继电器等输出设备
- 读取按键、开关等输入信号
- 模拟通信协议（软件 I2C、SPI）

XX32F103 GPIO 特性：
- 8 个端口（GPIOA~GPIOG）
- 每端口 16 引脚（PIN0~15）
- 8 种工作模式
- 支持外部中断

## 硬件连接

### 输出模式（LED）

```
MCU 引脚 (PA5) → 限流电阻 (220Ω) → LED → GND
```

### 输入模式（按键）

```
MCU 引脚 (PA0) → 按键 → GND
（启用内部上拉电阻）
```

## HAL 库示例

### 完整代码

```c title="main.c"
/* 包含头文件 */
#include "main.h"

/* 定义引脚 */
#define LED_PIN           GPIO_PIN_5
#define LED_PORT          GPIOA
#define KEY_PIN           GPIO_PIN_0
#define KEY_PORT          GPIOA

/* 全局变量 */
volatile uint8_t g_key_flag = 0;

/* 函数声明 */
void SystemClock_Config(void);
static void MX_GPIO_Init(void);
void KEY_Scan(void);

/* 主函数 */
int main(void)
{
  /* MCU 初始化 */
  HAL_Init();
  SystemClock_Config();
  MX_GPIO_Init();

  /* 主循环 */
  while (1)
  {
    /* 扫描按键 */
    KEY_Scan();
    
    /* 如果按键按下，切换 LED */
    if (g_key_flag)
    {
      g_key_flag = 0;
      HAL_GPIO_TogglePin(LED_PORT, LED_PIN);
      
      /* 等待按键释放 */
      while (HAL_GPIO_ReadPin(KEY_PORT, KEY_PIN) == GPIO_PIN_RESET);
      HAL_Delay(20);
    }
    
    HAL_Delay(10);
  }
}

/**
  * @brief GPIO 初始化函数
  */
static void MX_GPIO_Init(void)
{
  GPIO_InitTypeDef GPIO_InitStruct = {0};

  /* 使能 GPIO 时钟 */
  __HAL_RCC_GPIOA_CLK_ENABLE();

  /* 配置 LED 引脚（推挽输出） */
  HAL_GPIO_WritePin(LED_PORT, LED_PIN, GPIO_PIN_RESET);
  GPIO_InitStruct.Pin = LED_PIN;
  GPIO_InitStruct.Mode = GPIO_MODE_OUTPUT_PP;
  GPIO_InitStruct.Pull = GPIO_NOPULL;
  GPIO_InitStruct.Speed = GPIO_SPEED_FREQ_LOW;
  HAL_GPIO_Init(LED_PORT, &GPIO_InitStruct);

  /* 配置按键引脚（上拉输入） */
  GPIO_InitStruct.Pin = KEY_PIN;
  GPIO_InitStruct.Mode = GPIO_MODE_INPUT;
  GPIO_InitStruct.Pull = GPIO_PULLUP;
  HAL_GPIO_Init(KEY_PORT, &GPIO_InitStruct);
}

/**
  * @brief 按键扫描函数（消抖）
  */
void KEY_Scan(void)
{
  static uint16_t s_key_timer = 0;
  
  if (HAL_GPIO_ReadPin(KEY_PORT, KEY_PIN) == GPIO_PIN_RESET)
  {
    s_key_timer++;
    if (s_key_timer >= 20)  /* 约 20ms 消抖 */
    {
      g_key_flag = 1;
      s_key_timer = 20;
    }
  }
  else
  {
    s_key_timer = 0;
  }
}

/* 系统时钟配置（略） */
void SystemClock_Config(void)
{
  /* 参考 hello-world 示例 */
}

/* 中断处理回调 */
void HAL_GPIO_EXTI_Callback(uint16_t GPIO_Pin)
{
  if (GPIO_Pin == KEY_PIN)
  {
    HAL_Delay(20);  /* 消抖 */
    if (HAL_GPIO_ReadPin(KEY_PORT, KEY_PIN) == GPIO_PIN_RESET)
    {
      g_key_flag = 1;
    }
  }
}
```

### 关键 API 说明

```c
/* GPIO 初始化 */
HAL_StatusTypeDef HAL_GPIO_Init(GPIO_TypeDef* GPIOx, GPIO_InitTypeDef* GPIO_Init);

/* 读取引脚 */
GPIO_PinState HAL_GPIO_ReadPin(GPIO_TypeDef* GPIOx, uint16_t GPIO_Pin);

/* 写入引脚 */
void HAL_GPIO_WritePin(GPIO_TypeDef* GPIOx, uint16_t GPIO_Pin, GPIO_PinState PinState);

/* 翻转引脚 */
void HAL_GPIO_TogglePin(GPIO_TypeDef* GPIOx, uint16_t GPIO_Pin);

/* 中断回调 */
void HAL_GPIO_EXTI_Callback(uint16_t GPIO_Pin);
```

## LL 库示例

### 完整代码

```c title="main.c - LL 库版本"
/* 包含头文件 */
#include "main.h"

/* 定义引脚 */
#define LED_PIN           LL_GPIO_PIN_5
#define LED_PORT          GPIOA
#define KEY_PIN           LL_GPIO_PIN_0
#define KEY_PORT          GPIOA

/* 全局变量 */
volatile uint8_t g_key_flag = 0;

/* 函数声明 */
void SystemClock_Config(void);
static void MX_GPIO_Init(void);
void KEY_Scan(void);

/* 主函数 */
int main(void)
{
  /* MCU 初始化 */
  LL_InitTick(1000000, 1000);  /* 1ms 时基 */
  SystemClock_Config();
  MX_GPIO_Init();

  /* 主循环 */
  while (1)
  {
    /* 扫描按键 */
    KEY_Scan();
    
    /* 按键处理 */
    if (g_key_flag)
    {
      g_key_flag = 0;
      LL_GPIO_TogglePin(LED_PORT, LED_PIN);
      
      /* 等待释放 */
      while (LL_GPIO_IsInputPinSet(KEY_PORT, KEY_PIN) == 0);
      LL_mDelay(20);
    }
    
    LL_mDelay(10);
  }
}

/**
  * @brief GPIO 初始化函数（LL 库）
  */
static void MX_GPIO_Init(void)
{
  /* 使能 GPIO 时钟 */
  LL_AHB1_GRP1_EnableClock(LL_AHB1_GRP1_PERIPH_GPIOA);

  /* 配置 LED 引脚（推挽输出） */
  LL_GPIO_SetPinMode(LED_PORT, LED_PIN, LL_GPIO_MODE_OUTPUT);
  LL_GPIO_SetPinOutputType(LED_PORT, LED_PIN, LL_GPIO_OUTPUT_PUSHPULL);
  LL_GPIO_SetPinSpeed(LED_PORT, LED_PIN, LL_GPIO_SPEED_FREQ_LOW);
  LL_GPIO_SetPinPull(LED_PORT, LED_PIN, LL_GPIO_PULL_NO);
  LL_GPIO_ResetOutputPin(LED_PORT, LED_PIN);

  /* 配置按键引脚（上拉输入） */
  LL_GPIO_SetPinMode(KEY_PORT, KEY_PIN, LL_GPIO_MODE_INPUT);
  LL_GPIO_SetPinPull(KEY_PORT, KEY_PIN, LL_GPIO_PULL_UP);
}

/**
  * @brief 按键扫描函数
  */
void KEY_Scan(void)
{
  static uint16_t s_key_timer = 0;
  
  if (LL_GPIO_IsInputPinSet(KEY_PORT, KEY_PIN) == 0)
  {
    s_key_timer++;
    if (s_key_timer >= 20)
    {
      g_key_flag = 1;
      s_key_timer = 20;
    }
  }
  else
  {
    s_key_timer = 0;
  }
}

/* 系统时钟配置（略） */
void SystemClock_Config(void)
{
  /* 参考 hello-world 示例 */
}
```

### LL 库 API 对比

| 功能 | HAL 库 | LL 库 |
|------|--------|-------|
| 使能时钟 | `__HAL_RCC_GPIOA_CLK_ENABLE()` | `LL_AHB1_GRP1_EnableClock(LL_AHB1_GRP1_PERIPH_GPIOA)` |
| 设置模式 | `GPIO_InitStruct.Mode = GPIO_MODE_OUTPUT` | `LL_GPIO_SetPinMode(GPIOA, PIN, LL_GPIO_MODE_OUTPUT)` |
| 读取引脚 | `HAL_GPIO_ReadPin(GPIOA, PIN)` | `LL_GPIO_IsInputPinSet(GPIOA, PIN)` |
| 写入引脚 | `HAL_GPIO_WritePin(GPIOA, PIN, state)` | `LL_GPIO_SetOutputPin()` / `LL_GPIO_ResetOutputPin()` |
| 翻转引脚 | `HAL_GPIO_TogglePin(GPIOA, PIN)` | `LL_GPIO_TogglePin(GPIOA, PIN)` |

## GPIO 模式配置表

### 输出模式

| 参数 | 配置值 | 说明 |
|------|--------|------|
| Mode | `GPIO_MODE_OUTPUT_PP` | 推挽输出 |
| Mode | `GPIO_MODE_OUTPUT_OD` | 开漏输出 |
| Speed | `GPIO_SPEED_FREQ_LOW` | 低速（2MHz） |
| Speed | `GPIO_SPEED_FREQ_MEDIUM` | 中速（10MHz） |
| Speed | `GPIO_SPEED_FREQ_HIGH` | 高速（50MHz） |
| Pull | `GPIO_NOPULL` | 无上拉/下拉 |

### 输入模式

| 参数 | 配置值 | 说明 |
|------|--------|------|
| Mode | `GPIO_MODE_INPUT` | 浮空输入 |
| Mode | `GPIO_MODE_INPUT_PULLUP` | 上拉输入 |
| Mode | `GPIO_MODE_INPUT_PULLDOWN` | 下拉输入 |
| Pull | `GPIO_PULLUP` | 上拉 |
| Pull | `GPIO_PULLDOWN` | 下拉 |
| Pull | `GPIO_NOPULL` | 无上下拉 |

### 中断模式

| 参数 | 配置值 | 说明 |
|------|--------|------|
| Mode | `GPIO_MODE_IT_RISING` | 上升沿中断 |
| Mode | `GPIO_MODE_IT_FALLING` | 下降沿中断 |
| Mode | `GPIO_MODE_IT_RISING_FALLING` | 双边沿中断 |

## 常见问题

### Q: GPIO 输出电流能力是多少？

A: XX32F103 的 GPIO：
- **单个引脚**: 最大 25mA（推荐 20mA 以内）
- **整个端口**: 最大 100mA
- **灌电流/拉电流**: 对称，均为 25mA

**建议**: 驱动 LED 时串联 220Ω~1kΩ限流电阻。

### Q: 如何配置 GPIO 为模拟输入？

A: 用于 ADC 采集时：
```c
/* HAL 库 */
GPIO_InitStruct.Mode = GPIO_MODE_ANALOG;
GPIO_InitStruct.Pull = GPIO_NOPULL;

/* LL 库 */
LL_GPIO_SetPinMode(GPIOA, PIN, LL_GPIO_MODE_ANALOG);
```

### Q: 外部中断如何配置？

A: 
```c
/* HAL 库配置 */
GPIO_InitStruct.Mode = GPIO_MODE_IT_FALLING;
HAL_GPIO_Init(GPIOA, &GPIO_InitStruct);

/* 配置中断优先级 */
HAL_NVIC_SetPriority(EXTI0_IRQn, 1, 0);
HAL_NVIC_EnableIRQ(EXTI0_IRQn);

/* 实现回调函数 */
void HAL_GPIO_EXTI_Callback(uint16_t GPIO_Pin)
{
  if (GPIO_Pin == GPIO_PIN_0)
  {
    /* 处理中断 */
  }
}
```

### Q: GPIO 速度对功耗有影响吗？

A: 是的：
- 速度越高，翻转时电流越大
- 低频应用建议使用 `GPIO_SPEED_FREQ_LOW`
- 高速通信（SPI、I2C）需使用 `GPIO_SPEED_FREQ_HIGH`

## 性能对比

| 指标 | HAL 库 | LL 库 |
|------|--------|-------|
| 代码大小 | ~500 字节 | ~200 字节 |
| 执行速度 | 1x | 2-3x |
| 易用性 | ⭐⭐⭐⭐⭐ | ⭐⭐⭐ |
| 可移植性 | ⭐⭐⭐⭐⭐ | ⭐⭐⭐ |

## 下一步

- [USART 驱动](/docs/peripheral-drivers/usart) - 串口通信
- [外部中断](/docs/getting-started/gpio-blink) - 深入中断处理
- [ADC 驱动](/docs/peripheral-drivers/adc) - 模拟信号采集

---

> 📝 [在 GitHub 上编辑此页](https://github.com/your-org/developer-hub-docs/edit/main/docs/peripheral-drivers/gpio.md)
