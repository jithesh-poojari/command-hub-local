import {
  getExistingContainerization,
  getExistingPackageManager,
  getExistingVersionControl,
} from "@/lib/actions/command";
import SidebarItem from "./sidebar-item";
import { ScrollArea } from "../ui/scroll-area";

export default async function SideBar() {
  const packages = await getExistingPackageManager();
  const version_controls = await getExistingVersionControl();
  const containerization = await getExistingContainerization();

  return (
    <ScrollArea className="flex gap-2 p-2 pr-4 min-w-52  border-r max-h-full m-2 border rounded-lg mr-0">
      <nav className="flex flex-col gap-3">
        {packages && (
          <SidebarItem
            name="Package Managers"
            items={packages}
            searchParamsTypes="pm"
          />
        )}
        {version_controls && (
          <SidebarItem
            name="Version Controls"
            items={version_controls}
            searchParamsTypes="vc"
          />
        )}
        {containerization && (
          <SidebarItem
            name="Containerization"
            items={containerization}
            searchParamsTypes="ct"
          />
        )}
      </nav>
    </ScrollArea>
  );
}
