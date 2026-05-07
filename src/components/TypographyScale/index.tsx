import React from 'react';
import styles from './styles.module.css';

export interface TypeLevelProps {
  size: string;
  weight: number;
  lineHeight: number;
  label: string;
  description?: string;
  sample?: string;
}

export interface TypographyScaleProps {
  levels?: TypeLevelProps[];
  showSpecs?: boolean;
}

const defaultTypeLevels: TypeLevelProps[] = [
  { size: '22px', weight: 700, lineHeight: 1.4, label: '页面主标题', description: 'Page Title' },
  { size: '18px', weight: 600, lineHeight: 1.5, label: '区块标题', description: 'Section Heading' },
  { size: '16px', weight: 500, lineHeight: 1.6, label: '小节标题', description: 'Subsection' },
  { size: '14px', weight: 400, lineHeight: 1.7, label: '正文', description: 'Body' },
  { size: '13px', weight: 400, lineHeight: 1.7, label: '辅助文本', description: 'Secondary' },
  { size: '12px', weight: 400, lineHeight: 1.5, label: '注释文本', description: 'Caption' },
  { size: '11px', weight: 500, lineHeight: 1.4, label: 'LABEL', description: '分组标题、表头' },
];

export function TypographyScale({ levels = defaultTypeLevels, showSpecs = true }: TypographyScaleProps) {
  return (
    <div className={styles.typographyScale}>
      {levels.map((level, index) => (
        <div key={index} className={styles.typeRow}>
          {showSpecs && (
            <span className={styles.typeSpec}>
              {level.size} / {level.weight} / {level.lineHeight}
            </span>
          )}
          <span 
            className={styles.typeSample}
            style={{ 
              fontSize: level.size, 
              fontWeight: level.weight,
              lineHeight: level.lineHeight
            }}
          >
            {level.sample || level.label}
            {level.description && <span className={styles.typeDesc}> {level.description}</span>}
          </span>
        </div>
      ))}
    </div>
  );
}
