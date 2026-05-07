---
sidebar_position: 4
---

# GPIO 入门 - 按键检测与 LED 控制

:::tip 本页摘要
本文深入讲解 GPIO 的输入输出模式应用，通过按键控制 LED 的实例，学习 GPIO 配置、上拉/下拉电阻、按键消抖和外部中断处理，包含完整可运行代码。
:::

## 外设概述

GPIO（General Purpose Input/Output）是最基本的 MCU 外设，用于：
- 控制 LED、继电器等输出设备
- 读取按键、开关等输入信号
- 模拟通信协议（如软件 I2C、SPI）

XX32F103 的 GPIO 特性：
- 8 个 GPIO 端口（GPIOA~GPIOG）
- 每个端口最多 16 个引脚（PIN0~PIN15）
- 多种工作模式：输入、输出、复用、模拟
- 支持外部中断

## 硬件连接

### LED 连接

典型 LED 电路：
```
MCU 引脚 (PA5) → 限流电阻 (220Ω) → LED 正极 → LED 负极 → GND
```

**连接方式**:
- **高电平点亮**: LED 负极接 GND，引脚输出高电平时点亮
- **低电平点亮**: LED 正极接 VCC，引脚输出低电平时点亮

### 按键连接

典型按键电路：
```
MCU 引脚 (PA0) → 按键 → GND
同时引脚内部启用上拉电阻
```

**工作原理**:
- 按键未按下：引脚通过上拉电阻接 VCC，读入高电平
- 按键按下：引脚直接接地，读入低电平

## GPIO 工作模式

### 输出模式

| 模式 | 说明 | 应用场景 |
|------|------|---------|
| **推挽输出 (Push-Pull)** | 可输出高/低电平 | LED、蜂鸣器 |
| **开漏输出 (Open-Drain)** | 只能输出低电平，高电平需外接上拉 | I2C、电平转换 |

### 输入模式

| 模式 | 说明 | 应用场景 |
|------|------|---------|
| **上拉输入 (Pull-up)** | 默认高电平，按下低电平 | 按键（接 GND） |
| **下拉输入 (Pull-down)** | 默认低电平，按下高电平 | 按键（接 VCC） |
| **浮空输入 (Floating)** | 电平不确定 | 标准通信协议 |

## HAL 库示例

### 完整代码：按键控制 LED

```c title="main.c"
/* USER CODE BEGIN Includes */
#include "main.h"
/* USER CODE END Includes */

/* 定义按键和 LED 引脚 */
#define LED_PIN           GPIO_PIN_5
#define LED_PORT          GPIOA
#define KEY_PIN           GPIO_PIN_0
#define KEY_PORT          GPIOA

/* 全局变量 */
volatile uint8_t key_pressed = 0;

/* 函数声明 */
void KEY_Scan(void);

/* USER CODE BEGIN 0 */

/**
  * @brief  按键扫描函数（消抖）
  * @param  无
  * @retval 按键状态：1-按下，0-未按下
  */
void KEY_Scan(void)
{
  static uint16_t key_timer = 0;
  
  // 检测按键是否按下（低电平有效）
  if (HAL_GPIO_ReadPin(KEY_PORT, KEY_PIN) == GPIO_PIN_RESET)
  {
    key_timer++;
    
    // 延时消抖（约 20ms）
    if (key_timer >= 20)
    {
      key_pressed = 1;
      key_timer = 20; // 保持最大值，防止溢出
    }
  }
  else
  {
    key_timer = 0;
  }
}

/* USER CODE END 0 */

int main(void)
{
  /* MCU Configuration--------------------------------------------------------*/
  HAL_Init();
  SystemClock_Config();
  MX_GPIO_Init();

  /* USER CODE BEGIN 2 */
  /* USER CODE END 2 */

  /* Infinite loop */
  /* USER CODE BEGIN WHILE */
  while (1)
  {
    // 扫描按键
    KEY_Scan();
    
    // 如果按键按下，切换 LED 状态
    if (key_pressed)
    {
      key_pressed = 0; // 清除标志
      HAL_GPIO_TogglePin(LED_PORT, LED_PIN);
      
      // 等待按键释放
      while (HAL_GPIO_ReadPin(KEY_PORT, KEY_PIN) == GPIO_PIN_RESET);
      HAL_Delay(20); // 释放消抖
    }
    
    /* USER CODE END WHILE */
  }
  /* USER CODE END 3 */
}

/**
  * @brief GPIO Initialization Function
  */
static void MX_GPIO_Init(void)
{
  GPIO_InitTypeDef GPIO_InitStruct = {0};

  /* GPIO Ports Clock Enable */
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
```

## 使用外部中断检测按键

上面的轮询方式会占用 CPU 资源，更好的方式是使用外部中断：

```c title="main.c - 中断版本"
/* USER CODE BEGIN Includes */
#include "main.h"
/* USER CODE END Includes */

#define LED_PIN           GPIO_PIN_5
#define LED_PORT          GPIOA
#define KEY_PIN           GPIO_PIN_0
#define KEY_PORT          GPIOA

/* 用户代码开始 */

/**
  * @brief  按键按下回调函数（外部中断触发）
  * @param  GPIO_Pin: 触发中断的引脚
  * @retval 无
  */
void HAL_GPIO_EXTI_Callback(uint16_t GPIO_Pin)
{
  if (GPIO_Pin == KEY_PIN)
  {
    // 简单消抖：延时后再次检测
    HAL_Delay(20);
    
    if (HAL_GPIO_ReadPin(KEY_PORT, KEY_PIN) == GPIO_PIN_RESET)
    {
      // 切换 LED 状态
      HAL_GPIO_TogglePin(LED_PORT, LED_PIN);
      
      // 等待按键释放
      while (HAL_GPIO_ReadPin(KEY_PORT, KEY_PIN) == GPIO_PIN_RESET);
      HAL_Delay(20);
    }
  }
}

/* 用户代码结束 */

/**
  * @brief GPIO Initialization Function（中断配置）
  */
static void MX_GPIO_Init(void)
{
  GPIO_InitTypeDef GPIO_InitStruct = {0};

  __HAL_RCC_GPIOA_CLK_ENABLE();

  /* 配置 LED */
  HAL_GPIO_WritePin(LED_PORT, LED_PIN, GPIO_PIN_RESET);
  GPIO_InitStruct.Pin = LED_PIN;
  GPIO_InitStruct.Mode = GPIO_MODE_OUTPUT_PP;
  GPIO_InitStruct.Pull = GPIO_NOPULL;
  GPIO_InitStruct.Speed = GPIO_SPEED_FREQ_LOW;
  HAL_GPIO_Init(LED_PORT, &GPIO_InitStruct);

  /* 配置按键为外部中断模式 */
  GPIO_InitStruct.Pin = KEY_PIN;
  GPIO_InitStruct.Mode = GPIO_MODE_IT_FALLING;  // 下降沿触发中断
  GPIO_InitStruct.Pull = GPIO_PULLUP;
  HAL_GPIO_Init(KEY_PORT, &GPIO_InitStruct);

  /* 配置中断优先级并启用 */
  HAL_NVIC_SetPriority(EXTI0_IRQn, 1, 0);
  HAL_NVIC_EnableIRQ(EXTI0_IRQn);
}
```

## 关键 API 说明

### GPIO 读写

```c
// 读取引脚电平
GPIO_PinState HAL_GPIO_ReadPin(GPIO_TypeDef* GPIOx, uint16_t GPIO_Pin);

// 写入引脚电平
void HAL_GPIO_WritePin(GPIO_TypeDef* GPIOx, uint16_t GPIO_Pin, GPIO_PinState PinState);

// 翻转引脚电平
void HAL_GPIO_TogglePin(GPIO_TypeDef* GPIOx, uint16_t GPIO_Pin);
```

### 示例：
```c
// 读取 PA0 引脚
GPIO_PinState state = HAL_GPIO_ReadPin(GPIOA, GPIO_PIN_0);

// 设置 PA5 为高电平
HAL_GPIO_WritePin(GPIOA, GPIO_PIN_5, GPIO_PIN_SET);

// 翻转 PA5
HAL_GPIO_TogglePin(GPIOA, GPIO_PIN_5);
```

## 常见问题

### Q: 按键响应不灵敏？

A: 可能原因：
1. 消抖时间不够（建议 20ms）
2. 上拉电阻未启用
3. 按键硬件接触不良
4. 检查接线和配置

### Q: 中断不触发？

A: 确保：
1. GPIO 模式配置为 `GPIO_MODE_IT_XXX`
2. 中断优先级已配置（`HAL_NVIC_SetPriority`）
3. 中断已启用（`HAL_NVIC_EnableIRQ`）
4. 中断处理函数已实现（`HAL_GPIO_EXTI_Callback`）

### Q: LED 亮度不足？

A: 检查：
1. GPIO 速度配置（高速模式驱动能力更强）
2. 限流电阻阻值（建议 220Ω~1kΩ）
3. LED 正向压降是否匹配

## 下一步

掌握 GPIO 后，继续学习 [USART 串口通信](/docs/peripheral-drivers/usart)。

---

> 📝 [在 GitHub 上编辑此页](https://github.com/your-org/developer-hub-docs/edit/main/docs/getting-started/gpio-blink.md)
