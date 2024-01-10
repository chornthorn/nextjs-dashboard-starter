"use client";

import Link from "next/link";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useSidebarStore } from "@/lib/stores/sidebar.store";
import { MenuItem } from "@/lib/data/menu";

function SidebarItem({
  items,
  pathName,
  onClick,
}: {
  pathName: string;
  onClick: () => void;
  items?: MenuItem[] | null;
}) {
  const isSmallSidebar = useSidebarStore((state) => state.isSmall);

  const isActive = (path: string, activePath: string) => {
    // remove first slash
    const pathName = path.split("/").slice(1);
    const activePathName = activePath.split("/").slice(1);
    return pathName[0] === activePathName[0];
  };

  return (
    <div className="grid items-start  text-sm font-medium">
      {items?.map((item, i) => (
        <Link key={i} href={item.href} onClick={onClick}>
          <div
            className={
              "flex items-center gap-3 rounded-sm px-3 py-2 m-0.5 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50 hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-600 cursor-pointer " +
              (isActive(pathName, item.href)
                ? "bg-slate-950 dark:text-gray-50 hover:bg-slate-950 dark:hover:bg-slate-950"
                : "")
            }
          >
            {isSmallSidebar ? (
              <TooltipProvider>
                <Tooltip delayDuration={100}>
                  <TooltipTrigger>
                    <div
                      className={
                        "flex items-center justify-end w-5 h-5 text-3xl " +
                        (isActive(pathName, item.href)
                          ? "text-gray-50 dark:text-gray-300"
                          : "text-gray-600 dark:text-gray-300")
                      }
                    >
                      {item.icon}
                    </div>
                  </TooltipTrigger>
                  <TooltipContent>
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                      {item.title}
                    </span>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            ) : (
              <>
                <div
                  className={
                    "flex items-center justify-center w-5 h-5 py-2 text-3xl " +
                    (isActive(pathName, item.href)
                      ? "text-gray-50 dark:text-gray-300"
                      : "text-gray-600 dark:text-gray-300")
                  }
                >
                  {item.icon}
                </div>
                <span
                  className={
                    isActive(pathName, item.href)
                      ? "text-gray-50 dark:text-gray-50"
                      : "text-gray-600 dark:text-gray-300"
                  }
                >
                  {item.title}
                </span>
              </>
            )}
          </div>
        </Link>
      ))}
    </div>
  );
}

export { SidebarItem };
