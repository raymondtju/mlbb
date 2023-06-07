"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../shared/dialog";

interface FolDialogProps {
  children: React.ReactNode;
  triggerChild: React.ReactNode;
  title: string;
  description?: string;
}

const FolDialog = ({
  children,
  triggerChild,
  title,
  description,
}: FolDialogProps) => {
  return (
    <Dialog>
      <DialogTrigger asChild>{triggerChild}</DialogTrigger>
      <DialogContent className="w-100000 h-960">
        <DialogTitle>{title}</DialogTitle>
        <DialogHeader>
          <DialogDescription>{description}</DialogDescription>
          {children}
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default FolDialog;
