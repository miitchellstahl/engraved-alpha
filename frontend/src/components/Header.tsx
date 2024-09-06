import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import { UserContext } from "@/UserContext";
import { useContext } from "react";
import HeaderMenu from "./HeaderMenu";
import MemorializeButton from "./MemorializeButton";
import NotificationDropdown from "./NotificationDropdown";
import MemorializeDropdown from "./MemorializeDropdown";
import { Separator } from "./ui/separator";

const Header = () => {
  const { isLoggedIn } = useContext(UserContext);

  return (
    <header className="flex flex-col gap-2 2xl:container px-6 py-3">
      <div className="flex justify-between items-center">
        <Link to={"/"} className="hover:bg-gray-200 p-3 rounded-md">
          <svg
            width="34"
            height="36"
            viewBox="0 0 187 203"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M36.8083 143.517H149.991V124.182H56.5332V50.1301C56.5587 41.9724 59.8753 34.156 65.7587 28.3875C71.642 22.619 79.6143 19.3671 87.9348 19.3419H98.8694C115.838 19.3419 129.022 32.1213 130.189 48.5432L130.362 50.9722L128.211 52.1895C127.619 52.5217 127.047 52.8861 126.497 53.2808C125.383 54.0777 124.332 54.956 123.353 55.9084C119.437 59.7376 116.544 65.9158 116.544 71.3733C116.4 75.4827 117.373 79.5557 119.362 83.1754C121.368 86.7086 124.378 89.8951 127.014 92.9934L129.633 96.0715L133.803 101.055L136.651 104.391C137.122 104.983 137.631 105.545 138.174 106.073C138.853 106.552 139.687 106.77 140.518 106.686C142.38 106.686 144.373 103.751 145.395 102.469C145.967 101.749 146.565 101.052 147.156 100.348L152.193 94.3504L152.244 94.2943C153.656 92.7369 154.981 91.1004 156.307 89.4722C157.171 88.4131 158.028 87.3475 158.865 86.2672C159.394 85.6194 159.887 84.9442 160.342 84.2446C162.106 81.3559 163.726 77.1921 163.726 73.7922C163.726 69.4362 163.556 66.2652 161.534 62.2999C159.453 58.029 156.101 54.477 151.918 52.1132L150.033 51.0338L149.953 48.8935C148.921 21.6486 126.877 0 98.8733 0H87.9384C74.3887 0.0279354 61.4021 5.31766 51.821 14.7115C42.24 24.1053 36.845 36.838 36.8168 50.1227V143.517H36.8083ZM140.211 83.0034C138.117 83.0033 136.07 82.3943 134.33 81.2537C132.589 80.1131 131.232 78.492 130.431 76.5954C129.629 74.6988 129.42 72.6118 129.828 70.5984C130.237 68.585 131.245 66.7356 132.726 65.284C134.206 63.8324 136.093 62.8438 138.146 62.4433C140.2 62.0428 142.328 62.2482 144.263 63.0337C146.197 63.8193 147.851 65.1495 149.014 66.8563C150.178 68.5631 150.799 70.5699 150.799 72.6227C150.799 73.986 150.525 75.3359 149.993 76.5954C149.461 77.8549 148.681 78.9993 147.698 79.9633C146.715 80.9272 145.548 81.6919 144.263 82.2135C142.978 82.7352 141.601 83.0036 140.211 83.0034ZM186.794 183.676H0V203.01H186.794V183.676ZM166.898 153.931H19.8966V173.264H166.898V153.931Z"
              fill="#111827"
            />
          </svg>
        </Link>

        {isLoggedIn ? (
          <div className="flex gap-2">
            <div className="hidden sm:block">
              <MemorializeButton />
            </div>
            <div className="block sm:hidden">
              <MemorializeDropdown />
            </div>
            <NotificationDropdown />
            <Separator orientation="vertical" className="h-10" />
            <HeaderMenu />
          </div>
        ) : (
          <Link to={"/login"}>
            <Button className="w-30 h-8 rounded-md flex bg-indigo-100 text-indigo-900 hover:bg-indigo-200">
              Log In
            </Button>
          </Link>
        )}
      </div>
    </header>
  );
};

export default Header;
