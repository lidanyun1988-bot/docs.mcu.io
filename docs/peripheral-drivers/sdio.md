---
sidebar_position: 15
---

# SDIO 驱动示例

:::tip 本页摘要
本文提供 SDIO 接口的完整驱动代码，用于 SD 卡读写，包含 DMA 传输和 FatFS 文件系统集成示例。
:::

## 外设概述

SDIO（Secure Digital Input Output）接口用于 SD 卡存储。

## HAL 库示例

```c title="main.c"
#include "main.h"
#include "ff.h"

SD_HandleTypeDef hsd;
FATFS SDFatFS;
FIL SDFile;

int main(void)
{
  HAL_Init();
  SystemClock_Config();
  MX_SDIO_SD_Init();
  MX_FATFS_Init();

  /* 挂载 SD 卡 */
  if (FATFS_LinkDriver(&SD_Driver, &SDPath) == 0)
  {
    if (f_mount(&SDFatFS, (TCHAR const*)SDPath, 0) == FR_OK)
    {
      /* 创建文件 */
      if (f_open(&SDFile, "test.txt", FA_CREATE_ALWAYS | FA_WRITE) == FR_OK)
      {
        f_puts("Hello SD Card!", &SDFile);
        f_close(&SDFile);
      }
    }
  }

  while (1)
  {
    HAL_Delay(1000);
  }
}

void MX_SDIO_SD_Init(void)
{
  hsd.Instance = SDIO;
  hsd.Init.ClockEdge = SDIO_CLOCK_EDGE_RISING;
  hsd.Init.ClockBypass = SDIO_CLOCK_BYPASS_DISABLE;
  hsd.Init.ClockPowerSave = SDIO_CLOCK_POWER_SAVE_DISABLE;
  hsd.Init.BusWide = SDIO_BUS_WIDE_1B;
  hsd.Init.HardwareFlowControl = SDIO_HARDWARE_FLOW_CONTROL_DISABLE;
  hsd.Init.ClockDiv = 2;
  HAL_SD_Init(&hsd);
}
```

---

> 📝 [在 GitHub 上编辑此页](https://github.com/your-org/developer-hub-docs/edit/main/docs/peripheral-drivers/sdio.md)
