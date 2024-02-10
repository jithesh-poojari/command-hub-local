import { UseFormReturn } from "react-hook-form";
import { CommandFormValues } from "./validation";
import { LucideIcon } from "lucide-react";

export { }

declare global {
  type InputFormFieldProps = {
    name: "usage" | "name" | "description";
    form: UseFormReturn<CommandFormValues>;
  }

  type MultipleCheckboxFormFieldProps = {
    name: "category.type" | "category.options.package_manager.pm_type" | "category.options.package_manager.framework" | "category.options.version_control" | "category.options.containerization";
    label: "Category" | "Package Manager" | "Framework" | "Version Control" | "Containerization";
    form: UseFormReturn<CommandFormValues>;
    options: readonly string[];
  }

  type SidebarItemProps = {
    name: string,
    items: {
      name: string,
      count: number,
    }[]
    searchParamsTypes: string,
  }

  type CommandCardProps = {
    item: {
      tags: (string | null)[];
      id: number;
      name: string;
      description: string | null;
      category: string | null;
      usage: string;
      created_at: Date;
      updated_at: Date;
    }
  }

  type CardButtonProps = {
    label: string,
    icon: LucideIcon,
    variant?: "default" | "secondary" | "destructive" | "outline",
    onClick?: React.MouseEventHandler<HTMLButtonElement> | undefined
  }
}