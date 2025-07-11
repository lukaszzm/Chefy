"use client";

import { Slot } from "@radix-ui/react-slot";
import type { VariantProps } from "class-variance-authority";
import { cva } from "class-variance-authority";

import { cn } from "@/utils/cn";

function SidebarWrapper({ className, children, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      className={cn("group/sidebar-wrapper flex min-h-svh w-full", className)}
      data-slot="sidebar-wrapper"
      {...props}
    >
      {children}
    </div>
  );
}

function Sidebar({ className, children, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      className={cn("lg:w-sidebar-width fixed bottom-0 z-10 flex w-full lg:inset-y-0 lg:right-0 lg:left-0", className)}
      data-slot="sidebar"
      {...props}
    >
      <div
        className="border-border bg-sidebar m-2.5 flex h-auto w-full rounded-lg border shadow lg:m-0 lg:size-full lg:flex-col lg:rounded-none lg:border-r lg:shadow-none"
        data-sidebar="sidebar"
      >
        {children}
      </div>
    </div>
  );
}

function SidebarHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      className={cn("hidden flex-col gap-2 p-2 pt-3 lg:flex", className)}
      data-sidebar="header"
      data-slot="sidebar-header"
      {...props}
    />
  );
}

function SidebarFooter({ className, ...props }: React.ComponentProps<"div">) {
  return <div className={cn("hidden flex-col gap-2 p-2 pb-3 lg:flex", className)} data-sidebar="footer" {...props} />;
}

function SidebarContent({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      className={cn("flex min-h-0 flex-1 flex-col gap-2 overflow-auto", className)}
      data-sidebar="content"
      data-slot="sidebar-content"
      {...props}
    />
  );
}

function SidebarGroup({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      className={cn("relative flex w-full min-w-0 flex-col p-2", className)}
      data-sidebar="group"
      data-slot="sidebar-group"
      {...props}
    />
  );
}

function SidebarGroupLabel({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      className={cn(
        "text-sidebar-foreground/70 ring-sidebar-ring flex h-8 shrink-0 items-center rounded-md px-2 text-sm font-medium outline-none focus-visible:ring-2 [&>svg]:size-4 [&>svg]:shrink-0",
        className
      )}
      data-sidebar="group-label"
      data-slot="sidebar-group-label"
      {...props}
    />
  );
}

function SidebarGroupContent({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      className={cn("w-full p-0.5 text-sm", className)}
      data-sidebar="group-content"
      data-slot="sidebar-group-content"
      {...props}
    />
  );
}

function SidebarMenu({ className, ...props }: React.ComponentProps<"ul">) {
  return (
    <ul
      className={cn("flex w-full min-w-0 flex-row justify-center gap-1 lg:flex-col", className)}
      data-sidebar="menu"
      data-slot="sidebar-menu"
      {...props}
    />
  );
}

function SidebarMenuItem({ className, ...props }: React.ComponentProps<"li">) {
  return (
    <li
      className={cn("group/menu-item relative flex-1", className)}
      data-sidebar="menu-item"
      data-slot="sidebar-menu-item"
      {...props}
    />
  );
}

const sidebarMenuButtonVariants = cva(
  "peer/menu-button px-3 py-5 flex font-medium justify-center sm:justify-start [&>span]:sr-only sm:[&>span]:not-sr-only w-full items-center gap-2 overflow-hidden rounded-md p-2 text-left text-sm outline-none ring-sidebar-ring hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus-visible:ring-2 active:bg-sidebar-accent active:text-sidebar-accent-foreground disabled:pointer-events-none disabled:opacity-50 group-has-[[data-sidebar=menu-action]]/menu-item:pr-8 aria-disabled:pointer-events-none aria-disabled:opacity-50 data-[active=true]:bg-sidebar-primary data-[active=true]:font-medium data-[active=true]:text-sidebar-primary-foreground  data-[state=open]:hover:bg-sidebar-accent data-[state=open]:hover:text-sidebar-accent [&>span:last-child]:truncate [&>svg]:size-5 sm:[&>svg]:size-4.5 lg:[&>svg]:size-4 [&>svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
        outline:
          "bg-background shadow-[0_0_0_1px_hsl(var(--sidebar-border))] hover:bg-sidebar-accent hover:text-sidebar-accent-foreground hover:shadow-[0_0_0_1px_hsl(var(--sidebar-accent))]",
      },
      size: {
        default: "h-10 text-base px-4",
        sm: "h-7 text-xs",
        lg: "h-12 text-sm",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

interface SidebarMenuButtonProps
  extends React.ComponentProps<"button">,
    VariantProps<typeof sidebarMenuButtonVariants> {
  asChild?: boolean;
  isActive?: boolean;
}

function SidebarMenuButton({
  asChild = false,
  isActive = false,
  variant = "default",
  size = "default",
  className,
  ...props
}: SidebarMenuButtonProps) {
  const Comp = asChild ? Slot : "button";

  return (
    <Comp
      className={cn(sidebarMenuButtonVariants({ variant, size }), className)}
      data-active={isActive}
      data-sidebar="menu-button"
      data-size={size}
      data-slot="sidebar-menu-button"
      {...props}
    />
  );
}

export {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarWrapper,
};
