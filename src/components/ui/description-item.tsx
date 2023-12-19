import { cn } from "~/lib/utils";
import { Label } from "./label";

interface DescriptionItemProps {
  title: string;
  content?: string;
  children?: React.ReactNode;
  className?: string;
}

const DescriptionItem: React.FC<DescriptionItemProps> = ({
  title,
  content,
  children,
  className,
}) => {
  return (
    <div className={cn("flex flex-col gap-2", className)}>
      <Label className="text-muted-foreground">
        {title}
      </Label>
      {content && (
        <div className="font-200 pl-2 text-lg">
          {content}
        </div>
      )}
      {children}
    </div>
  );
};

export default DescriptionItem;
