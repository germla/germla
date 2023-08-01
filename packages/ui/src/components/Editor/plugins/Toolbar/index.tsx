import type { LexicalEditor, NodeKey } from "lexical";
import { Bold, Italic, Underline } from "lucide-react";
import {
  $createCodeNode,
  $isCodeNode,
  CODE_LANGUAGE_FRIENDLY_NAME_MAP,
  CODE_LANGUAGE_MAP,
  getLanguageFriendlyName,
} from "@lexical/code";
import { $isLinkNode, TOGGLE_LINK_COMMAND } from "@lexical/link";
import {
  $isListNode,
  INSERT_CHECK_LIST_COMMAND,
  INSERT_ORDERED_LIST_COMMAND,
  INSERT_UNORDERED_LIST_COMMAND,
  ListNode,
  REMOVE_LIST_COMMAND,
} from "@lexical/list";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { $isDecoratorBlockNode } from "@lexical/react/LexicalDecoratorBlockNode";
import type { HeadingTagType } from "@lexical/rich-text";
import {
  $createHeadingNode,
  $createQuoteNode,
  $isHeadingNode,
  $isQuoteNode,
} from "@lexical/rich-text";
import {
  $getSelectionStyleValueForProperty,
  $patchStyleText,
  $setBlocksType,
} from "@lexical/selection";
import {
  $findMatchingParent,
  $getNearestBlockElementAncestorOrThrow,
  $getNearestNodeOfType,
  mergeRegister,
} from "@lexical/utils";
import { useCallback, useEffect, useState } from "react";
import {
  $createParagraphNode,
  $getNodeByKey,
  $getSelection,
  $isRangeSelection,
  $isRootOrShadowRoot,
  $isTextNode,
  CAN_REDO_COMMAND,
  CAN_UNDO_COMMAND,
  COMMAND_PRIORITY_CRITICAL,
  COMMAND_PRIORITY_NORMAL,
  DEPRECATED_$isGridSelection,
  FORMAT_TEXT_COMMAND,
  KEY_MODIFIER_COMMAND,
  REDO_COMMAND,
  SELECTION_CHANGE_COMMAND,
  UNDO_COMMAND,
} from "lexical";
// import * as React from 'react';
// import {
//   INSERT_IMAGE_COMMAND,
//   InsertImageDialog,
//   InsertImagePayload,
// } from '../ImagesPlugin';
// import {InsertInlineImageDialog} from '../InlineImagePlugin';
// import {InsertPollDialog} from '../PollPlugin';
// import {InsertNewTableDialog, InsertTableDialog} from '../TablePlugin';
import { getSelectedNode } from "../../utils/getSelectedNode";
import { sanitizeUrl } from "@braintree/sanitize-url";
import { Button, buttonVariants } from "../../../Button";
import { ArrowUturnLeftIcon, ArrowUturnRightIcon } from "@heroicons/react/24/outline";
import { Tooltip } from "../../../Tooltip";
import { IS_APPLE } from "../../utils/device";
import clsx from "clsx";
import { Separator } from "../../../Separator";
import { Dropdown } from "../../../Dropdown";

const blocks = {
  bullet: "Bulleted List",
  check: "Check List",
  code: "Code Block",
  h1: "Heading 1",
  h2: "Heading 2",
  h3: "Heading 3",
  h4: "Heading 4",
  h5: "Heading 5",
  h6: "Heading 6",
  number: "Numbered List",
  paragraph: "Normal",
  quote: "Quote",
};

const roots = {
  root: "Root",
  table: "Table",
};

function getCodeLanguageOptions(): [string, string][] {
  const options: [string, string][] = [];

  for (const [lang, friendlyName] of Object.entries(CODE_LANGUAGE_FRIENDLY_NAME_MAP)) {
    options.push([lang, friendlyName]);
  }

  return options;
}

const CODE_LANGUAGE_OPTIONS = getCodeLanguageOptions();

function dropDownActiveClass(active: boolean) {
  if (active) return "active bg-zinc-100";
  else return "";
}

function BlockFormatDropDown({
  editor,
  blockType,
  rootType,
  disabled = false,
}: {
  blockType: keyof typeof blocks;
  rootType: keyof typeof roots;
  editor: LexicalEditor;
  disabled?: boolean;
}): JSX.Element {
  const formatParagraph = () => {
    editor.update(() => {
      const selection = $getSelection();
      if ($isRangeSelection(selection) || DEPRECATED_$isGridSelection(selection)) {
        $setBlocksType(selection, () => $createParagraphNode());
      }
    });
  };

  const formatHeading = (headingSize: HeadingTagType) => {
    if (blockType !== headingSize) {
      editor.update(() => {
        const selection = $getSelection();
        if ($isRangeSelection(selection) || DEPRECATED_$isGridSelection(selection)) {
          $setBlocksType(selection, () => $createHeadingNode(headingSize));
        }
      });
    }
  };

  const formatBulletList = () => {
    if (blockType !== "bullet") {
      editor.dispatchCommand(INSERT_UNORDERED_LIST_COMMAND, undefined);
    } else {
      editor.dispatchCommand(REMOVE_LIST_COMMAND, undefined);
    }
  };

  const formatCheckList = () => {
    if (blockType !== "check") {
      editor.dispatchCommand(INSERT_CHECK_LIST_COMMAND, undefined);
    } else {
      editor.dispatchCommand(REMOVE_LIST_COMMAND, undefined);
    }
  };

  const formatNumberedList = () => {
    if (blockType !== "number") {
      editor.dispatchCommand(INSERT_ORDERED_LIST_COMMAND, undefined);
    } else {
      editor.dispatchCommand(REMOVE_LIST_COMMAND, undefined);
    }
  };

  const formatQuote = () => {
    if (blockType !== "quote") {
      editor.update(() => {
        const selection = $getSelection();
        if ($isRangeSelection(selection) || DEPRECATED_$isGridSelection(selection)) {
          $setBlocksType(selection, () => $createQuoteNode());
        }
      });
    }
  };

  const formatCode = () => {
    if (blockType !== "code") {
      editor.update(() => {
        let selection = $getSelection();

        if ($isRangeSelection(selection) || DEPRECATED_$isGridSelection(selection)) {
          if (selection.isCollapsed()) {
            $setBlocksType(selection, () => $createCodeNode());
          } else {
            const textContent = selection.getTextContent();
            const codeNode = $createCodeNode();
            selection.insertNodes([codeNode]);
            selection = $getSelection();
            if ($isRangeSelection(selection)) selection.insertRawText(textContent);
          }
        }
      });
    }
  };

  return (
    <Dropdown>
      <Dropdown.Trigger asChild>
        <Button
          aria-label="Formatting options for text style"
          variant="outline"
          disabled={disabled}
          className="border-none focus:outline-none">
          {roots[rootType]}
        </Button>
      </Dropdown.Trigger>
      <Dropdown.Content className="z-[9999]">
        <Dropdown.Item
          className={"hover:bg-zinc-200 " + dropDownActiveClass(blockType === "paragraph")}
          onClick={formatParagraph}>
          <i className="icon paragraph" />
          <span className="text">Normal</span>
        </Dropdown.Item>
        <Dropdown.Item
          className={"hover:bg-zinc-200 " + dropDownActiveClass(blockType === "h1")}
          onClick={() => formatHeading("h1")}>
          <i className="icon h1" />
          <span className="text">Heading 1</span>
        </Dropdown.Item>
        <Dropdown.Item
          className={"hover:bg-zinc-200 " + dropDownActiveClass(blockType === "h2")}
          onClick={() => formatHeading("h2")}>
          <i className="icon h2" />
          <span className="text">Heading 2</span>
        </Dropdown.Item>
        <Dropdown.Item
          className={"hover:bg-zinc-200 " + dropDownActiveClass(blockType === "h3")}
          onClick={() => formatHeading("h3")}>
          <i className="icon h3" />
          <span className="text">Heading 3</span>
        </Dropdown.Item>
        <Dropdown.Item
          className={"hover:bg-zinc-200 " + dropDownActiveClass(blockType === "bullet")}
          onClick={formatBulletList}>
          <i className="icon bullet-list" />
          <span className="text">Bullet List</span>
        </Dropdown.Item>
        <Dropdown.Item
          className={"hover:bg-zinc-200 " + dropDownActiveClass(blockType === "number")}
          onClick={formatNumberedList}>
          <i className="icon numbered-list" />
          <span className="text">Numbered List</span>
        </Dropdown.Item>
        <Dropdown.Item
          className={"hover:bg-zinc-200 " + dropDownActiveClass(blockType === "check")}
          onClick={formatCheckList}>
          <i className="icon check-list" />
          <span className="text">Check List</span>
        </Dropdown.Item>
        <Dropdown.Item
          className={"hover:bg-zinc-200 " + dropDownActiveClass(blockType === "quote")}
          onClick={formatQuote}>
          <i className="icon quote" />
          <span className="text">Quote</span>
        </Dropdown.Item>
        <Dropdown.Item
          className={"hover:bg-zinc-200 " + dropDownActiveClass(blockType === "code")}
          onClick={formatCode}>
          <i className="icon code" />
          <span className="text">Code Block</span>
        </Dropdown.Item>
      </Dropdown.Content>
    </Dropdown>
  );
}

export default function ToolbarPlugin(): JSX.Element {
  const [editor] = useLexicalComposerContext();
  const [activeEditor, setActiveEditor] = useState(editor);
  const [blockType, setBlockType] = useState<keyof typeof blocks>("paragraph");
  const [selectedElementKey, setSelectedElementKey] = useState<NodeKey | null>(null);
  const [fontColor, setFontColor] = useState<string>("#000");
  const [bgColor, setBgColor] = useState<string>("#fff");
  const [isLink, setIsLink] = useState(false);
  const [isBold, setIsBold] = useState(false);
  const [isItalic, setIsItalic] = useState(false);
  const [isUnderline, setIsUnderline] = useState(false);
  const [isStrikethrough, setIsStrikethrough] = useState(false);
  const [isSubscript, setIsSubscript] = useState(false);
  const [isSuperscript, setIsSuperscript] = useState(false);
  const [isCode, setIsCode] = useState(false);
  const [canUndo, setCanUndo] = useState(false);
  const [canRedo, setCanRedo] = useState(false);
  const [codeLanguage, setCodeLanguage] = useState<string>("");
  const [isEditable, setIsEditable] = useState(() => editor.isEditable());

  const $updateToolbar = useCallback(() => {
    const selection = $getSelection();
    if ($isRangeSelection(selection)) {
      const anchorNode = selection.anchor.getNode();
      let element =
        anchorNode.getKey() === "root"
          ? anchorNode
          : $findMatchingParent(anchorNode, (e) => {
              const parent = e.getParent();
              return parent !== null && $isRootOrShadowRoot(parent);
            });

      if (element === null) {
        element = anchorNode.getTopLevelElementOrThrow();
      }

      const elementKey = element.getKey();
      const elementDOM = activeEditor.getElementByKey(elementKey);

      // Update text format
      setIsBold(selection.hasFormat("bold"));
      setIsItalic(selection.hasFormat("italic"));
      setIsUnderline(selection.hasFormat("underline"));
      setIsStrikethrough(selection.hasFormat("strikethrough"));
      setIsSubscript(selection.hasFormat("subscript"));
      setIsSuperscript(selection.hasFormat("superscript"));
      setIsCode(selection.hasFormat("code"));

      // Update links
      const node = getSelectedNode(selection);
      const parent = node.getParent();
      if ($isLinkNode(parent) || $isLinkNode(node)) {
        setIsLink(true);
      } else {
        setIsLink(false);
      }

      if (elementDOM !== null) {
        setSelectedElementKey(elementKey);
        if ($isListNode(element)) {
          const parentList = $getNearestNodeOfType<ListNode>(anchorNode, ListNode);
          const type = parentList ? parentList.getListType() : element.getListType();
          setBlockType(type);
        } else {
          const type = $isHeadingNode(element) ? element.getTag() : element.getType();
          if (type in blocks) {
            setBlockType(type as keyof typeof blocks);
          }
          if ($isCodeNode(element)) {
            const language = element.getLanguage() as keyof typeof CODE_LANGUAGE_MAP;
            setCodeLanguage(language ? CODE_LANGUAGE_MAP[language] || language : "");
            return;
          }
        }
      }
      // Handle buttons
      setFontColor($getSelectionStyleValueForProperty(selection, "color", "#000"));
      setBgColor($getSelectionStyleValueForProperty(selection, "background-color", "#fff"));
    }
  }, [activeEditor]);

  useEffect(() => {
    return editor.registerCommand(
      SELECTION_CHANGE_COMMAND,
      (_payload, newEditor) => {
        $updateToolbar();
        setActiveEditor(newEditor);
        return false;
      },
      COMMAND_PRIORITY_CRITICAL
    );
  }, [editor, $updateToolbar]);

  useEffect(() => {
    return mergeRegister(
      editor.registerEditableListener((editable) => {
        setIsEditable(editable);
      }),
      activeEditor.registerUpdateListener(({ editorState }) => {
        editorState.read(() => {
          $updateToolbar();
        });
      }),
      activeEditor.registerCommand<boolean>(
        CAN_UNDO_COMMAND,
        (payload) => {
          setCanUndo(payload);
          return false;
        },
        COMMAND_PRIORITY_CRITICAL
      ),
      activeEditor.registerCommand<boolean>(
        CAN_REDO_COMMAND,
        (payload) => {
          setCanRedo(payload);
          return false;
        },
        COMMAND_PRIORITY_CRITICAL
      )
    );
  }, [$updateToolbar, activeEditor, editor]);

  useEffect(() => {
    return activeEditor.registerCommand(
      KEY_MODIFIER_COMMAND,
      (payload) => {
        const event: KeyboardEvent = payload;
        const { code, ctrlKey, metaKey } = event;

        if (code === "KeyK" && (ctrlKey || metaKey)) {
          event.preventDefault();
          return activeEditor.dispatchCommand(TOGGLE_LINK_COMMAND, sanitizeUrl("https://"));
        }
        return false;
      },
      COMMAND_PRIORITY_NORMAL
    );
  }, [activeEditor, isLink]);

  const applyStyleText = useCallback(
    (styles: Record<string, string>) => {
      activeEditor.update(() => {
        const selection = $getSelection();
        if ($isRangeSelection(selection)) {
          $patchStyleText(selection, styles);
        }
      });
    },
    [activeEditor]
  );

  const clearFormatting = useCallback(() => {
    activeEditor.update(() => {
      const selection = $getSelection();
      if ($isRangeSelection(selection)) {
        const anchor = selection.anchor;
        const focus = selection.focus;
        const nodes = selection.getNodes();

        if (anchor.key === focus.key && anchor.offset === focus.offset) {
          return;
        }

        nodes.forEach((node, idx) => {
          // We split the first and last node by the selection
          // So that we don't format unselected text inside those nodes
          if ($isTextNode(node)) {
            if (idx === 0 && anchor.offset !== 0) {
              node = node.splitText(anchor.offset)[1] || node;
            }
            if (idx === nodes.length - 1) {
              node = node.splitText(focus.offset)[0] || node;
            }

            if (node.__style !== "") {
              node.setStyle("");
            }
            if (node.__format !== 0) {
              node.setFormat(0);
              $getNearestBlockElementAncestorOrThrow(node).setFormat("");
            }
          } else if ($isHeadingNode(node) || $isQuoteNode(node)) {
            node.replace($createParagraphNode(), true);
          } else if ($isDecoratorBlockNode(node)) {
            node.setFormat("");
          }
        });
      }
    });
  }, [activeEditor]);

  const onFontColorSelect = useCallback(
    (value: string) => {
      applyStyleText({ color: value });
    },
    [applyStyleText]
  );

  const onBgColorSelect = useCallback(
    (value: string) => {
      applyStyleText({ "background-color": value });
    },
    [applyStyleText]
  );

  const insertLink = useCallback(() => {
    if (!isLink) {
      editor.dispatchCommand(TOGGLE_LINK_COMMAND, sanitizeUrl("https://"));
    } else {
      editor.dispatchCommand(TOGGLE_LINK_COMMAND, null);
    }
  }, [editor, isLink]);

  const onCodeLanguageSelect = useCallback(
    (value: string) => {
      activeEditor.update(() => {
        if (selectedElementKey !== null) {
          const node = $getNodeByKey(selectedElementKey);
          if ($isCodeNode(node)) {
            node.setLanguage(value);
          }
        }
      });
    },
    [activeEditor, selectedElementKey]
  );

  return (
    <div className="editor-toolbar">
      <Tooltip.Provider>
        <Tooltip>
          <Tooltip.Trigger
            title={`Undo ${IS_APPLE ? "⌘Z" : "Ctrl+Z"}`}
            aria-label={`Undo ${IS_APPLE ? "⌘Z" : "Ctrl+Z"}`}
            onClick={() => activeEditor.dispatchCommand(UNDO_COMMAND, undefined)}
            disabled={!canUndo || !isEditable}
            className={clsx(buttonVariants({ variant: "outline" }), "border-none")}>
            <ArrowUturnLeftIcon className="w-5 h-5" />
          </Tooltip.Trigger>
          <Tooltip.Content className="z-40 bg-zinc-100 border-zinc-100">
            <p>Undo {IS_APPLE ? "⌘Z" : "Ctrl+Z"}</p>
          </Tooltip.Content>
        </Tooltip>
        <Tooltip>
          <Tooltip.Trigger
            title={`Redo ${IS_APPLE ? "⌘Y" : "Ctrl+Y"}`}
            aria-label={`Redo ${IS_APPLE ? "⌘Y" : "Ctrl+Y"}`}
            onClick={() => activeEditor.dispatchCommand(REDO_COMMAND, undefined)}
            disabled={!canRedo || !isEditable}
            className={clsx(buttonVariants({ variant: "outline" }), "border-none")}>
            <ArrowUturnRightIcon className="w-5 h-5" />
          </Tooltip.Trigger>
          <Tooltip.Content className="z-40 bg-zinc-100 border-zinc-100">
            <p>Redo {IS_APPLE ? "⌘Y" : "Ctrl+Y"}</p>
          </Tooltip.Content>
        </Tooltip>
        <Separator orientation="vertical" />
        {blockType in blocks && activeEditor == editor && (
          <>
            <BlockFormatDropDown
              editor={editor}
              blockType={blockType}
              rootType={selectedElementKey ? "root" : "table"}
              disabled={!isEditable}
            />
            <Separator orientation="vertical" className="w-10 h-10" />
          </>
        )}
        {blockType === "code" ? (
          <Dropdown>
            <Dropdown.Trigger asChild>
              <Button
                aria-label="Code language"
                variant="outline"
                disabled={!isEditable}
                className="border-none focus:outline-none">
                {getLanguageFriendlyName(codeLanguage)}
              </Button>
            </Dropdown.Trigger>
            <Dropdown.Content className="z-[9999]">
              {CODE_LANGUAGE_OPTIONS.map(([value, name]) => {
                return (
                  <Dropdown.Item
                    className={`item ${dropDownActiveClass(value === codeLanguage)}`}
                    onClick={() => onCodeLanguageSelect(value)}
                    key={value}>
                    <span className="text">{name}</span>
                  </Dropdown.Item>
                );
              })}
            </Dropdown.Content>
          </Dropdown>
        ) : (
          <div className="flex items-center gap-1">
            <Button
              aria-label={`Format text as bold. Shortcut: ${IS_APPLE ? "⌘B" : "Ctrl+B"}`}
              variant="outline"
              size="sm"
              disabled={!isEditable}
              className={clsx("border-none", isBold ? "bg-zinc-200" : "")}
              title={IS_APPLE ? "Bold (⌘B)" : "Bold (Ctrl+B)"}
              onClick={() => editor.dispatchCommand(FORMAT_TEXT_COMMAND, "bold")}>
              <Bold size={20} />
            </Button>
            <Button
              aria-label={`Format text as italic. Shortcut: ${IS_APPLE ? "⌘I" : "Ctrl+I"}`}
              variant="outline"
              size="sm"
              disabled={!isEditable}
              className={clsx("border-none", isItalic ? "bg-zinc-200" : "")}
              title={IS_APPLE ? "Italic (⌘I)" : "Italic (Ctrl+I)"}
              onClick={() => editor.dispatchCommand(FORMAT_TEXT_COMMAND, "italic")}>
              <Italic size={20} />
            </Button>
            <Button
              aria-label={`Format text as underline. Shortcut: ${IS_APPLE ? "⌘U" : "Ctrl+U"}`}
              variant="outline"
              size="sm"
              disabled={!isEditable}
              className={clsx("border-none", isUnderline ? "bg-zinc-200" : "")}
              title={IS_APPLE ? "Underline (⌘U)" : "Underline (Ctrl+U)"}
              onClick={() => editor.dispatchCommand(FORMAT_TEXT_COMMAND, "underline")}>
              <Underline size={20} />
            </Button>
          </div>
        )}
      </Tooltip.Provider>
    </div>
  );
}
