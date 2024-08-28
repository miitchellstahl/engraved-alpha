import React from "react";
import { DialogDescription, DialogFooter, DialogHeader } from "../ui/dialog";
import { CrownIcon } from "lucide-react";
import { Button } from "../ui/button";
import { DeceasedUser } from "@/types";

type Props = {
  deceasedUser: DeceasedUser;
  handleContributeAgain: (e: React.MouseEvent<HTMLButtonElement>) => void;
};

const SuccessModal = ({ deceasedUser, handleContributeAgain }: Props) => {
  return (
    <>
      <DialogHeader className="flex gap-4 flex-row items-center space-y-0">
        <CrownIcon size={20} />
        <p className="font-bold text-xl">
          Thank you for contributing to {deceasedUser?.firstName}'s profile
        </p>
      </DialogHeader>
      <DialogDescription className="space-y-4">
        <Button type="button" onClick={handleContributeAgain}>
          Contribute again
        </Button>
      </DialogDescription>
      <DialogFooter>
        <div className="space-y-4 flex flex-col w-full items-center justify-center">
          <span className="align-center">Or</span>
          <Button
            className="bg-green-100 text-green-900 hover:bg-green-200 flex-1"
            type="button"
          >
            Plant a tree in {deceasedUser?.firstName}'s name
          </Button>
          <Button
            className="bg-pink-100 text-pink-900 hover:bg-pink-200 flex-1"
            type="button"
          >
            Donate to {deceasedUser?.firstName}'s foundation
          </Button>
          <Button
            className="bg-gray-100 text-gray-900 hover:bg-gray-200 flex-1"
            type="button"
          >
            Share your post
          </Button>
        </div>
      </DialogFooter>
    </>
  );
};

export default SuccessModal;
