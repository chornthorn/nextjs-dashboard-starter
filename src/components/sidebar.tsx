"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { CaretDoubleLeft, CaretDoubleRight, User } from "@phosphor-icons/react";
import { useSidebarStore } from "@/lib/stores/sidebar.store";
import { menuItem } from "@/lib/data/menu";
import { SidebarItem } from "@/components/sidebar-item";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";

const Sidebar = () => {
  const pathName = usePathname();

  const [activeLink, setActiveLink] = useState(pathName);
  const isSmallSidebar = useSidebarStore((state) => state.isSmall);
  const setSmallSidebar = useSidebarStore((state) => state.setSmallSidebar);

  useQuery({
    queryKey: ["sidebar", pathName],
    queryFn: () => {
      setActiveLink(pathName);
      return pathName;
    },
  });

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 1285px)");

    const handleResize = () => {
      if (mediaQuery.matches) {
        setSmallSidebar(true);
      } else {
        setSmallSidebar(false);
      }
    };

    // Call the function once to set the sidebar state when the component mounts
    handleResize();

    // Set up the listener
    mediaQuery.addEventListener("change", handleResize);

    // Clean up the listener when the component unmounts
    return () => {
      mediaQuery.removeEventListener("change", handleResize);
    };
  }, [setSmallSidebar]);

  return (
    <>
      <div
        className={`hidden lg:block border-r bg-gray-100/10 dark:bg-[#1C2128] sticky top-0 h-screen transition-all duration-300 ease-in-out dark:border-gray-700 ${
          isSmallSidebar ? "w-20" : "w-[300px]"
        }`}
      >
        <div className="flex h-full max-h-screen flex-col gap-2">
          <div className="flex h-[60px] items-center border-b px-6">
            {isSmallSidebar ? (
              <Button
                className="ml-auto h-8 w-8"
                size="icon"
                variant="outline"
                onClick={() => setSmallSidebar(false)}
              >
                <CaretDoubleRight className="h-4 w-4 dark:text-white" />
              </Button>
            ) : (
              <>
                <Button
                  className="rounded-full border border-gray-200 w-8 h-8 dark:border-gray-800"
                  size="icon"
                  variant="ghost"
                >
                  <Avatar>
                    <AvatarImage
                      src="https://khodedev.com/wp-content/uploads/2023/12/cropped-Logo-KHODEDEV-1024x1024-1-scaled-2-2048x2048.jpg"
                      alt="@shadcn"
                    />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                </Button>
                <div className="mx-2"></div>
                <Link
                  className="flex items-center gap-2 font-semibold"
                  href="/"
                >
                  <span>
                    <span className="text-gray-900 dark:text-gray-50">
                      Nextjs Starter
                    </span>
                  </span>
                </Link>
                <Button
                  className="ml-auto h-8 w-8"
                  size="icon"
                  variant="outline"
                  onClick={() => setSmallSidebar(true)}
                >
                  <CaretDoubleLeft className="h-4 w-4 dark:text-white" />
                </Button>
              </>
            )}
          </div>
          <div className="flex-1 overflow-auto py-2">
            <nav className="grid items-start px-4 text-sm font-medium">
              {menuItem.map((item, index) => (
                <div key={item.title}>
                  {!isSmallSidebar ? (
                    index !== 0 && (
                      <div className="flex flex-row items-center py-3 justify-between">
                        <p
                          className="text-gray-500 dark:text-gray-400 font-normal text-xs"
                          style={{ minWidth: "max-content" }}
                        >
                          {item.title}
                        </p>
                        <div className="w-full flex flex-row items-center ml-2 py-2">
                          <Separator className="dark:bg-gray-700" />
                        </div>
                      </div>
                    )
                  ) : (
                    <div className="py-2">
                      <Separator className="dark:bg-gray-700" />
                    </div>
                  )}
                  <div>
                    <SidebarItem
                      key={index}
                      items={item.items}
                      pathName={activeLink}
                      onClick={() => {}}
                    />
                  </div>
                </div>
              ))}
            </nav>
          </div>
          <div className="flex h-[70px] items-center border-t px-6">
            {isSmallSidebar ? (
              <Button className="ml-auto h-8 w-8" size="icon" variant="outline">
                <User className="h-4 w-4" />
              </Button>
            ) : (
              <>
                <div className="flex items-center gap-2">
                  <div className="flex flex-col">
                    <span className="text-gray-900 dark:text-gray-50 font-semibold">
                      Thorn Chorn
                    </span>
                    <span className="text-gray-500 dark:text-gray-400 text-xs">
                      {/*Role: {session?.data?.roles[0] ?? 'User'}*/}
                    </span>
                  </div>
                </div>
                <Button
                  className="ml-auto h-8 w-8"
                  size="icon"
                  variant="outline"
                >
                  <User className="h-4 w-4" />
                </Button>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export { Sidebar };
