---
sidebar_position: 8
---

# TIM 驱动示例

:::tip 本页摘要
本文提供通用定时器的完整驱动代码，包含定时中断、输入捕获、输出比较等应用。
:::

## 外设概述

定时器（TIM）用于定时中断、PWM 生成、输入捕获等。

## HAL 库示例

```c title="main.c"
#include "main.h"

TIM_HandleTypeDef htim2;

int main(void)
{
  HAL_Init();
  SystemClock_Config();
  MX_TIM2_Init();

  /* 启动定时器中断 */
  HAL_TIM_Base_Start_IT(&htim2);

  while (1)
  {
    HAL_Delay(1000);
  }
}

void MX_TIM2_Init(void)
{
  htim2.Instance = TIM2;
  htim2.Init.Prescaler = 7199;  /* 72MHz / 7200 = 10kHz */
  htim2.Init.CounterMode = TIM_COUNTERMODE_UP;
  htim2.Init.Period = 9999;     /* 10kHz / 10000 = 1Hz */
  HAL_TIM_Base_Init(&htim2);
}

void HAL_TIM_PeriodElapsedCallback(TIM_HandleTypeDef *htim)
{
  if (htim->Instance == TIM2)
  {
    /* 1 秒中断一次 */
  }
}
```

---

> 📝 [在 GitHub 上编辑此页](https://github.com/your-org/developer-hub-docs/edit/main/docs/peripheral-drivers/tim.md)
