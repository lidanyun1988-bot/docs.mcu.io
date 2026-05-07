import React from 'react';
import styles from './styles.module.css';

export interface SpacingValueProps {
  px: number;
  description: string;
  label?: string;
}

export interface SpacingRulerProps {
  values?: SpacingValueProps[];
  color?: string;
}

const defaultSpacingValues: SpacingValueProps[] = [
  { px: 4, description: '图标与文字间距，徽标内边距' },
  { px: 8, description: '紧凑组件内间距，按钮图标间距' },
  { px: 12, description: '列表项间距，表单控件间距' },
  { px: 16, description: '卡片内边距（默认），区块内垂直间距' },
  { px: 24, description: '区块之间的间距' },
  { px: 32, description: '大区块分隔，章节间距' },
  { px: 48, description: '页面顶部间距，主要功能区分隔' },
];

export function SpacingRuler({ values = defaultSpacingValues, color }: SpacingRulerProps) {
  const barColor = color || 'var(--color-background-info, var(--ifm-color-primary))';
  
  return (
    <div className={styles.spacingRuler}>
      {values.map((item) => (
        <div key={item.px} className={styles.spaceRow}>
          <div 
            className={styles.spaceBar} 
            style={{ 
              width: item.px,
              background: barColor
            }} 
          />
          <span className={styles.spaceLabel}>{item.px}px</span>
          <span className={styles.spaceDesc}>{item.description}</span>
        </div>
      ))}
    </div>
  );
}
