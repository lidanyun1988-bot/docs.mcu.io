---
sidebar_position: 9
---

# PWM 驱动示例

:::tip 本页摘要
本文提供 PWM 输出的完整驱动代码，包含 LED 调光、电机控制、呼吸灯等应用示例。
:::

## 外设概述

PWM（Pulse Width Modulation）用于 LED 调光、电机控制等。

## HAL 库示例

```c title="main.c"
#include "main.h"

TIM_HandleTypeDef htim3;
TIM_OC_InitTypeDef sConfigOC = {0};

int main(void)
{
  HAL_Init();
  SystemClock_Config();
  MX_TIM3_Init();

  /* 启动 PWM 输出（50% 占空比） */
  HAL_TIM_PWM_Start(&htim3, TIM_CHANNEL_1);
  __HAL_TIM_SET_COMPARE(&htim3, TIM_CHANNEL_1, 500);

  while (1)
  {
    HAL_Delay(1000);
  }
}

void MX_TIM3_Init(void)
{
  htim3.Instance = TIM3;
  htim3.Init.Prescaler = 71;
  htim3.Init.CounterMode = TIM_COUNTERMODE_UP;
  htim3.Init.Period = 999;  /* 1kHz PWM 频率 */
  htim3.Init.ClockDivision = TIM_CLOCKDIVISION_DIV1;
  HAL_TIM_PWM_Init(&htim3);

  sConfigOC.OCMode = TIM_OCMODE_PWM1;
  sConfigOC.Pulse = 500;
  sConfigOC.OCPolarity = TIM_OCPOLARITY_HIGH;
  HAL_TIM_PWM_ConfigChannel(&htim3, &sConfigOC, TIM_CHANNEL_1);
}
```

---

> 📝 [在 GitHub 上编辑此页](https://github.com/your-org/developer-hub-docs/edit/main/docs/peripheral-drivers/pwm.md)
