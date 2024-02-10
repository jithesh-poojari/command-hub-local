import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { deleteCommand } from "@/lib/actions/command";
import { useRouter } from "next/navigation";

type DeleteButtonProps = {
  children: React.ReactNode;
  id: number;
};

export default function DeleteButton({ children, id }: DeleteButtonProps) {
  const router = useRouter();

  const handleDelete = async () => {
    await deleteCommand(id);
    router.refresh();
  };

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Delete command</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete this command?
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose asChild>
            <Button type="button" variant="destructive" onClick={handleDelete}>
              Delete
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
