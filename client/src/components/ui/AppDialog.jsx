import React from "react";
import { Dialog, DialogContent, DialogTrigger } from "./dialog";


const AppDialog = ({ children, content, defaultOpen, open, setOpenChange }) => {
  return (
    <>
      {open && (
        <div className="fixed top-0 left-0 z-50 w-full h-full bg-gray-900 bg-opacity-50"></div>
      )}
      <Dialog defaultOpen={defaultOpen} open={open} onOpenChange={setOpenChange}>
        <DialogTrigger asChild>{children}</DialogTrigger>
        <DialogContent className="sm:max-w-[400px]">{content}</DialogContent>
      </Dialog>
    </>
  );
};

export default AppDialog;
