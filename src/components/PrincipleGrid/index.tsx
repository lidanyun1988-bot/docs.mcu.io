import React from 'react';
import styles from './styles.module.css';

export interface PrincipleCardProps {
  icon: string;
  title: string;
  description: string;
}

export interface PrincipleGridProps {
  cards: PrincipleCardProps[];
  columns?: 2 | 3 | 4;
}

export function PrincipleGrid({ cards, columns = 2 }: PrincipleGridProps) {
  return (
    <div className={styles.principleGrid} style={{ gridTemplateColumns: `repeat(${columns}, 1fr)` }}>
      {cards.map((card, index) => (
        <div key={index} className={styles.principleCard}>
          <div className={styles.principleIcon}>{card.icon}</div>
          <div className={styles.principleTitle}>{card.title}</div>
          <div className={styles.principleText}>{card.description}</div>
        </div>
      ))}
    </div>
  );
}
