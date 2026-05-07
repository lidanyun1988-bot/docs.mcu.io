import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

const config: Config = {
  title: 'MCU 开发者中心',
  tagline: 'MCU 独立开发者文档站 - 开源、开放、可协作',
  favicon: 'img/favicon.ico',

  // future.v4 会自动启用 Rspack/Faster，CI Linux 环境缺少原生绑定
  // 暂时关闭，等 Rspack Linux 兼容性稳定后再开启
  // future: {
  //   v4: true,
  // },

  // faster 字段不被识别，已移除
  url: 'https://glidanyun1988-bot.github.io',
  baseUrl: '/docs.mcu.io/',

  organizationName: 'glidanyun1988-bot',
  projectName: 'docs.mcu.io',

  onBrokenLinks: 'throw',

  i18n: {
    defaultLocale: 'zh-CN',
    locales: ['zh-CN'],
  },

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
          editUrl: 'https://lidanyun1988-bot.github.io/docs.mcu.io/docs/',
          showLastUpdateTime: false,
          showLastUpdateAuthor: false,
          sidebarCollapsible: true,
        },
        blog: false,
        theme: {
          customCss: ['./src/css/custom.css', './src/css/design-system.css'],
        },
        sitemap: {
          changefreq: 'weekly',
          priority: 0.5,
          ignorePatterns: ['/tags/**'],
          filename: 'sitemap.xml',
        },
      } satisfies Preset.Options,
    ],
  ],

  themes: [
    [
      require.resolve('@easyops-cn/docusaurus-search-local'),
      {
        hashed: true,
        language: ['en'],
        highlightSearchTermsOnTargetPage: true,
        explicitSearchResultPath: true,
        searchResultLimits: 10,
        searchResultContextMaxLength: 50,
      },
    ],
  ],

  themeConfig: {
    image: 'img/docusaurus-social-card.jpg',
    
    colorMode: {
      defaultMode: 'light',
      disableSwitch: false,
      respectPrefersColorScheme: true,
    },

    navbar: {
      title: 'XX32 MCU Developer Hub',
      logo: {
        alt: 'XX32 MCU Logo',
        src: 'img/logo.svg',
      },
      items: [
        {
          type: 'docSidebar',
          sidebarId: 'docsSidebar',
          position: 'left',
          label: '文档',
        },
        {
          href: 'https://github.com/your-org/developer-hub-docs',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },

    footer: {
      style: 'dark',
      links: [
        {
          title: '文档',
          items: [
            {
              label: '快速入门',
              to: '/docs/getting-started',
            },
            {
              label: '产品系列',
              to: '/docs/product-series',
            },
            {
              label: '外设驱动',
              to: '/docs/peripheral-drivers',
            },
            {
              label: '迁移指南',
              to: '/docs/migration-guide',
            },
            {
              label: 'FAQ',
              to: '/docs/faq',
            },
          ],
        },
        {
          title: '社区',
          items: [
            {
              label: 'GitHub',
              href: 'https://github.com/your-org/developer-hub-docs',
            },
            {
              label: 'Issues',
              href: 'https://github.com/your-org/developer-hub-docs/issues',
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} XX32 MCU Developer Hub. Built with Docusaurus.`,
    },

    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
      additionalLanguages: ['c', 'bash', 'diff'],
    },

    docs: {
      sidebar: {
        hideable: true,
        autoCollapseCategories: true,
      },
    },
  } satisfies Preset.ThemeConfig,

  headTags: [
    {
      tagName: 'meta',
      attributes: {
        name: 'robots',
        content: 'index, follow',
      },
    },
    {
      tagName: 'meta',
      attributes: {
        name: 'og:type',
        content: 'website',
      },
    },
    {
      tagName: 'meta',
      attributes: {
        name: 'og:site_name',
        content: 'XX32 MCU Developer Hub',
      },
    },
  ],

  scripts: [
    {
      src: 'https://plausible.io/js/script.js',
      defer: true,
      'data-domain': 'docs.yoursite.com',
    },
  ],
};

export default config;
