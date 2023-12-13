import { useEffect, useState } from "react";
import { zhCN } from "date-fns/locale";

import { Modal } from "~/components/ui/modal";
import DescriptionItem from "~/components/ui/description-item";

import { useRecordDetailModal } from "~/hooks/use-record-detail-modal";
import { dateFormatter } from "~/lib/utils";

interface RecordDetailModalProps {
  title: string;
  description: string;
}

export const RecordDetailModal: React.FC<
  RecordDetailModalProps
> = ({ title, description }) => {
  const recordDetailModal = useRecordDetailModal();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <Modal
      title={title}
      description={description}
      isOpen={recordDetailModal.isOpen}
      onClose={recordDetailModal.onClose}
    >
      <div className="flex flex-col gap-4">
        <DescriptionItem
          title={"创建时间"}
          content={dateFormatter(
            recordDetailModal.data?.createdAt ?? 0,
            zhCN,
          )}
        />
        <DescriptionItem
          title={"医生名称"}
          content={
            recordDetailModal.data?.doctor.name ?? ""
          }
        />
        <DescriptionItem title={"文本记录"} content={""}>
          <div className="flex flex-col justify-center gap-4 py-1">
            {recordDetailModal.data?.texts.map((text) => {
              return (
                <DescriptionItem
                  key={text.id}
                  title={text.title}
                  content={text.content}
                  className="rounded-md p-2 ring-1 ring-slate-200 dark:ring-slate-800"
                />
              );
            })}
          </div>
        </DescriptionItem>
      </div>
    </Modal>
  );
};
