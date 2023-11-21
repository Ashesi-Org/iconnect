import { cn } from "../../hotline-room-engine/utils";


function Skeleton({
  className,
  ...props
}) {
  return (
    <div
      className={cn("animate-pulse rounded-md bg-muted", className)}
      {...props}
    />
  );
}

export { Skeleton };
