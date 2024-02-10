import CreateCommand from "@/components/command-form/create-command-form";
import CommandCard from "@/components/command/command-card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { getAllCommands, getAllContainerCommands, getAllPackageCommands, getAllVersionCommands } from "@/lib/actions/command";

type Props = {
  searchParams: { [key: string]: string | string[] | undefined };
};

export default async function Home({ searchParams }: Props) {
  let commands = await getAllCommands();

  if (searchParams?.pm) {
    commands = await getAllPackageCommands(searchParams?.pm as string);
  } else if (searchParams?.vc) {
    commands = await getAllVersionCommands(searchParams?.vc as string);
  } else if (searchParams?.ct) {
    commands = await getAllContainerCommands(searchParams?.ct as string);
  }

  console.log(searchParams.pm);

  return (
    <main className="flex-1 flex flex-col overflow-hidden">
      <div className="flex justify-between m-2 p-2 mb-0 items-center border rounded-lg">
        <span className="font-semibold text-xl ml-2">Commands</span>
        <CreateCommand />
      </div>
      <ScrollArea className="flex gap-2 p-2 pr-4  max-h-full">
        <div className=" flex gap-2 pb-1 flex-wrap">
          {commands.map((command, index) => (
            <CommandCard item={command} key={index} />
          ))}
        </div>
      </ScrollArea>
    </main>
  );
}
