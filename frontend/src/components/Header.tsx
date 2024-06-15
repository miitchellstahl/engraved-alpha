import { Link } from "react-router-dom";

import { Button } from "./ui/button";
import { UserContext } from "@/UserContext";
import { useContext } from "react";
import HeaderMenu from "./HeaderMenu";
import { Separator } from "./ui/separator";

const Header = () => {
  const { isLoggedIn } = useContext(UserContext);

  return (
    <header className="flex flex-col gap-4  px-10 pt-4">
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
        <div className="flex border items-center border-gray-300 rounded-full py-2 px-4 gap-2 shadow-md shadow-gray-100">
          <div>Anywhere</div>
          <div className="border-l h-full border-gray-300"></div>
          <div>Any week</div>
          <div className="border-l h-full border-gray-300"></div>
          <div>add Guests</div>
          <button className="bg-red-500 text-white p-2 rounded-full">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-4"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
              />
            </svg>
          </button>
        </div>
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
