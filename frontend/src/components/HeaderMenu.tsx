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

const HeaderMenu = () => {
  const { data: user } = useQuery("getUser", getMyUser, {
    retry: false,
  });

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Button className="image flex gap-2 select-none">
          {user?.imageUrl && (
            <div>
              <Avatar className="h-6 w-6">
                <AvatarImage src={user?.imageUrl} />
              </Avatar>
            </div>
          )}
          {user?.name}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
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
