"use client";

import { Copy, Edit, Trash2, Check } from "lucide-react";
import { Badge } from "../ui/badge";
import { Card, CardDescription } from "../ui/card";
import { TooltipProvider } from "../ui/tooltip";
import CardButton from "./card-button";
import { toast } from "sonner";
import { useState } from "react";
import DeleteButton from "./delete-button";
import EditCommand from "../command-form/edit-command";
import { useRouter, useSearchParams } from "next/navigation";

export default function CommandCard({ item }: CommandCardProps) {
  const [copied, setCopied] = useState<boolean>(false);
  const router = useRouter();
  const searchParams = useSearchParams();

  function copy(text: string) {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
    toast.success("command copied");
  }

  return (
    <Card className="p-4 max-w-sm min-w-80 flex justify-between">
      <div className="flex flex-col gap-2">
        <div className="font-bold text-xl">{item.name}</div>
        <code className="language-bash">{item.usage}</code>
        {item.description && (
          <CardDescription className="text-gray-700">
            {item.description}
          </CardDescription>
        )}
        {item.tags && (
          <div className="flex gap-2">
            {item.tags.map((tag, index) => (
              <Badge key={index}>{tag}</Badge>
            ))}
          </div>
        )}
      </div>
      <div className="flex flex-col gap-2 ">
        <TooltipProvider>
          <EditCommand id={item.id}>
            <CardButton label="edit" icon={Edit} variant="outline" />
          </EditCommand>
          <CardButton
            label="copy"
            icon={copied ? Check : Copy}
            onClick={() => copy(item.usage)}
          />
          <DeleteButton id={item.id}>
            <CardButton label="delete" icon={Trash2} variant="destructive" />
          </DeleteButton>
        </TooltipProvider>
      </div>
    </Card>
  );
}
