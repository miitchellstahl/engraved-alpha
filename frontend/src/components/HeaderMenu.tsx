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
import { useQuery } from "react-query";
import { getMyUser } from "@/api/MyUserApi";
import { Link } from "react-router-dom";
import { Avatar, AvatarImage } from "./ui/avatar";
import { Skeleton } from "./ui/skeleton";
import { ChevronDown, ChevronDownCircle } from "lucide-react";

const HeaderMenu = () => {
  const { data: user, isLoading } = useQuery("getUser", getMyUser, {
    retry: false,
  });

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Button variant="outline" className="image flex gap-2 select-none">
          {isLoading ? (
            <Skeleton className="h-6 w-6 rounded-xl" />
          ) : (
            <div>
              <Avatar className="h-6 w-6">
                <AvatarImage src={user?.imageUrl} />
              </Avatar>
            </div>
          )}

          {isLoading ? (
            <Skeleton className="w-20 h-2" />
          ) : (
            <span>{user?.name}</span>
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
