import { Bell } from "lucide-react";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

const NotificationDropdown = () => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        {" "}
        <Button className="rounded-md flex bg-0 text-gray-900 hover:bg-gray-200">
          <div className="">
            <Bell size={18} className="text-gray-900" />
          </div>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="p-3">
        <DropdownMenuLabel>
          <span className="text-2xl font-bold">Notifications</span>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuLabel>
          <span className="text-lg font-semibold">New</span>
        </DropdownMenuLabel>
        <DropdownMenuItem>
          Profile Profile Profile Profile Profile Profile Profile Profile
          Profile Profile
        </DropdownMenuItem>
        <DropdownMenuItem>Billing</DropdownMenuItem>
        <DropdownMenuItem>Team</DropdownMenuItem>
        <DropdownMenuItem>Subscription</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default NotificationDropdown;
