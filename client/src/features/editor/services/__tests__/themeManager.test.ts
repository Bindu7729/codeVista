import { describe, it, expect } from 'vitest';
import { createGlassmorphicEditorTheme } from '../themeManager';

describe('Editor Theme Manager', () => {
  it('generates compliant Monaco editor dark theme specification', () => {
    const theme = createGlassmorphicEditorTheme('codevista-midnight');
    expect(theme.name).toBe('codevista-midnight');
    expect(theme.base).toBe('vs-dark');
    expect(theme.colors['editor.background']).toBe('#0f172a');
    expect(theme.rules.some(r => r.token === 'keyword')).toBe(true);
  });
});
