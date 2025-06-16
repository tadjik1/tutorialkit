import type { I18n } from '@tutorialkit/types';
import { useEffect, useRef, type ComponentProps } from 'react';
import { Panel, PanelGroup, PanelResizeHandle, type ImperativePanelHandle } from 'react-resizable-panels';
import {
  CodeMirrorEditor,
  type EditorDocument,
  type OnChangeCallback as OnEditorChange,
  type OnScrollCallback as OnEditorScroll,
} from '../core/CodeMirrorEditor/index.js';
import { FileTree } from '../core/FileTree.js';
import type { Theme } from '../core/types.js';
import resizePanelStyles from '../styles/resize-panel.module.css';
import { isMobile } from '../utils/mobile.js';

const DEFAULT_FILE_TREE_SIZE = 25;

interface Props {
  theme: Theme;
  id: unknown;
  files: ComponentProps<typeof FileTree>['files'];
  i18n: I18n;
  hideRoot?: boolean;
  fileTreeScope?: string;
  showFileTree?: boolean;
  editorDocument?: EditorDocument;
  selectedFile?: string | undefined;
  allowEditPatterns?: ComponentProps<typeof FileTree>['allowEditPatterns'];
  onEditorChange?: OnEditorChange;
  onEditorScroll?: OnEditorScroll;
  onRunTestsClick?: () => void;
  onSubmitClick?: () => void;
  onFileSelect?: (value?: string) => void;
  onFileTreeChange?: ComponentProps<typeof FileTree>['onFileChange'];
}

export function EditorPanel({
  theme,
  id,
  files,
  i18n,
  hideRoot,
  fileTreeScope,
  showFileTree = true,
  editorDocument,
  selectedFile,
  allowEditPatterns,
  onRunTestsClick,
  onSubmitClick,
  onEditorChange,
  onEditorScroll,
  onFileSelect,
  onFileTreeChange,
}: Props) {
  const fileTreePanelRef = useRef<ImperativePanelHandle>(null);

  useEffect(() => {
    const { current: fileTreePanel } = fileTreePanelRef;

    if (!fileTreePanel) {
      return;
    }

    if (showFileTree) {
      if (fileTreePanel.isCollapsed()) {
        fileTreePanel.resize(DEFAULT_FILE_TREE_SIZE);
      }
    } else if (!showFileTree) {
      fileTreePanel.collapse();
    }
  }, [id]);

  return (
    <PanelGroup className="bg-tk-elements-panel-backgroundColor" direction="horizontal">
      <Panel className="flex flex-col" collapsible defaultSize={0} minSize={10} ref={fileTreePanelRef}>
        <div className="panel-header border-r border-b border-tk-elements-app-borderColor">
          <div className="panel-title">
            <div className="panel-icon i-ph-tree-structure-duotone shrink-0"></div>
            <span className="text-sm">{i18n.filesTitleText}</span>
          </div>
        </div>
        <FileTree
          className="flex flex-col flex-grow py-2 border-r border-tk-elements-app-borderColor text-sm overflow-y-auto overflow-x-hidden"
          i18n={i18n}
          selectedFile={selectedFile}
          hideRoot={hideRoot ?? true}
          files={files}
          scope={fileTreeScope}
          allowEditPatterns={allowEditPatterns}
          onFileSelect={onFileSelect}
          onFileChange={onFileTreeChange}
        />
      </Panel>
      <PanelResizeHandle
        disabled={!showFileTree}
        className={resizePanelStyles.PanelResizeHandle}
        hitAreaMargins={{ fine: 8, coarse: 8 }}
      />
      <Panel className="flex flex-col" defaultSize={100} minSize={10}>
        <FileTab
          i18n={i18n}
          editorDocument={editorDocument}
          onRunTestsClick={onRunTestsClick}
          onSubmitClick={onSubmitClick}
        />
        <div className="h-full flex-1 overflow-hidden">
          <CodeMirrorEditor
            className="h-full"
            theme={theme}
            id={id}
            doc={editorDocument}
            autoFocusOnDocumentChange={!isMobile()}
            onScroll={onEditorScroll}
            onChange={onEditorChange}
          />
        </div>
      </Panel>
    </PanelGroup>
  );
}

interface FileTabProps {
  i18n: I18n;
  editorDocument: EditorDocument | undefined;
  onRunTestsClick?: () => void;
  onSubmitClick?: () => void;
}

function FileTab({ i18n, editorDocument, onRunTestsClick, onSubmitClick }: FileTabProps) {
  const filePath = editorDocument?.filePath;
  const fileName = filePath?.split('/').at(-1) ?? '';
  const icon = fileName ? getFileIcon(fileName) : '';

  return (
    <div className="panel-header border-b border-tk-elements-app-borderColor flex justify-between">
      <div className="panel-title">
        <div className={`panel-icon scale-125 ${icon}`}></div>
        <span className="text-sm">{fileName}</span>
      </div>
      <div className="flex">
        <button onClick={onRunTestsClick} className="panel-button px-2 py-0.5 mr-1 -my-1">
          <div className="i-ph-play-circle-duotone text-lg" />
          Check solution
        </button>
        <button onClick={onSubmitClick} disabled={false} className="panel-button px-2 py-0.5 -my-1">
          <div className="i-ph-box-arrow-up-duotone text-lg" />
          Submit
        </button>
      </div>
    </div>
  );
}

function getFileIcon(fileName: string) {
  const extension = fileName.split('.').at(-1);

  if (!extension) {
    console.error('Cannot infer file type');
    return null;
  }

  switch (extension) {
    case 'ts': {
      return 'i-languages-ts?mask';
    }
    case 'cjs':
    case 'mjs':
    case 'js': {
      return 'i-languages-js?mask';
    }
    case 'html': {
      return 'i-languages-html?mask';
    }
    case 'css': {
      return 'i-languages-css?mask';
    }
    case 'scss':
    case 'sass': {
      return 'i-languages-sass?mask';
    }
    case 'md': {
      return 'i-languages-markdown?mask';
    }
    case 'json': {
      return 'i-languages-json?mask';
    }
    case 'gif':
    case 'jpg':
    case 'jpeg':
    case 'png': {
      return 'i-ph-image';
    }
    default: {
      return null;
    }
  }
}
