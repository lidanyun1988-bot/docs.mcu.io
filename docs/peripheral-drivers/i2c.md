---
sidebar_position: 5
---

# I2C 驱动示例

:::tip 本页摘要
本文提供 I2C 总线的完整驱动代码，包含主模式、7 位/10 位地址、EEPROM 读写示例，支持 HAL 库和 LL 库。
:::

## 外设概述

I2C（Inter-Integrated Circuit）是两线式串行总线，用于：
- EEPROM（AT24Cxx）
- 实时时钟（DS1307、PCF8563）
- 传感器（BMP280、HTU21D）

## HAL 库示例

```c title="main.c"
#include "main.h"

I2C_HandleTypeDef hi2c1;
#define EEPROM_ADDR 0xA0

int main(void)
{
  HAL_Init();
  SystemClock_Config();
  MX_I2C1_Init();

  uint8_t tx_data = 0x55;
  uint8_t rx_data;

  /* 写入 EEPROM */
  HAL_I2C_Mem_Write(&hi2c1, EEPROM_ADDR, 0x00, I2C_MEMADD_SIZE_8BIT, &tx_data, 1, 100);

  /* 读取 EEPROM */
  HAL_I2C_Mem_Read(&hi2c1, EEPROM_ADDR, 0x00, I2C_MEMADD_SIZE_8BIT, &rx_data, 1, 100);

  while (1)
  {
    HAL_Delay(1000);
  }
}

void MX_I2C1_Init(void)
{
  hi2c1.Instance = I2C1;
  hi2c1.Init.ClockSpeed = 100000;
  hi2c1.Init.DutyCycle = I2C_DUTYCYCLE_2;
  hi2c1.Init.OwnAddress1 = 0x00;
  hi2c1.Init.AddressingMode = I2C_ADDRESSINGMODE_7BIT;
  hi2c1.Init.DualAddressMode = I2C_DUALADDRESS_DISABLE;
  hi2c1.Init.GeneralCallMode = I2C_GENERALCALL_DISABLE;
  hi2c1.Init.NoStretchMode = I2C_NOSTRETCH_DISABLE;
  HAL_I2C_Init(&hi2c1);
}
```

---

> 📝 [在 GitHub 上编辑此页](https://github.com/your-org/developer-hub-docs/edit/main/docs/peripheral-drivers/i2c.md)
