import * as React from "react";
import { Check, ChevronsUpDown, Menu } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

export function MenuToggle({ menuItems }) {
  const [selectedItem, setSelectedItem] = React.useState(menuItems[0]?.title || "Menu");

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <div
                className="flex aspect-square size-8 items-center hidd justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground"
              >
                <Menu className="size-4" />
              </div>
              <div className="flex flex-col gap-0.5 leading-none">
                <span className="font-semibold">{selectedItem}</span>
              </div>
              <ChevronsUpDown className="ml-auto" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-[--radix-dropdown-menu-trigger-width]" align="start">
            {menuItems.map((item) => (
              <DropdownMenuItem key={item.title} onSelect={() => setSelectedItem(item.title)}>
                {item.title} {item.title === selectedItem && <Check className="ml-auto" />}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
