import React from "react";
import { Dialog, DialogContent, DialogTrigger } from "./dialog";


const AppDialog = ({
  children,
  content,
  defaultOpen,
  open,
  setOpenChange,
}) => {
  return (
    <Dialog defaultOpen={defaultOpen} open={open} onOpenChange={setOpenChange}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[400px]">{content}</DialogContent>
    </Dialog>
  );
};

export default AppDialog;
