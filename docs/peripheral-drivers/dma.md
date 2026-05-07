---
sidebar_position: 12
---

# DMA 驱动示例

:::tip 本页摘要
本文提供 DMA 控制器的完整驱动代码，包含内存到内存传输、外设到内存传输（ADC+DMA）等应用。
:::

## 外设概述

DMA（Direct Memory Access）用于在不占用 CPU 的情况下传输数据。

## HAL 库示例

```c title="main.c"
#include "main.h"

DMA_HandleTypeDef hdma_memtomem_dma1_channel1;
uint32_t src_data[100] = {0};
uint32_t dst_data[100] = {0};

int main(void)
{
  HAL_Init();
  SystemClock_Config();
  
  /* 初始化源数据 */
  for (int i = 0; i < 100; i++)
  {
    src_data[i] = i;
  }

  /* 启动 DMA 传输 */
  HAL_DMA_Start_IT(&hdma_memtomem_dma1_channel1, 
                   (uint32_t)src_data, 
                   (uint32_t)dst_data, 
                   100);

  while (1)
  {
    HAL_Delay(1000);
  }
}

void MX_DMA_Init(void)
{
  __HAL_RCC_DMA1_CLK_ENABLE();
  
  hdma_memtomem_dma1_channel1.Instance = DMA1_Channel1;
  hdma_memtomem_dma1_channel1.Init.Direction = DMA_MEMORY_TO_MEMORY;
  hdma_memtomem_dma1_channel1.Init.MemInc = DMA_MINC_ENABLE;
  hdma_memtomem_dma1_channel1.Init.PeriphInc = DMA_PINC_ENABLE;
  hdma_memtomem_dma1_channel1.Init.Mode = DMA_NORMAL;
  hdma_memtomem_dma1_channel1.Init.Priority = DMA_PRIORITY_LOW;
  HAL_DMA_Init(&hdma_memtomem_dma1_channel1);
}
```

---

> 📝 [在 GitHub 上编辑此页](https://github.com/your-org/developer-hub-docs/edit/main/docs/peripheral-drivers/dma.md)
