import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import SympathyObituary from "../assets/SympathyObituary.jpg";
import MyselfObituary from "../assets/MyselfObituary.png";
import BannerOverlay from "../assets/CreateBanner.png";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const ObituaryServiceSelectPage = () => {
  return (
    <div className="2xl:container space-y-6">
      {" "}
      <div className="w-full bg-gray-200 h-[250px] p-3 flex items-center justify-center relative">
        <div className="absolute top-0 left-0 w-full h-full select-none">
          <img
            src={BannerOverlay}
            alt=""
            className="w-full h-full object-cover"
            draggable="false"
          />
        </div>
        <div className="text flex flex-col gap-3">
          <h1 className="text-5xl font-bold text-center text-gray-900">
            Engrave their story
          </h1>
          <h1 className="text-xl text-center text-gray-900">
            Honor their life on a platform that tells their story, visible for
            the world to see
          </h1>
        </div>
      </div>
      <div className="obituary-options grid grid-cols-2 gap-4 justify-between px-6 2xl:p-0">
        <Link to={"/create"} className="">
          <Card className="group h-full flex flex-col justify-between bg-gray-50">
            <div className="top-card">
              <CardHeader className="p-0 h-[250px]">
                <img
                  className="w-full h-full object-cover rounded-t-md "
                  src={MyselfObituary}
                  alt=""
                />
              </CardHeader>
              <CardContent className="flex flex-col py-2">
                <h2 className="text-2xl font-bold">Create Myself</h2>
                <span className="text-lg">
                  Open an Engraved profile for someone you care about
                </span>
              </CardContent>
            </div>
            <CardFooter className="px-6 py-4">
              <Button className="h-8 rounded-md flex bg-indigo-100 text-indigo-900 hover:bg-indigo-200 group-hover:bg-indigo-200">
                Create Now
              </Button>
            </CardFooter>
          </Card>
        </Link>
        <Link to={"/"} className="">
          <Card className="group h-full flex flex-col bg-gray-50 justify-between">
            <div className="top-card">
              <CardHeader className="p-0 h-[250px]">
                <img
                  className="w-full h-full object-cover rounded-t-md "
                  src={SympathyObituary}
                  alt=""
                />
              </CardHeader>
              <CardContent className="flex flex-col py-2">
                <h2 className="text-2xl font-bold">Sympathy Gift</h2>
                <span className="text-lg">
                  Show you care by giving their family the gift of
                  memorialization
                </span>
              </CardContent>
            </div>
            <CardFooter className="px-6 py-4">
              <Button className="h-8 rounded-md flex bg-gray-100 text-gray-400 hover:bg-gray-100 group-hover:bg-gray-200">
                Coming soon
              </Button>
            </CardFooter>
          </Card>
        </Link>
      </div>
    </div>
  );
};

export default ObituaryServiceSelectPage;
