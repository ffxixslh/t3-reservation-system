"use client";

import React, {
  createContext,
  useEffect,
  useState,
} from "react";
import { PlusCircle } from "lucide-react";

import { useTextModal } from "~/hooks/use-text-modal";
import { type TText } from "~/types";

import { Button } from "./button";
import { TextModal } from "../modals/text-modal";

interface TextUploadProps {
  textsValue: TText[];
  onCreate: (text: TText) => void;
  onChange: (text: TText) => void;
  onRemove: (text: TText) => void;
}

export const TextUploadContext = createContext<Pick<
  TextUploadProps,
  "onCreate" | "onChange" | "onRemove"
> | null>(null);

const TextUpload: React.FC<TextUploadProps> = ({
  textsValue,
  onCreate,
  onChange,
  onRemove,
}) => {
  const textModal = useTextModal();

  const textTemplate: TText = {
    id: "",
    title: "",
    content: "",
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  const [isMounted, setIsMounted] = useState(false);
  const [text, setText] = useState<TText>({
    id: "",
    title: "",
    content: "",
    createdAt: new Date(),
    updatedAt: new Date(),
  });

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const onTextCreate = () => {
    setText(textTemplate);
    textModal.onOpen();
  };

  const onTextSelect = (text: TText) => {
    setText(text);
    textModal.onOpen();
  };

  if (!isMounted) {
    return null;
  }

  return (
    <>
      <TextUploadContext.Provider
        value={{ onCreate, onChange, onRemove }}
      >
        <TextModal initialValue={text} />
      </TextUploadContext.Provider>
      <div className="flex flex-col gap-4">
        <div className="gap-8 md:grid md:grid-flow-row md:grid-cols-4">
          <div className="grid h-[80px] place-items-center rounded-md border border-input">
            <Button
              type="button"
              variant="ghost"
              className="h-full w-full"
              onClick={onTextCreate}
            >
              <PlusCircle className="h-10 w-10" />
            </Button>
          </div>
          {textsValue.reverse().map((text) => (
            <div
              key={text.id}
              className="relative h-[80px] cursor-pointer overflow-hidden rounded-md transition-colors hover:bg-accent hover:text-accent-foreground"
              onClick={() => onTextSelect(text)}
            >
              <div className="flex h-full w-full flex-col justify-evenly gap-2 rounded-md border border-input">
                <div className="ml-2 text-xl font-bold">
                  {text.title}
                </div>
                <p className="ml-2 text-ellipsis">
                  {text.content}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default TextUpload;
