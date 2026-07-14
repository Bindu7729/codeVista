export interface MonacoEditorTheme {
  name: string;
  base: 'vs' | 'vs-dark';
  inherit: boolean;
  rules: { token: string; foreground: string; fontStyle?: string }[];
  colors: Record<string, string>;
}

export function createGlassmorphicEditorTheme(name: string = 'codevista-dark'): MonacoEditorTheme {
  return {
    name,
    base: 'vs-dark',
    inherit: true,
    rules: [
      { token: 'comment', foreground: '6272a4', fontStyle: 'italic' },
      { token: 'keyword', foreground: 'ff79c6', fontStyle: 'bold' },
      { token: 'string', foreground: 'f1fa8c' },
      { token: 'number', foreground: 'bd93f9' }
    ],
    colors: {
      'editor.background': '#0f172a',
      'editor.foreground': '#f8fafc',
      'editorLineNumber.foreground': '#475569',
      'editorCursor.foreground': '#38bdf8'
    }
  };
}
