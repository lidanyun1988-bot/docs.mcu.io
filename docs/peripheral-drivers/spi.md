---
sidebar_position: 4
---

# SPI 驱动示例

:::tip 本页摘要
本文提供 SPI 总线的完整驱动代码，包含主从模式、全双工/半双工通信，支持 HAL 库和 LL 库，适用于 Flash、SD 卡、显示屏等外设。
:::

## 外设概述

SPI（Serial Peripheral Interface）是同步串行通信接口，用于：
- Flash 存储器（W25Qxx）
- SD 卡
- 显示屏（LCD、OLED）
- 传感器（MPU6050、ADXL345）

## HAL 库示例

```c title="main.c"
#include "main.h"

SPI_HandleTypeDef hspi1;
uint8_t tx_data = 0xAA;
uint8_t rx_data;

int main(void)
{
  HAL_Init();
  SystemClock_Config();
  MX_SPI1_Init();

  while (1)
  {
    /* 全双工通信 */
    HAL_SPI_TransmitReceive(&hspi1, &tx_data, &rx_data, 1, 100);
    HAL_Delay(100);
  }
}

void MX_SPI1_Init(void)
{
  hspi1.Instance = SPI1;
  hspi1.Init.Mode = SPI_MODE_MASTER;
  hspi1.Init.Direction = SPI_DIRECTION_2LINES;
  hspi1.Init.DataSize = SPI_DATASIZE_8BIT;
  hspi1.Init.CLKPolarity = SPI_POLARITY_LOW;
  hspi1.Init.CLKPhase = SPI_PHASE_1EDGE;
  hspi1.Init.NSS = SPI_NSS_SOFT;
  hspi1.Init.BaudRatePrescaler = SPI_BAUDRATEPRESCALER_16;
  hspi1.Init.FirstBit = SPI_FIRSTBIT_MSB;
  hspi1.Init.TIMode = SPI_TIMODE_DISABLE;
  hspi1.Init.CRCCalculation = SPI_CRCCALCULATION_DISABLE;
  HAL_SPI_Init(&hspi1);
}
```

---

> 📝 [在 GitHub 上编辑此页](https://github.com/your-org/developer-hub-docs/edit/main/docs/peripheral-drivers/spi.md)
