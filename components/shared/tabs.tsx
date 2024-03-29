"use client";

import * as React from "react";
import * as TabsPrimitive from "@radix-ui/react-tabs";
import { cn } from "@/lib/utils";

const Tabs = TabsPrimitive.Root;

const TabsList = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.List>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.List>
>(({ className, ...props }, ref) => (
  // <div
  //   className={cn(
  //     "relative z-[1] h-12 w-fit rounded-xl bg-gradient-to-b from-navy-800/80 to-black",
  //     className
  //   )}
  // >
  <TabsPrimitive.List
    ref={ref}
    className={cn(
      // "bg-muted text-muted-foreground inline-flex h-10 items-center justify-center rounded-md p-1",
      // "flex w-fit flex-row rounded-[20px] bg-sblack p-[6px]",
      // "absolute inset-[1px] z-[-2] flex h-fit w-fit flex-row items-center gap-2 overflow-hidden rounded-xl bg-black p-1.5 shadow-inner shadow-navy-700 after:absolute after:right-[-72px] after:top-[-72px] after:z-[-1] after:h-32 after:w-32 after:rounded-xl after:bg-navy-500/60 after:blur-[40px]",
      "mask relative inline-flex h-12 w-fit cursor-grab items-center justify-center overflow-hidden rounded-2xl bg-neutral-950 px-1.5 py-1 text-center backdrop-blur-xl after:absolute after:inset-0 after:rounded-2xl after:bg-gradient-to-b after:from-navy-400/30 after:via-navy-400/5 after:to-navy-600/20 after:p-px",
      className
    )}
    {...props}
  />
  // </div>
));
TabsList.displayName = TabsPrimitive.List.displayName;

const TabsTrigger = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger>
>(({ className, ...props }, ref) => (
  // // <div
  // //   className={cn(
  // //     "relative z-[1] w-24 rounded-xl bg-transparent p-5 data-[state=active]:bg-gradient-to-b data-[state=active]:from-navy-800/80 data-[state=active]:to-black",
  // //     className
  // //   )}
  // >
  <TabsPrimitive.Trigger
    ref={ref}
    className={cn(
      // "ring-offset-background focus-visible:ring-ring data-[state=active]:bg-background data-[state=active]:text-foreground inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:shadow-sm",
      // "rounded-full bg-sblack px-6 py-2 font-heading data-[state=active]:bg-bgblack",
      // "absolute inset-[1px] z-[-2] w-full overflow-hidden rounded-xl bg-transparent px-2 text-sm font-semibold shadow-navy-700 hover:bg-gray-500/25 data-[state=active]:bg-bgblack data-[state=active]:shadow-inner data-[state=active]:after:absolute data-[state=active]:after:right-[-72px] data-[state=active]:after:top-[-72px] data-[state=active]:after:z-[-1] data-[state=active]:after:h-32 data-[state=active]:after:w-32 data-[state=active]:after:rounded-xl data-[state=active]:after:bg-navy-500/60 data-[state=active]:after:blur-[40px]",
      "inline-flex w-full items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium transition-all duration-300 hover:rounded-2xl hover:bg-gray-500/25 focus-visible:outline-none focus-visible:ring-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:rounded-xl data-[state=active]:bg-navy-500/60 data-[state=active]:text-white data-[state=active]:shadow-sm ",
      className
    )}
    {...props}
  />
  // </div>
));
TabsTrigger.displayName = TabsPrimitive.Trigger.displayName;

const TabsContent = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Content>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Content
    ref={ref}
    className={cn(
      // "ring-offset-background focus-visible:ring-ring mt-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
      "mt-1.5",
      className
    )}
    {...props}
  />
));
TabsContent.displayName = TabsPrimitive.Content.displayName;

export { Tabs, TabsList, TabsTrigger, TabsContent };
