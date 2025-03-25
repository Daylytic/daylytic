import React, {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";

export const blockTypeToBlockName = {
  bullet: 'Bulleted List',
  check: 'Check List',
  code: 'Code Block',
  h1: 'Heading 1',
  h2: 'Heading 2',
  h3: 'Heading 3',
  h4: 'Heading 4',
  h5: 'Heading 5',
  h6: 'Heading 6',
  number: 'Numbered List',
  paragraph: 'Normal',
  quote: 'Quote',
};

const INITIAL_TOOLBAR_STATE = {
  blockType: 'paragraph' as keyof typeof blockTypeToBlockName,
  canRedo: false,
  canUndo: false,
  codeLanguage: '',
  isBold: false,
  isCode: false,
  isItalic: false,
  isLink: false,
  isStrikethrough: false,
  isUnderline: false,
};

type ToolbarState = typeof INITIAL_TOOLBAR_STATE;

type ToolbarStateKey = keyof ToolbarState;
type ToolbarStateValue<Key extends ToolbarStateKey> = ToolbarState[Key];

type ContextShape = {
  toolbarState: ToolbarState;
  updateToolbarState<Key extends ToolbarStateKey>(
    key: Key,
    value: ToolbarStateValue<Key>,
  ): void;
};

const Context = createContext<ContextShape | undefined>(undefined);

interface ToolbarContextProps {
  children: ReactNode;
}

export const ToolbarContext = ({
  children,
}: ToolbarContextProps): JSX.Element => {
  const [toolbarState, setToolbarState] = useState(INITIAL_TOOLBAR_STATE);

  const updateToolbarState = useCallback(
    <Key extends ToolbarStateKey>(key: Key, value: ToolbarStateValue<Key>) => {
      setToolbarState((prev) => ({
        ...prev,
        [key]: value,
      }));
    },
    [],
  );

  const contextValue = useMemo(() => {
    return {
      toolbarState,
      updateToolbarState,
    };
  }, [toolbarState, updateToolbarState]);

  return <Context.Provider value={contextValue}>{children}</Context.Provider>;
};

export const useToolbarState = () => {
  const context = useContext(Context);

  if (context === undefined) {
    throw new Error('useToolbarState must be used within a ToolbarProvider');
  }

  return context;
};