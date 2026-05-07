---
sidebar_position: 11
---

# WDG 驱动示例

:::tip 本页摘要
本文提供看门狗（独立看门狗 IWDG 和窗口看门狗 WWDG）的完整驱动代码，用于系统故障检测和自动复位。
:::

## 外设概述

看门狗用于检测系统故障并自动复位，防止程序跑飞。

## HAL 库示例

```c title="main.c"
#include "main.h"

IWDG_HandleTypeDef hiwdg;

int main(void)
{
  HAL_Init();
  SystemClock_Config();
  MX_IWDG_Init();

  while (1)
  {
    /* 喂狗 */
    HAL_IWDG_Reload(&hiwdg);
    HAL_Delay(500);
  }
}

void MX_IWDG_Init(void)
{
  hiwdg.Instance = IWDG;
  hiwdg.Init.Prescaler = IWDG_PRESCALER_64;
  hiwdg.Init.Reload = 0xFFF;  /* 约 1 秒超时 */
  HAL_IWDG_Init(&hiwdg);
  
  /* 启动看门狗 */
  HAL_IWDG_Start(&hiwdg);
}
```

---

> 📝 [在 GitHub 上编辑此页](https://github.com/your-org/developer-hub-docs/edit/main/docs/peripheral-drivers/wdg.md)
