"use client";

import { Slot } from "@radix-ui/react-slot";
import type { VariantProps } from "class-variance-authority";
import { cva } from "class-variance-authority";

import { cn } from "@/utils/cn";

function SidebarWrapper({ ref, className, children, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      ref={ref}
      data-slot="sidebar-wrapper"
      className={cn("group/sidebar-wrapper flex min-h-svh w-full", className)}
      {...props}
    >
      {children}
    </div>
  );
}

function Sidebar({ ref, className, children, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      ref={ref}
      data-slot="sidebar"
      className={cn("lg:w-sidebar-width fixed bottom-0 z-10 flex w-full lg:inset-y-0 lg:right-0 lg:left-0", className)}
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

function SidebarHeader({ ref, className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      ref={ref}
      data-slot="sidebar-header"
      data-sidebar="header"
      className={cn("hidden flex-col gap-2 p-2 pt-3 lg:flex", className)}
      {...props}
    />
  );
}

function SidebarFooter({ ref, className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      ref={ref}
      data-slot="sidebar-footer"
      data-sidebar="footer"
      className={cn("hidden flex-col gap-2 p-2 pb-3 lg:flex", className)}
      {...props}
    />
  );
}

function SidebarContent({ ref, className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      ref={ref}
      data-sidebar="content"
      data-slot="sidebar-content"
      className={cn("flex min-h-0 flex-1 flex-col gap-2 overflow-auto", className)}
      {...props}
    />
  );
}

function SidebarGroup({ ref, className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      ref={ref}
      data-sidebar="group"
      data-slot="sidebar-group"
      className={cn("relative flex w-full min-w-0 flex-col p-2", className)}
      {...props}
    />
  );
}

function SidebarGroupLabel({ ref, className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      ref={ref}
      data-sidebar="group-label"
      data-slot="sidebar-group-label"
      className={cn(
        "text-sidebar-foreground/70 ring-sidebar-ring flex h-8 shrink-0 items-center rounded-md px-2 text-sm font-medium outline-none focus-visible:ring-2 [&>svg]:size-4 [&>svg]:shrink-0",
        className
      )}
      {...props}
    />
  );
}

function SidebarGroupContent({ ref, className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      ref={ref}
      data-sidebar="group-content"
      data-slot="sidebar-group-content"
      className={cn("w-full p-0.5 text-sm", className)}
      {...props}
    />
  );
}

function SidebarMenu({ ref, className, ...props }: React.ComponentProps<"ul">) {
  return (
    <ul
      ref={ref}
      data-sidebar="menu"
      data-slot="sidebar-menu"
      className={cn("flex w-full min-w-0 flex-row justify-center gap-1 lg:flex-col", className)}
      {...props}
    />
  );
}

function SidebarMenuItem({ ref, className, ...props }: React.ComponentProps<"li">) {
  return (
    <li
      ref={ref}
      data-sidebar="menu-item"
      data-slot="sidebar-menu-item"
      className={cn("group/menu-item relative flex-1", className)}
      {...props}
    />
  );
}

const sidebarMenuButtonVariants = cva(
  "peer/menu-button px-3 py-5 flex font-medium justify-center sm:justify-start [&>span]:sr-only sm:[&>span]:not-sr-only w-full items-center gap-2 overflow-hidden rounded-md p-2 text-left text-sm outline-none ring-sidebar-ring hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus-visible:ring-2 active:bg-sidebar-accent active:text-sidebar-accent-foreground disabled:pointer-events-none disabled:opacity-50 group-has-data-[sidebar=menu-action]/menu-item:pr-8 aria-disabled:pointer-events-none aria-disabled:opacity-50 data-[active=true]:bg-sidebar-primary data-[active=true]:font-medium data-[active=true]:text-sidebar-primary-foreground  data-[state=open]:hover:bg-sidebar-accent data-[state=open]:hover:text-sidebar-accent [&>span:last-child]:truncate [&>svg]:size-5 sm:[&>svg]:size-4.5 lg:[&>svg]:size-4 [&>svg]:shrink-0 cursor-pointer",
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
  extends React.ComponentProps<"button">, VariantProps<typeof sidebarMenuButtonVariants> {
  asChild?: boolean;
  isActive?: boolean;
}

function SidebarMenuButton({
  ref,
  className,
  asChild = false,
  isActive = false,
  variant = "default",
  size = "default",
  ...props
}: SidebarMenuButtonProps) {
  const Comp = asChild ? Slot : "button";

  return (
    <Comp
      ref={ref}
      data-active={isActive}
      data-sidebar="menu-button"
      data-size={size}
      data-slot="sidebar-menu-button"
      className={cn(sidebarMenuButtonVariants({ variant, size }), className)}
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
