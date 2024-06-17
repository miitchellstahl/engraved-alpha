import { Link } from "react-router-dom";

import { Button } from "./ui/button";
import { UserContext } from "@/UserContext";
import { useContext } from "react";
import HeaderMenu from "./HeaderMenu";
import { Separator } from "./ui/separator";
import { Input } from "./ui/input";
import { SearchIcon } from "lucide-react";

const Header = () => {
  const { isLoggedIn } = useContext(UserContext);

  return (
    <header className="flex flex-col gap-2 px-10 pt-2">
      <div className="flex justify-between items-center">
        <Link to={"/"} className="flex items-center gap-1">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-8 -rotate-90"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5"
            />
          </svg>
          <span className="font-bold text-xl">Engraved</span>
        </Link>

        {/* <div className=" w-full px-30 flex gap-4">
          <Input className=" w-3/5" />
          <Button variant="outline" className="p-2 w-fit">
            <SearchIcon size={20} className="text-purple-900" />
          </Button>
        </div> */}
        {isLoggedIn ? (
          <div className=" flex gap-2">
            <Link to={"/create-obituary"}>
              <Button className="bg-gray-900">Memorialize Someone</Button>
            </Link>
            <HeaderMenu />
          </div>
        ) : (
          <Link to={"/login"}>
            <Button className="w-fit">Log In</Button>
          </Link>
        )}
      </div>

      <Separator />
    </header>
  );
};

export default Header;
