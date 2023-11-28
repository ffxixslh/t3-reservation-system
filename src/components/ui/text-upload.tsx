import React, { useEffect, useState } from "react";
import { Input } from "./input";
import { Textarea } from "./textarea";
import { Button } from "./button";

import { api } from "~/trpc/react";
import { type TText } from "~/types";
import { Label } from "./label";

interface TextUploadProps {
  initialData: TText | null;
  onChange: (textId: string) => void;
}

const TextUpload: React.FC<TextUploadProps> = ({
  initialData,
  onChange,
}) => {
  const [textTitle, setTextTitle] = useState(
    initialData?.title ?? "",
  );
  const [textContent, setTextContent] = useState(
    initialData?.content ?? "",
  );
  const [isMounted, setIsMounted] = useState(false);

  const textCreateMutation =
    api.text.createText.useMutation();
  const textUpdateMutation =
    api.text.updateText.useMutation();

  const action = initialData ? "更新文本" : "创建文本";

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const onUpload = async () => {
    if (!initialData) {
      const result = await textCreateMutation.mutateAsync({
        title: textTitle,
        content: textContent,
      });
      onChange(result.id);
    } else {
      await textUpdateMutation.mutateAsync({
        id: initialData.id,
        title: textTitle,
        content: textContent,
      });
    }
  };

  if (!isMounted) {
    return null;
  }

  return (
    <div className="flex flex-col gap-2">
      <Label
        className="text-xs text-muted-foreground"
        htmlFor="text-upload_title"
      >{`文本标题`}</Label>
      <Input
        id="text-upload_title"
        type="text"
        placeholder={`标题`}
        value={textTitle}
        onChange={(e) => setTextTitle(e.target.value)}
      />
      <Label
        className="text-xs text-muted-foreground"
        htmlFor="text-upload_content"
      >{`文本内容`}</Label>
      <Textarea
        id="text-upload_content"
        placeholder={`内容`}
        value={textContent}
        onChange={(e) => setTextContent(e.target.value)}
      />
      <Button type="button" onClick={onUpload}>
        {action}
      </Button>
    </div>
  );
};

export default TextUpload;
