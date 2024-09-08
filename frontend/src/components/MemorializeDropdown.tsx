import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

import { Button } from "./ui/button";
import SignOutButton from "./SignoutButton";
import { Link } from "react-router-dom";
import { Skeleton } from "./ui/skeleton";
import { ShieldPlus } from "lucide-react";
import { useContext } from "react";
import { UserContext } from "@/UserContext";

const MemorializeDropdown = () => {
  const { user, isLoadingUser } = useContext(UserContext);
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Button className="image flex gap-2 select-none bg-0 hover:bg-gray-200">
          {isLoadingUser ? (
            <Skeleton className="h-6 w-6 rounded-xl" />
          ) : (
            <ShieldPlus size={18} className="text-gray-900" />
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <Link to={"/profile"}>
          {" "}
          <DropdownMenuItem>Memorialze</DropdownMenuItem>
        </Link>

        <DropdownMenuItem>
          <SignOutButton />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default MemorializeDropdown;
