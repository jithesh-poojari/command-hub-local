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
import { createCommand } from "@/lib/actions/command";
import { useRouter } from "next/navigation";

const defaultValues: Partial<CommandFormValues> = {
  usage: "",
  name: "",
  description: "",
  category: { type: null, options: {} },
};

export default function CreateCommand() {
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
    console.log("Success!", data);
    try {
      const createdCommand = await createCommand(data);
      setOpen(false);
      router.refresh();
      console.log("Command created:", createdCommand);
    } catch (error) {
      console.error("Error creating command:", error);
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="secondary">New Command</Button>
      </DialogTrigger>
      <DialogContent className="max-w-[425px] md:max-w-[525px] lg:max-w-[625px]">
        <ScrollArea className="max-h-[525px] md:max-h-[505px] p-2">
          <div className="p-2">
            <DialogHeader>
              <DialogTitle>Create New Command</DialogTitle>
              <DialogDescription>
                Define a new command by providing usage details, a name, and
                other relevant information.
              </DialogDescription>
            </DialogHeader>
            <Form {...form}>
              <form
                id="form1"
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
              <Button form="form1" type="submit" className="mt-4">
                Create Command
              </Button>
            </DialogFooter>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
