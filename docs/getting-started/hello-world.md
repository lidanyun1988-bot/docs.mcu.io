---
sidebar_position: 3
---

# Hello World - LED 闪烁

:::tip 本页摘要
本文手把手教您创建第一个 XX32 MCU 项目，实现 LED 闪烁功能。涵盖项目创建、GPIO 配置、代码编写、编译下载全流程，约 50 行代码即可完成。
:::

## 项目目标

创建一个最简单的 LED 闪烁项目，让开发板上的 LED 灯以 1 秒间隔闪烁。

## 硬件准备

- XX32F103 开发板（或其他 XX32 系列）
- ST-Link 调试器
- USB 数据线

## 步骤一：创建新项目

### 1. 启动 STM32CubeIDE

双击桌面图标启动 IDE。

### 2. 新建项目

1. 点击 **File → New → STM32 Project**
2. 在搜索框输入芯片型号，如 `XX32F103C8`
3. 选择正确的芯片型号
4. 点击 **Next**
5. 输入项目名称：`HelloWorld_LED`
6. 选择项目位置
7. 点击 **Finish**

## 步骤二：配置 GPIO

### 1. 打开 Pinout 视图

项目创建后会自动打开 CubeMX 配置界面。

### 2. 配置 LED 引脚

假设 LED 连接到 **PA5**（多数开发板都是这个引脚）：

1. 在芯片图上找到 **PA5** 引脚
2. 点击 PA5，选择 **GPIO_Output**
3. 在左侧 **System Core → GPIO** 中查看配置：
   - **GPIO mode**: GPIO Output
   - **GPIO Output level**: Low
   - **GPIO Output type**: Push-Pull
   - **GPIO Pull-up/Pull-down**: No pull-up and no pull-down
   - **Maximum output speed**: Low speed

### 3. 配置调试接口

1. 点击 **SYS**（在 System Core 下）
2. **Debug** 选择 **Serial Wire**（这会释放 PA13/PA14 用于调试）

### 4. 配置时钟

1. 点击 **RCC**
2. **High Speed Clock (HSE)** 选择 **Crystal/Ceramic Resonator**
3. 点击 **Clock Configuration** 标签页
4. 设置 **HCLK** 为 72MHz（F103 最高频率）
5. 按 `Enter` 确认，系统会自动配置 PLL

### 5. 生成代码

点击 **Project → Generate Code**（或按 `Ctrl+S`）

选择：
- **Toolchain/IDE**: STM32CubeIDE
- 点击 **OK**

## 步骤三：编写代码

### 1. 打开 main.c

在 Project Explorer 中展开：
```
HelloWorld_LED
├── Core
│   ├── Inc
│   └── Src
│       └── main.c  ← 打开这个文件
```

### 2. 添加 LED 控制代码

在 `main()` 函数的 `while(1)` 循环中添加代码：

```c
/* USER CODE BEGIN While */
while (1)
{
  // 翻转 LED 状态
  HAL_GPIO_TogglePin(GPIOA, GPIO_PIN_5);
  
  // 延时 500ms
  HAL_Delay(500);
}
/* USER CODE END While */
```

完整代码示例：

```c title="main.c"
/* USER CODE BEGIN Includes */
#include "main.h"
/* USER CODE END Includes */

/* USER CODE BEGIN PV */
/* USER CODE END PV */

/* USER CODE BEGIN Private defines */
/* USER CODE END Private defines */

void SystemClock_Config(void);
static void MX_GPIO_Init(void);

int main(void)
{
  /* MCU Configuration--------------------------------------------------------*/
  HAL_Init();
  SystemClock_Config();
  MX_GPIO_Init();

  /* USER CODE BEGIN 2 */
  /* USER CODE END 2 */

  /* Infinite loop */
  /* USER CODE BEGIN WHILE */
  while (1)
  {
    // 翻转 LED 状态
    HAL_GPIO_TogglePin(GPIOA, GPIO_PIN_5);
    
    // 延时 500ms
    HAL_Delay(500);
    
    /* USER CODE END WHILE */

    /* USER CODE BEGIN 3 */
  }
  /* USER CODE END 3 */
}
```

## 步骤四：编译项目

### 1. 编译代码

点击 **Project → Build All** 或按 `Ctrl+B`

### 2. 查看编译结果

在 Console 窗口查看输出：
```
Building file: ../Core/Src/main.c
Invoking: MCU GCC Compiler
...
Build Complete.
0 Errors, 0 Warnings.
```

如有错误，请检查：
- 代码语法是否正确
- 头文件是否包含完整
- 引脚配置是否与代码一致

## 步骤五：下载程序

### 1. 连接硬件

1. 将 ST-Link 连接到开发板的 SWD 接口：
   - **SWDIO** → **PA13**
   - **SWCLK** → **PA14**
   - **GND** → **GND**
   - **3.3V** → **3.3V**（如开发板无独立供电）
2. ST-Link 另一端连接电脑 USB

### 2. 下载程序

1. 点击 **Run → Run** 或按 `Ctrl+F11`
2. 首次运行会弹出调试配置对话框
3. 选择 **ST-LINK** 作为调试器
4. 点击 **OK**

### 3. 观察结果

程序下载后会自动运行，您应该看到：
- LED 灯开始闪烁（亮 0.5 秒，灭 0.5 秒）
- Console 显示调试信息

## 代码解析

### HAL_GPIO_TogglePin

```c
void HAL_GPIO_TogglePin(GPIO_TypeDef* GPIOx, uint16_t GPIO_Pin)
```

**功能**: 翻转指定 GPIO 引脚的输出电平

**参数**:
- `GPIOx`: GPIO 端口（如 GPIOA、GPIOB）
- `GPIO_Pin`: GPIO 引脚号（如 GPIO_PIN_5）

**示例**:
```c
// 翻转 PA5 引脚电平
HAL_GPIO_TogglePin(GPIOA, GPIO_PIN_5);
```

### HAL_Delay

```c
void HAL_Delay(uint32_t Delay)
```

**功能**: 延时指定毫秒数

**参数**:
- `Delay`: 延时时间（单位：ms）

**原理**: 基于 SysTick 定时器实现精确延时

## 扩展实验

### 1. 改变闪烁频率

修改延时时间：
```c
HAL_Delay(1000);  // 1 秒间隔
```

### 2. 使用多个 LED

如果有多个 LED，可以依次控制：
```c
while (1)
{
  HAL_GPIO_WritePin(GPIOA, GPIO_PIN_5, GPIO_PIN_SET);   // LED1 亮
  HAL_Delay(200);
  HAL_GPIO_WritePin(GPIOA, GPIO_PIN_5, GPIO_PIN_RESET); // LED1 灭
  HAL_Delay(200);
  
  HAL_GPIO_WritePin(GPIOB, GPIO_PIN_13, GPIO_PIN_SET);  // LED2 亮
  HAL_Delay(200);
  HAL_GPIO_WritePin(GPIOB, GPIO_PIN_13, GPIO_PIN_RESET);// LED2 灭
  HAL_Delay(200);
}
```

### 3. 呼吸灯效果

使用 PWM 可以实现呼吸灯，详见 [PWM 驱动示例](/docs/peripheral-drivers/pwm)。

## 常见问题

### Q: LED 不亮？

A: 检查以下几点：
1. LED 引脚配置是否正确（PA5 还是其他引脚）
2. LED 极性是否正确（高电平点亮还是低电平点亮）
3. GPIO 是否已初始化
4. 程序是否成功下载

### Q: LED 常亮不闪烁？

A: 可能原因：
1. 代码未正确下载到 Flash
2. 程序卡在某个地方（如中断）
3. 时钟配置有问题
4. 重新编译并下载

### Q: 编译报错"undefined reference"？

A: 确保：
1. 所有代码写在 `/* USER CODE BEGIN */` 和 `/* USER CODE END */` 之间
2. 头文件包含完整
3. 重新生成代码（Project → Generate Code）

## 下一步

恭喜完成第一个项目！接下来学习 [GPIO 深入使用](/docs/getting-started/gpio-blink)，包括按键检测和中断处理。

---

> 📝 [在 GitHub 上编辑此页](https://github.com/your-org/developer-hub-docs/edit/main/docs/getting-started/hello-world.md)
