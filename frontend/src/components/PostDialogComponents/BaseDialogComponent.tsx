import { DialogDescription, DialogFooter, DialogHeader } from "../ui/dialog";
import { Separator } from "../ui/separator";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import { Camera, MapPin, Music } from "lucide-react";
import { Input } from "../ui/input";
import { useFormContext } from "react-hook-form";
import { FormControl, FormField, FormItem, FormMessage } from "../ui/form";
import { DeceasedUser } from "@/types";
import LoadingButton from "../LoadingButton";
import "react-datepicker/dist/react-datepicker.css";

type Props = {
  deceasedUser: DeceasedUser;
  isMementoPostLoading: boolean;
  openPlaceDialog: () => void;
  openPhotoVideoDialog: () => void;
};

const BaseDialogComponent = ({
  deceasedUser,
  isMementoPostLoading,
  openPlaceDialog,
  openPhotoVideoDialog,
}: Props) => {
  const { control } = useFormContext();

  const renderButtons = () => (
    <div className="flex gap-3">
      <Button
        className="h-8 rounded-md flex gap-2 bg-gray-100 text-gray-900 hover:bg-gray-200"
        type="button"
        onClick={openPhotoVideoDialog}
      >
        <Camera size={18} />
        <span>Add Photo/Video</span>
      </Button>
      <Button
        className="h-8 rounded-md flex gap-2 bg-gray-100 text-gray-900 hover:bg-gray-200"
        type="button"
        onClick={openPlaceDialog}
      >
        <MapPin size={18} />
        <span>Add Place</span>
      </Button>
      <Button
        className="h-8 rounded-md flex gap-2 bg-gray-100 text-gray-900 hover:bg-gray-200"
        type="button"
      >
        <Music size={18} />
        <span>Add Song</span>
      </Button>
    </div>
  );

  return (
    <>
      <DialogHeader className="flex gap-4 flex-row items-center space-y-0">
        <img
          src={deceasedUser?.profilePhotoUrl}
          alt=""
          className="w-12 h-12 rounded-md"
        />
        <p className="font-bold text-xl m-0">
          Add to {deceasedUser?.firstName}'s Memorialization Page
        </p>
      </DialogHeader>

      <DialogDescription className="space-y-4">
        <Separator />
        <FormField
          control={control}
          name="content"
          render={({ field }) => (
            <FormItem className="flex-1">
              <FormControl>
                <Textarea
                  className="border-none p-0 focus:outline-none focus-visible:ring-0 resize-none text-lg"
                  placeholder={`Tell a story about ${deceasedUser?.firstName}, talk about your favorite memory with ${deceasedUser?.firstName}, etc...`}
                  {...field}
                ></Textarea>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Separator />
        {renderButtons()}
        <Separator />
        <div className="name-inputs flex flex-row gap-3 justify-between">
          <FormField
            control={control}
            name="author"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormControl>
                  <Input
                    placeholder="Name"
                    className="border-none p-0 focus:outline-none focus-visible:ring-0 text-lg"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <Separator />
      </DialogDescription>

      <DialogFooter>
        {isMementoPostLoading ? (
          <LoadingButton>Engraving</LoadingButton>
        ) : (
          <Button type="submit">Engrave</Button>
        )}
      </DialogFooter>
    </>
  );
};

export default BaseDialogComponent;
