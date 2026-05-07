import React from 'react';
import styles from './styles.module.css';

export interface ColorTokenProps {
  name: string;
  description: string;
  cssVar: string;
  hexValue?: string;
}

export interface ColorTokenTableProps {
  tokens: ColorTokenProps[];
  showHex?: boolean;
}

export function ColorTokenTable({ tokens, showHex = false }: ColorTokenTableProps) {
  return (
    <div className={styles.colorTokenTable}>
      {tokens.map((token, index) => (
        <div key={index} className={styles.tokenRow}>
          <div 
            className={styles.tokenSwatch} 
            style={{ 
              background: `var(${token.cssVar})`,
              border: '0.5px solid var(--color-border-secondary)'
            }} 
          />
          <div className={styles.tokenInfo}>
            <code className={styles.tokenName}>{token.cssVar}</code>
            {showHex && token.hexValue && (
              <span className={styles.tokenHex}>{token.hexValue}</span>
            )}
            <span className={styles.tokenDesc}>{token.description}</span>
          </div>
        </div>
      ))}
    </div>
  );
}
