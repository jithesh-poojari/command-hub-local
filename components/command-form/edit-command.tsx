"use client";

import {
  CommandFormValues,
  categoryList,
  commandFormSchema,
  containerizationList,
  frameworkList,
  packageManagerList,
  versionControlList,
} from "@/lib/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { ScrollArea } from "../ui/scroll-area";
import { Form } from "../ui/form";
import InputFormField from "./input-form-filed";
import MultipleCheckboxFormField from "./multiple-checkbox-form-field";
import { useEffect, useState } from "react";
import { createCommand, getCommand, updateCommand } from "@/lib/actions/command";
import { useRouter } from "next/navigation";

type EditButtonProps = {
  children: React.ReactNode;
  id: number;
};

const defaultValues: Partial<CommandFormValues> = {
  usage: "",
  name: "",
  description: "",
  category: { type: null, options: {} },
};

export default function EditCommand({ children, id }: EditButtonProps) {
  const form = useForm<CommandFormValues>({
    resolver: zodResolver(commandFormSchema),
    defaultValues,
  });
  const [open, setOpen] = useState<boolean>(false);
  const router = useRouter();

  const packageManagerValues: string[] = [...packageManagerList];
  const versionControlValues: string[] = [...versionControlList];
  const containerizationValues: string[] = [...containerizationList];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getCommand(id);

        type CategoryType = (typeof categoryList)[number];
        type PackageManagerType = (typeof packageManagerList)[number];
        type FrameworkType = (typeof frameworkList)[number];
        type VersionControlType = (typeof versionControlList)[number];
        type ContainerizationType = (typeof containerizationList)[number];

        form.reset({
          name: data.name,
          usage: data.usage,
          description: data.description ?? undefined,
          category: {
            type: data.category as string as CategoryType,
            options: {
              package_manager: {
                pm_type: data.package_manager as string as PackageManagerType,
                framework: data.framework as string as FrameworkType,
              },
              version_control:
                data.version_control as string as VersionControlType,
              containerization:
                data.containerization as string as ContainerizationType,
            },
          },
        });
      } catch (error) {
        console.error("Error fetching command:", error);
      }
    };

    fetchData();
  }, [id, form.reset]);

  useEffect(() => {
    const usage = form.watch("usage");
    const nameSentence = usage ? usage.split(" ").join("-") : "";
    const firstWord = usage ? usage.split(" ")[0] : "";

    if (nameSentence) form.setValue("name", nameSentence);

    if (packageManagerValues.includes(firstWord)) {
      form.setValue("category.type", "package manager");
      form.setValue(
        "category.options.package_manager.pm_type",
        firstWord as any
      );
    }
    if (versionControlValues.includes(firstWord)) {
      form.setValue("category.type", "version control");
      form.setValue("category.options.version_control", firstWord as any);
    }
    if (containerizationValues.includes(firstWord)) {
      form.setValue("category.type", "containerization");
      form.setValue("category.options.containerization", firstWord as any);
    }
  }, [form.watch("usage")]);

  async function onSubmit(data: CommandFormValues) {
    console.log("Success!");
    try {
      const updatedCommand = await updateCommand(id, data);
      setOpen(false);
      router.refresh();
      console.log("Command created:", updatedCommand);
    } catch (error) {
      console.error("Error creating command:", error);
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="max-w-[425px] md:max-w-[525px] lg:max-w-[625px]">
        <ScrollArea className="max-h-[525px] md:max-h-[505px] p-2">
          <div className="p-2">
            <DialogHeader>
              <DialogTitle>Edit Command</DialogTitle>
              <DialogDescription>
                Edit command by providing usage details, a name, and other
                relevant information.
              </DialogDescription>
            </DialogHeader>
            <Form {...form}>
              <form
                id="form2"
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-4 mt-4"
              >
                <InputFormField name="usage" form={form} />
                <InputFormField name="name" form={form} />
                <InputFormField name="description" form={form} />
                <MultipleCheckboxFormField
                  name="category.type"
                  label="Category"
                  form={form}
                  options={categoryList}
                />
                {form.watch("category.type") === "package manager" && (
                  <MultipleCheckboxFormField
                    name="category.options.package_manager.pm_type"
                    label="Package Manager"
                    form={form}
                    options={packageManagerList}
                  />
                )}
                {form.watch("category.type") === "package manager" && (
                  <MultipleCheckboxFormField
                    name="category.options.package_manager.framework"
                    label="Framework"
                    form={form}
                    options={frameworkList}
                  />
                )}
                {form.watch("category.type") === "version control" && (
                  <MultipleCheckboxFormField
                    name="category.options.version_control"
                    label="Version Control"
                    form={form}
                    options={versionControlList}
                  />
                )}
                {form.watch("category.type") === "containerization" && (
                  <MultipleCheckboxFormField
                    name="category.options.containerization"
                    label="Containerization"
                    form={form}
                    options={containerizationList}
                  />
                )}
              </form>
            </Form>
            <DialogFooter>
              <Button form="form2" type="submit" className="mt-4">
                Save Command
              </Button>
            </DialogFooter>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
