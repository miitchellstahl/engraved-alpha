import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

import { Button } from "./ui/button";
import SignOutButton from "./SignoutButton";
import { Link } from "react-router-dom";
import { Avatar, AvatarImage } from "./ui/avatar";
import { Skeleton } from "./ui/skeleton";
import { ChevronDown } from "lucide-react";
import { User } from "@/types";

type Props = {
  user: User;
  isLoadingUser: boolean;
};

const HeaderMenu = ({ user, isLoadingUser }: Props) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Button
          variant="outline"
          className="image flex gap-2 select-none bg-0 hover:bg-gray-200 border-gray-200"
        >
          {isLoadingUser ? (
            <Skeleton className="h-6 w-6 rounded-xl" />
          ) : (
            <div>
              <Avatar className="h-6 w-6">
                <AvatarImage src={user?.imageUrl} />
              </Avatar>
            </div>
          )}

          <ChevronDown size={15} />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <Link to={"/profile"}>
          {" "}
          <DropdownMenuItem>Profile</DropdownMenuItem>
        </Link>

        <DropdownMenuItem>
          <SignOutButton />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default HeaderMenu;
