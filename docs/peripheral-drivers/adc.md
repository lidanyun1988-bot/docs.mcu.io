---
sidebar_position: 6
---

# ADC 驱动示例

:::tip 本页摘要
本文提供 ADC 模数转换器的完整驱动代码，包含单次转换、连续转换、多通道扫描和 DMA 传输，支持 HAL 库和 LL 库。
:::

## 外设概述

ADC（Analog-to-Digital Converter）用于将模拟信号转换为数字信号，用于：
- 电压采集
- 电流检测
- 温度测量
- 电池电量监测

## HAL 库示例

```c title="main.c"
#include "main.h"

ADC_HandleTypeDef hadc1;
uint32_t adc_value;

int main(void)
{
  HAL_Init();
  SystemClock_Config();
  MX_ADC1_Init();

  while (1)
  {
    /* 单次转换 */
    HAL_ADC_Start(&hadc1);
    HAL_ADC_PollForConversion(&hadc1, 100);
    adc_value = HAL_ADC_GetValue(&hadc1);
    HAL_ADC_Stop(&hadc1);
    
    HAL_Delay(100);
  }
}

void MX_ADC1_Init(void)
{
  ADC_ChannelConfTypeDef sConfig = {0};
  hadc1.Instance = ADC1;
  hadc1.Init.ScanConvMode = ADC_SCAN_DISABLE;
  hadc1.Init.ContinuousConvMode = DISABLE;
  hadc1.Init.DiscontinuousConvMode = DISABLE;
  hadc1.Init.ExternalTrigConv = ADC_SOFTWARE_START;
  hadc1.Init.DataAlign = ADC_DATAALIGN_RIGHT;
  hadc1.Init.NbrOfConversion = 1;
  HAL_ADC_Init(&hadc1);

  sConfig.Channel = ADC_CHANNEL_0;
  sConfig.Rank = ADC_REGULAR_RANK_1;
  sConfig.SamplingTime = ADC_SAMPLETIME_55CYCLES_5;
  HAL_ADC_ConfigChannel(&hadc1, &sConfig);
}
```

---

> 📝 [在 GitHub 上编辑此页](https://github.com/your-org/developer-hub-docs/edit/main/docs/peripheral-drivers/adc.md)
