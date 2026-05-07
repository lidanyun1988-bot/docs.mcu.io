---
sidebar_position: 13
---

# CAN 驱动示例

:::tip 本页摘要
本文提供 CAN 总线的完整驱动代码，包含标准帧/扩展帧收发、过滤器配置等，适用于工业控制和汽车电子。
:::

## 外设概述

CAN（Controller Area Network）总线用于工业控制和汽车电子通信。

## HAL 库示例

```c title="main.c"
#include "main.h"

CAN_HandleTypeDef hcan;
CAN_TxHeaderTypeDef TxHeader;
CAN_RxHeaderTypeDef RxHeader;
uint8_t TxData[8] = {0x01, 0x02, 0x03, 0x04};
uint8_t RxData[8] = {0};

int main(void)
{
  HAL_Init();
  SystemClock_Config();
  MX_CAN_Init();

  /* 发送 CAN 帧 */
  TxHeader.StdId = 0x123;
  TxHeader.IDE = CAN_ID_STD;
  TxHeader.RTR = CAN_RTR_DATA;
  TxHeader.DLC = 4;
  HAL_CAN_AddTxMessage(&hcan, &TxHeader, TxData, NULL);

  while (1)
  {
    HAL_Delay(1000);
  }
}

void MX_CAN_Init(void)
{
  hcan.Instance = CAN1;
  hcan.Init.Prescaler = 6;
  hcan.Init.Mode = CAN_MODE_NORMAL;
  hcan.Init.SyncJumpWidth = CAN_SJW_1TQ;
  hcan.Init.TimeSeg1 = CAN_BS1_13TQ;
  hcan.Init.TimeSeg2 = CAN_BS2_2TQ;
  HAL_CAN_Init(&hcan);
}
```

---

> 📝 [在 GitHub 上编辑此页](https://github.com/your-org/developer-hub-docs/edit/main/docs/peripheral-drivers/can.md)
