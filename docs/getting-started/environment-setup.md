---
sidebar_position: 2
---

# 环境搭建

:::tip 本页摘要
本文详细介绍 XX32 MCU 开发环境的完整搭建流程，包括 STM32CubeIDE 安装、工具链配置、驱动程序安装和项目模板导入，适用于 Windows 平台。
:::

## 概述

XX32 MCU 支持多种开发环境，本文以 STM32CubeIDE 为例进行说明。您也可以选择 Keil MDK 或 IAR EWARM。

## 步骤一：下载 STM32CubeIDE

### 1. 访问官网

前往 [STMicroelectronics 官网](https://www.st.com/en/development-tools/stm32cubeide.html) 下载最新版本。

### 2. 选择版本

- **Windows**: 下载 `.exe` 安装程序
- **Linux**: 下载 `.sh` 安装脚本
- **macOS**: 下载 `.dmg` 镜像

推荐下载包含工具链的完整安装包。

## 步骤二：安装 STM32CubeIDE

### Windows 安装步骤

1. 双击运行下载的安装程序
2. 接受许可协议
3. 选择安装路径（建议默认：`C:\ST\STM32CubeIDE v1.xx`）
4. 选择要安装的组件：
   - ✅ STM32CubeIDE
   - ✅ STM32CubeMX（图形化配置工具）
   - ✅ 工具链（GNU Arm Embedded Toolchain）
5. 点击"Install"开始安装
6. 安装完成后勾选"Launch STM32CubeIDE"

## 步骤三：安装驱动程序

### ST-Link 驱动

ST-Link 是常用的调试器，需要安装驱动程序：

1. 连接 ST-Link 到电脑
2. 打开设备管理器，找到未识别的设备
3. 右键 → 更新驱动程序
4. 选择驱动位置：`C:\ST\STM32CubeIDE v1.xx\drivers`
5. 完成安装

验证安装：
```bash
# 打开设备管理器，应看到"ST-LINK/V2"设备
```

### 串口驱动（CH340/CP2102）

如使用 USB 转串口模块，需要安装对应驱动：

- **CH340**: [下载链接](http://www.wch.cn/downloads/CH341SER_ZIP.html)
- **CP2102**: [下载链接](https://www.silabs.com/developers/usb-to-uart-bridge-vcp-drivers)

## 步骤四：导入项目模板

### 1. 创建新项目

1. 启动 STM32CubeIDE
2. File → New → STM32 Project
3. 搜索目标芯片型号（如 XX32F103C8）
4. 选择芯片，点击"Next"
5. 输入项目名称（如 `HelloWorld`）
6. 点击"Finish"

### 2. 使用 CubeMX 配置

在 CubeMX 图形界面中配置：

- **System Core**: RCC、SYS（调试接口）
- **Connectivity**: USART、SPI、I2C 等
- **Clock Configuration**: 设置系统时钟
- **Project Manager**: 选择工具链和 IDE

配置完成后点击"Project → Generate Code"。

## 步骤五：验证安装

### 1. 创建简单测试

在 `main.c` 的 `main()` 函数中添加：

```c
int main(void)
{
  HAL_Init();
  SystemClock_Config();
  
  // 初始化 LED 引脚
  __HAL_RCC_GPIOA_CLK_ENABLE();
  GPIO_InitTypeDef GPIO_InitStruct = {0};
  GPIO_InitStruct.Pin = GPIO_PIN_5;
  GPIO_InitStruct.Mode = GPIO_MODE_OUTPUT_PP;
  GPIO_InitStruct.Pull = GPIO_NOPULL;
  GPIO_InitStruct.Speed = GPIO_SPEED_FREQ_LOW;
  HAL_GPIO_Init(GPIOA, &GPIO_InitStruct);
  
  while (1)
  {
    HAL_GPIO_TogglePin(GPIOA, GPIO_PIN_5);
    HAL_Delay(500);
  }
}
```

### 2. 编译项目

点击"Project → Build All"或按 `Ctrl+B`。

查看控制台输出，应显示：
```
Build Complete.
0 Errors, 0 Warnings.
```

### 3. 下载程序

1. 连接开发板和调试器
2. 点击"Run → Run"或按 `Ctrl+F11`
3. 选择调试器（ST-Link）
4. 程序将自动下载并运行

## 常见问题

### Q: 无法识别 ST-Link 设备？

A: 检查以下几点：
1. USB 线是否完好（使用数据线而非充电线）
2. 驱动是否正确安装
3. 尝试更换 USB 端口
4. 在设备管理器中查看是否有未知设备

### Q: 编译时报错找不到头文件？

A: 确保：
1. 项目已正确生成代码
2. Include 路径配置正确
3. 重启 IDE 重新加载项目

### Q: 下载失败？

A: 检查：
1. 调试器连接是否牢固
2. 目标板供电是否正常
3. SWD 接口配置是否正确（PA13/PA14）
4. 在调试配置中检查连接设置

## 下一步

环境搭建完成后，让我们开始 [Hello World 项目](/docs/getting-started/hello-world)！

---

> 📝 [在 GitHub 上编辑此页](https://github.com/your-org/developer-hub-docs/edit/main/docs/getting-started/environment-setup.md)
