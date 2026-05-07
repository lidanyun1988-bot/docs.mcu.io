---
sidebar_position: 14
---

# USB 驱动示例

:::tip 本页摘要
本文提供 USB 设备模式的完整驱动代码，包含 CDC（虚拟串口）、HID（人机接口设备）等应用示例。
:::

## 外设概述

USB 设备模式用于与 PC 通信，支持 CDC、HID、MSC 等设备类。

## HAL 库示例

```c title="main.c"
#include "main.h"
#include "usbd_core.h"
#include "usbd_cdc.h"

USBD_HandleTypeDef USBD_Device;
extern USBD_CDC_ItfTypeDef USBD_CDC_fops;

int main(void)
{
  HAL_Init();
  SystemClock_Config();
  MX_USB_PCD_Init();

  /* 初始化 USB 设备 */
  USBD_Init(&USBD_Device, &VCP_Desc, 0);
  USBD_RegisterClass(&USBD_Device, &USBD_CDC);
  USBD_CDC_RegisterInterface(&USBD_Device, &USBD_CDC_fops);
  USBD_Start(&USBD_Device);

  while (1)
  {
    /* 发送数据到 PC */
    CDC_Transmit_FS((uint8_t*)"Hello USB\r\n", 11);
    HAL_Delay(1000);
  }
}

void MX_USB_PCD_Init(void)
{
  /* USB PCD 配置 */
  /* 使用 STM32CubeMX 生成配置代码 */
}
```

---

> 📝 [在 GitHub 上编辑此页](https://github.com/your-org/developer-hub-docs/edit/main/docs/peripheral-drivers/usb.md)
