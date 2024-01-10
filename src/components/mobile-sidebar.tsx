"use client";

import Link from "next/link";
import { MenuItem } from "@/lib/data/menu";

const MobileSidebar = ({
  items,
  onClick,
}: {
  onClick: () => void;
  items: MenuItem[];
}) => {
  return (
    <div
      className="text-sm font-medium overflow-y-auto"
      style={{ maxHeight: "100vh" }}
    >
      {items.map((item, i) => (
        <div key={i}>
          {i !== 0 && (
            <div className="px-10 py-2 border-b border-gray-200 dark:border-gray-700"></div>
          )}
          {item.items?.map((item, index) => (
            <Link key={i} href={item.href} onClick={onClick}>
              <div
                className={
                  "flex items-center gap-3 rounded-sm px-3 py-2 m-0.5 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50 hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-600 cursor-pointer " +
                  (index === 0 ? "mt-4" : "")
                }
              >
                <div
                  className={
                    "flex items-center justify-center w-5 h-5 py-2 text-3xl text-gray-600 dark:text-gray-300"
                  }
                >
                  {item.icon}
                </div>
                <span className={"text-gray-600 dark:text-gray-300"}>
                  {item.title}
                </span>
              </div>
            </Link>
          ))}
        </div>
      ))}
      <div style={{ height: "100px" }}></div>
    </div>
  );
};

export { MobileSidebar };
