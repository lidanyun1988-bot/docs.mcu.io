import type {SidebarsConfig} from '@docusaurus/plugin-content-docs';

const sidebars: SidebarsConfig = {
  docsSidebar: [
    {
      type: 'doc',
      id: 'index',
      label: '首页',
    },
    {
      type: 'doc',
      id: 'design-showcase',
      label: '设计系统展示',
    },
    {
      type: 'category',
      label: '一、快速入门',
      link: {
        type: 'doc',
        id: 'getting-started/index',
      },
      items: [
        'getting-started/overview',
        'getting-started/environment-setup',
        'getting-started/hello-world',
        'getting-started/gpio-blink',
      ],
    },
    {
      type: 'category',
      label: '二、产品系列',
      link: {
        type: 'doc',
        id: 'product-series/index',
      },
      items: [
        'product-series/cortex-m0',
        'product-series/cortex-m3',
        'product-series/cortex-m4',
        'product-series/cortex-m7',
      ],
    },
    {
      type: 'category',
      label: '三、外设驱动',
      link: {
        type: 'doc',
        id: 'peripheral-drivers/index',
      },
      items: [
        'peripheral-drivers/gpio',
        'peripheral-drivers/usart',
        'peripheral-drivers/spi',
        'peripheral-drivers/i2c',
        'peripheral-drivers/adc',
        'peripheral-drivers/dac',
        'peripheral-drivers/tim',
        'peripheral-drivers/pwm',
        'peripheral-drivers/rtc',
        'peripheral-drivers/wdg',
        'peripheral-drivers/dma',
        'peripheral-drivers/can',
        'peripheral-drivers/usb',
        'peripheral-drivers/sdio',
      ],
    },
    {
      type: 'category',
      label: '四、迁移指南',
      link: {
        type: 'doc',
        id: 'migration-guide/index',
      },
      items: [
        'migration-guide/stm32f103-to-xx32f103',
        'migration-guide/stm32f407-to-xx32f407',
        'migration-guide/peripheral-comparison',
      ],
    },
    {
      type: 'category',
      label: '五、常见问题 FAQ',
      link: {
        type: 'doc',
        id: 'faq/index',
      },
      items: [
        'faq/hardware',
        'faq/software',
        'faq/compatibility',
        'faq/purchase',
      ],
    },
    {
      type: 'category',
      label: '六、设计系统',
      link: {
        type: 'doc',
        id: 'design-system-guide',
      },
      items: [
        'design-system-guide',
        'test-components',
        'design-system-components',
      ],
    },
  ],
};

export default sidebars;
