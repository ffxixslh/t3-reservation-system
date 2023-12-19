"use client";

import * as React from "react";
import {
  Check,
  ChevronsUpDown,
  PlusCircle,
  Building,
} from "lucide-react";

import { cn } from "~/lib/utils";
import { Button } from "~/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "~/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "~/components/ui/popover";
import { useHospitalModal } from "~/hooks/use-hospital-modal";
import { useParams, useRouter } from "next/navigation";

type PopoverTriggerProps = React.ComponentPropsWithoutRef<
  typeof PopoverTrigger
>;

interface HospitalSwitcherProps
  extends PopoverTriggerProps {
  items: { id: string; name: string }[];
}

export default function HospitalSwitcher({
  className,
  items,
}: HospitalSwitcherProps) {
  const hospitalModal = useHospitalModal();
  const params = useParams();

  const router = useRouter();

  const formattedItems = items.map((item) => ({
    label: item.name,
    value: item.id,
  }));

  const currentHospital = formattedItems.find(
    (item) => item.value === params.hospitalId,
  );

  const [open, setOpen] = React.useState(false);

  const onHospitalSelect = (hospital: {
    value: string;
    label: string;
  }) => {
    setOpen(false);
    router.push(`/dashboard/${hospital.value}`);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          role="combobox"
          aria-expanded={open}
          aria-label={`选择一个医院`}
          className={cn(
            "w-[200px] justify-between",
            className,
          )}
        >
          <Building className="mr-2 h-4 w-4" />
          {currentHospital?.label}
          <ChevronsUpDown className="ml-auto h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandList>
            <CommandInput placeholder={`搜索医院...`} />
            <CommandEmpty>{`找不到该医院。`}</CommandEmpty>
            <CommandGroup heading={`医院`}>
              {formattedItems.map((hospital) => (
                <CommandItem
                  key={hospital.value}
                  onSelect={() =>
                    onHospitalSelect(hospital)
                  }
                  className="text-sm"
                >
                  <Building className="mr-2 h-4 w-4" />
                  {hospital.label}
                  <Check
                    className={cn(
                      "ml-auto h-4 w-4",
                      currentHospital?.value ===
                        hospital.value
                        ? "opacity-100"
                        : "opacity-0",
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
          <CommandSeparator />
          <CommandList>
            <CommandGroup>
              <CommandItem
                onSelect={() => {
                  setOpen(false);
                  hospitalModal.onOpen();
                }}
              >
                <PlusCircle className="mr-2 h-5 w-5" />
                {`创建医院`}
              </CommandItem>
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
