import React from "react";
import { ChevronDown } from "lucide-react";
import { Accordion as AccordionRoot, Item as AccordionItemPrimitive, Header as AccordionHeaderPrimitive, Content as AccordionContentPrimitive } from "@radix-ui/react-accordion";
import { cn } from "../../hotline-room-engine/utils.js";

const Accordion = AccordionRoot;

const AccordionItem = React.forwardRef(({ className, ...props }, ref) => (
  <AccordionItemPrimitive
    ref={ref}
    className={cn(className)}
    {...props}
  />
));
AccordionItem.displayName = "AccordionItem";

const AccordionTrigger = React.forwardRef(({ className, children, ...props }, ref) => (
  <AccordionHeaderPrimitive className="flex">
    <AccordionTrigger
      ref={ref}
      className={cn(
        "flex flex-1 items-center justify-between py-4 font-medium transition-all  [&[data-state=open]>svg]:rotate-180",
        className
      )}
      {...props}
    >
      {children}
      <ChevronDown className="h-4 w-4 shrink-0 transition-transform duration-200" />
    </AccordionTrigger>
  </AccordionHeaderPrimitive>
));
AccordionTrigger.displayName = AccordionHeaderPrimitive.displayName;

const AccordionContent = React.forwardRef(({ className, children, ...props }, ref) => (
  <AccordionContentPrimitive
    ref={ref}
    className={cn(
      "overflow-hidden text-sm transition-all data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down",
      className
    )}
    {...props}
  >
    <div className="pb-4 pt-0">{children}</div>
  </AccordionContentPrimitive>
));
AccordionContent.displayName = AccordionContentPrimitive.displayName;

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent };
