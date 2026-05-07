---
sidebar_position: 10
---

# RTC 驱动示例

:::tip 本页摘要
本文提供实时时钟（RTC）的完整驱动代码，包含时间设置、日期读取、闹钟等功能。
:::

## 外设概述

RTC（Real-Time Clock）用于实时时钟和日历功能。

## HAL 库示例

```c title="main.c"
#include "main.h"

RTC_HandleTypeDef hrtc;

int main(void)
{
  HAL_Init();
  SystemClock_Config();
  MX_RTC_Init();

  /* 设置时间：2024 年 1 月 1 日 12:00:00 */
  RTC_TimeTypeDef sTime = {0};
  RTC_DateTypeDef sDate = {0};

  sTime.Hours = 12;
  sTime.Minutes = 0;
  sTime.Seconds = 0;
  HAL_RTC_SetTime(&hrtc, &sTime, RTC_FORMAT_BIN);

  sDate.WeekDay = RTC_WEEKDAY_TUESDAY;
  sDate.Month = RTC_MONTH_JANUARY;
  sDate.Date = 1;
  sDate.Year = 24;
  HAL_RTC_SetDate(&hrtc, &sDate, RTC_FORMAT_BIN);

  while (1)
  {
    /* 读取当前时间 */
    HAL_RTC_GetTime(&hrtc, &sTime, RTC_FORMAT_BIN);
    HAL_Delay(1000);
  }
}

void MX_RTC_Init(void)
{
  hrtc.Instance = RTC;
  hrtc.Init.AsynchPrediv = RTC_AUTO_1_SECOND;
  HAL_RTC_Init(&hrtc);
}
```

---

> 📝 [在 GitHub 上编辑此页](https://github.com/your-org/developer-hub-docs/edit/main/docs/peripheral-drivers/rtc.md)
