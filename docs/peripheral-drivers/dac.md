---
sidebar_position: 7
---

# DAC 驱动示例

:::tip 本页摘要
本文提供 DAC 数模转换器的完整驱动代码，包含波形生成、DMA 传输等应用示例。
:::

## 外设概述

DAC（Digital-to-Analog Converter）用于将数字信号转换为模拟电压输出。

## HAL 库示例

```c title="main.c"
#include "main.h"

DAC_HandleTypeDef hdac;

int main(void)
{
  HAL_Init();
  SystemClock_Config();
  MX_DAC_Init();

  /* 输出 2.04V (3.3V * 2511/4095) */
  HAL_DAC_Start(&hdac, DAC_CHANNEL_1);
  HAL_DAC_SetValue(&hdac, DAC_CHANNEL_1, DAC_ALIGN_12B_R, 2511);

  while (1)
  {
    HAL_Delay(1000);
  }
}

void MX_DAC_Init(void)
{
  hdac.Instance = DAC;
  HAL_DAC_Init(&hdac);
}
```

---

> 📝 [在 GitHub 上编辑此页](https://github.com/your-org/developer-hub-docs/edit/main/docs/peripheral-drivers/dac.md)
