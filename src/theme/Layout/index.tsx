/**
 * Custom Layout Component
 * Implements three-column fixed layout:
 * - Left: 256px sidebar navigation
 * - Center: max 768px content area
 * - Right: 240px table of contents
 */

import React, {useEffect} from 'react';
import Layout from '@theme-original/Layout';
import type LayoutType from '@theme/Layout';
import type {WrapperProps} from '@docusaurus/types';
import {useLocation} from '@docusaurus/router';

type Props = WrapperProps<typeof LayoutType>;

export default function LayoutWrapper(props: Props): React.JSX.Element {
  const location = useLocation();

  useEffect(() => {
    const initSidebarCollapseButton = () => {
      const sidebarContainer = document.querySelector('.theme-doc-sidebar-container') as HTMLElement;
      if (!sidebarContainer) return;

      // 使用 Docusaurus 原生的收起按钮
      const nativeBtn = document.querySelector('.collapseSidebarButton_PEFL') as HTMLButtonElement;
      if (!nativeBtn) {
        console.log('未找到原生收起按钮');
        return;
      }

      console.log('找到原生收起按钮，绑定点击事件...');

      // 直接添加点击事件（不删除原有按钮）
      nativeBtn.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        console.log('原生按钮被点击！');
        
        const html = document.documentElement;
        const isCollapsed = html.classList.contains('sidebar-collapsed');
        console.log('当前状态 isCollapsed:', isCollapsed);
        
        if (isCollapsed) {
          // 展开侧边栏
          html.classList.remove('sidebar-collapsed');
          sidebarContainer.style.width = '280px';
          localStorage.setItem('sidebar-collapsed', 'false');
          console.log('展开侧边栏 - 宽度 280px');
        } else {
          // 收起侧边栏
          html.classList.add('sidebar-collapsed');
          sidebarContainer.style.width = '48px';
          localStorage.setItem('sidebar-collapsed', 'true');
          console.log('收起侧边栏 - 宽度 48px');
        }
      });

      // 初始化状态
      const savedState = localStorage.getItem('sidebar-collapsed');
      if (savedState === 'true') {
        document.documentElement.classList.add('sidebar-collapsed');
        sidebarContainer.style.width = '48px';
      }
    };

    setTimeout(() => {
      initSidebarCollapseButton();
    }, 100);
  }, [location.pathname]);

  return (
    <>
      <Layout {...props} />
    </>
  );
}
