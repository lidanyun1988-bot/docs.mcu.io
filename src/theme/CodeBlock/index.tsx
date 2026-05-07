/**
 * Custom CodeBlock Component
 * Adds toolbar with language label and copy button
 */

import React, { useState, useCallback } from 'react';
import CodeBlock from '@theme-original/CodeBlock';
import type CodeBlockType from '@theme/CodeBlock';
import type { WrapperProps } from '@docusaurus/types';

type Props = WrapperProps<typeof CodeBlockType>;

export default function CodeBlockWrapper(props: Props): JSX.Element {
  const [isCopied, setIsCopied] = useState(false);
  const [codeText, setCodeText] = useState('');

  // Extract language from className
  const language = props.className?.match(/language-(\w+)/)?.[1] || 'code';

  // Handle copy to clipboard
  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(codeText);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  }, [codeText]);

  return (
    <div className="theme-code-block-wrapper">
      <div className="theme-code-block-header">
        <span className="theme-code-block-language">{language}</span>
        <button
          className={`theme-code-block-copy-btn ${isCopied ? 'copied' : ''}`}
          onClick={handleCopy}
          aria-label={isCopied ? '已复制' : '复制代码'}
        >
          {isCopied ? '已复制 ✓' : '复制'}
        </button>
      </div>
      <div
        ref={(el) => {
          if (el) {
            const codeEl = el.querySelector('code');
            if (codeEl) {
              setCodeText(codeEl.textContent || '');
            }
          }
        }}
      >
        <CodeBlock {...props} />
      </div>
    </div>
  );
}
