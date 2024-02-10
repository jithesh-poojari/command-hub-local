"use client";

import Link from "next/link";
import { buttonVariants } from "../ui/button";
import { cn } from "@/lib/utils";
import { useSearchParams } from "next/navigation";

export default function SidebarItem({
  name,
  items,
  searchParamsTypes,
}: SidebarItemProps) {
  const searchParams = useSearchParams();
  const selectedTag: string | null =
    searchParams.get("pm") || searchParams.get("vc") || searchParams.get("ct");
    
  return (
    items.length !== 0 && (
      <div className="flex flex-col gap-1 ">
        <h2 className="text-nowrap text-lg font-semibold tracking-tight">
          {name}
        </h2>
        {items.map((item, index) => (
          <Link
            key={index}
            href={`?${searchParamsTypes}=${item.name}`}
            className={cn(
              buttonVariants({ variant: "ghost", size: "sm" }),
              selectedTag === item.name &&
                "dark:bg-muted dark:text-white dark:hover:bg-muted dark:hover:text-white",
              "justify-start"
            )}
          >
            {item.name}
            {item.count && (
              <span
                className={cn(
                  "ml-auto",
                  selectedTag === item.name && "text-background dark:text-white"
                )}
              >
                {item.count}
              </span>
            )}
          </Link>
        ))}
      </div>
    )
  );
}
