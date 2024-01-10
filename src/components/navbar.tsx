"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { MenuIcon } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetTrigger,
} from "@/components/ui/sheet";
import { MobileSidebar } from "@/components/mobile-sidebar";
import Link from "next/link";
import SwitchMode from "@/components/switch-mode";
import { menuItem } from "@/lib/data/menu";

const Navbar = () => {
  return (
    <header
      className="flex h-14 lg:h-[60px] items-center gap-4 border-b bg-gray-100/10 px-6
  sticky top-0 left-0 right-0 z-50 backdrop-filter backdrop-blur-md dark:border-gray-700 dark:bg-[#1C2128]"
    >
      <Sheet>
        <SheetTrigger asChild>
          <div className="lg:hidden">
            <MenuIcon />
          </div>
        </SheetTrigger>
        <SheetContent side="left">
          <SheetFooter>
            <div className="flex flex-col w-full">
              <nav className="grid items-start text-sm font-medium py-2 space-y-2">
                <SheetClose asChild>
                  <MobileSidebar items={menuItem} onClick={() => {}} />
                </SheetClose>
              </nav>
            </div>
          </SheetFooter>
        </SheetContent>
      </Sheet>
      <div className="w-full flex-1">
        <h1 className="font-semibold text-md md:text-xl"></h1>
      </div>
      <SwitchMode />
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            className="rounded-full border border-gray-200 w-8 h-8 dark:border-gray-800"
            size="icon"
            variant="ghost"
          >
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <span className="sr-only">Toggle user menu</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <Link href="/myaccount">My Account</Link>
          </DropdownMenuItem>
          <DropdownMenuItem>Settings</DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => {}}>Logout</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </header>
  );
};

export { Navbar };
