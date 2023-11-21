import React from "react";
import { Root as AvatarRoot, Image as AvatarImagePrimitive, Fallback as AvatarFallbackPrimitive } from "@radix-ui/react-avatar";
import { cn } from "../../hotline-room-engine/utils";

const Avatar = React.forwardRef(({ className, ...props }, ref) => (
  <AvatarRoot
    ref={ref}
    className={cn(
      "relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full",
      className
    )}
    {...props}
  />
));
Avatar.displayName = AvatarRoot.displayName;

const AvatarImage = React.forwardRef(({ className, ...props }, ref) => (
  <AvatarImagePrimitive
    ref={ref}
    className={cn("aspect-square h-full w-full", className)}
    {...props}
  />
));
AvatarImage.displayName = AvatarImagePrimitive.displayName;

const AvatarFallback = React.forwardRef(({ className, ...props }, ref) => (
  <AvatarFallbackPrimitive
    ref={ref}
    className={cn(
      "flex h-full w-full items-center justify-center rounded-full bg-muted",
      className
    )}
    {...props}
  />
));
AvatarFallback.displayName = AvatarFallbackPrimitive.displayName;

export { Avatar, AvatarImage, AvatarFallback };
