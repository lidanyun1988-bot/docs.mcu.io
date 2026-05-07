import React, { useState } from 'react';
import styles from './styles.module.css';

export interface LiveDemoProps {
  title: string;
  children: React.ReactNode;
  description?: string;
  transparent?: boolean;
}

export function LiveDemo({ title, children, description, transparent = false }: LiveDemoProps) {
  return (
    <div className={`${styles.liveDemo} ${transparent ? styles.transparent : ''}`}>
      <div className={styles.demoBar}>
        <span className={styles.demoTitle}>{title}</span>
        {description && <span className={styles.demoDesc}>{description}</span>}
      </div>
      <div className={styles.demoBody}>
        {children}
      </div>
    </div>
  );
}

export interface ButtonDemoProps {
  variant?: 'primary' | 'outline' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  children: React.ReactNode;
  onClick?: () => void;
  icon?: string;
  loading?: boolean;
}

export function DemoButton({ 
  variant = 'primary', 
  size = 'md', 
  disabled = false,
  children,
  onClick,
  icon,
  loading = false
}: ButtonDemoProps) {
  const btnClass = [
    styles.btn,
    styles[`btn${variant.charAt(0).toUpperCase() + variant.slice(1)}`],
    styles[`btn${size.toUpperCase()}`],
    disabled ? styles.btnDisabled : '',
    loading ? styles.btnLoading : '',
  ].filter(Boolean).join(' ');

  return (
    <button 
      className={btnClass} 
      onClick={onClick}
      disabled={disabled || loading}
    >
      {loading && <span className={styles.btnSpinner} />}
      {icon && <i className={icon} aria-hidden="true" />}
      {children}
    </button>
  );
}

export interface BadgeDemoProps {
  variant?: 'default' | 'info' | 'success' | 'warning' | 'danger';
  children: React.ReactNode;
}

export function DemoBadge({ variant = 'default', children }: BadgeDemoProps) {
  const variantMap = {
    default: styles.badgeDefault,
    info: styles.badgeInfo,
    success: styles.badgeSuccess,
    warning: styles.badgeWarning,
    danger: styles.badgeDanger,
  };

  return (
    <span className={`${styles.badge} ${variantMap[variant]}`}>
      {children}
    </span>
  );
}
