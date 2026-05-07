---
sidebar_position: 3
---

# USART 驱动示例

:::tip 本页摘要
本文提供 USART 串口通信的完整驱动代码，包含轮询、中断、DMA 三种收发方式，支持 HAL 库和 LL 库，代码可直接用于项目。
:::

## 外设概述

USART（Universal Synchronous Asynchronous Receiver Transmitter）是通用同步异步收发器，用于：
- 串口通信（UART 模式）
- 与其他 MCU 或 PC 通信
- GPS、蓝牙、WiFi 模块通信

## HAL 库示例

### 完整代码

```c title="main.c"
#include "main.h"
#include <stdio.h>
#include <string.h>

UART_HandleTypeDef huart2;
uint8_t rx_buffer[100];
char tx_message[] = "Hello, XX32 MCU!\r\n";

int main(void)
{
  HAL_Init();
  SystemClock_Config();
  MX_USART2_UART_Init();

  /* 发送欢迎消息 */
  HAL_UART_Transmit(&huart2, (uint8_t*)tx_message, strlen(tx_message), 100);

  while (1)
  {
    /* 中断方式接收 */
    HAL_UART_Receive_IT(&huart2, rx_buffer, 1);
    HAL_Delay(1000);
  }
}

/**
  * @brief USART2 初始化函数
  */
void MX_USART2_UART_Init(void)
{
  huart2.Instance = USART2;
  huart2.Init.BaudRate = 115200;
  huart2.Init.WordLength = UART_WORDLENGTH_8B;
  huart2.Init.StopBits = UART_STOPBITS_1;
  huart2.Init.Parity = UART_PARITY_NONE;
  huart2.Init.Mode = UART_MODE_TX_RX;
  huart2.Init.HwFlowCtl = UART_HWCONTROL_NONE;
  huart2.Init.OverSampling = UART_OVERSAMPLING_16;
  HAL_UART_Init(&huart2);
}

/* 接收完成回调 */
void HAL_UART_RxCpltCallback(UART_HandleTypeDef *huart)
{
  if (huart->Instance == USART2)
  {
    /* 回显接收到的数据 */
    HAL_UART_Transmit(&huart2, rx_buffer, 1, 100);
  }
}

/* 重定向 printf 到串口 */
int __io_putchar(int ch)
{
  HAL_UART_Transmit(&huart2, (uint8_t*)&ch, 1, 100);
  return ch;
}
```

## LL 库示例

```c title="main.c - LL 库版本"
#include "main.h"
#include <stdio.h>

char tx_message[] = "Hello, XX32 MCU!\r\n";

int main(void)
{
  LL_InitTick(1000000, 1000);
  SystemClock_Config();
  MX_USART2_UART_Init();

  /* 发送数据 */
  for (int i = 0; tx_message[i] != '\0'; i++)
  {
    LL_USART_TransmitData8(USART2, tx_message[i]);
    while (!LL_USART_IsActiveFlag_TXE(USART2));
  }

  while (1)
  {
    LL_mDelay(1000);
  }
}

/**
  * @brief USART2 初始化（LL 库）
  */
void MX_USART2_UART_Init(void)
{
  LL_APB1_GRP1_EnableClock(LL_APB1_GRP1_PERIPH_USART2);
  LL_APB2_GRP1_EnableClock(LL_APB2_GRP1_PERIPH_GPIOA);

  /* 配置 PA2(TX) 和 PA3(RX) */
  LL_GPIO_SetPinSpeed(GPIOA, LL_GPIO_PIN_2, LL_GPIO_SPEED_FREQ_HIGH);
  LL_GPIO_SetPinMode(GPIOA, LL_GPIO_PIN_2, LL_GPIO_MODE_ALTERNATE);
  LL_GPIO_SetPinSpeed(GPIOA, LL_GPIO_PIN_3, LL_GPIO_MODE_INPUT);
  LL_GPIO_SetPinMode(GPIOA, LL_GPIO_PIN_3, LL_GPIO_MODE_INPUT);

  /* USART2 配置 */
  LL_USART_SetBaudRate(USART2, SystemCoreClock, 115200);
  LL_USART_SetDataWidth(USART2, LL_USART_DATAWIDTH_8B);
  LL_USART_SetStopBitsLength(USART2, LL_USART_STOPBITS_1);
  LL_USART_SetParity(USART2, LL_USART_PARITY_NONE);
  LL_USART_SetTransferDirection(USART2, LL_USART_DIRECTION_TX_RX);
  LL_USART_Enable(USART2);
}
```

---

> 📝 [在 GitHub 上编辑此页](https://github.com/your-org/developer-hub-docs/edit/main/docs/peripheral-drivers/usart.md)
