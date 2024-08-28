import { Camera } from "lucide-react";
import FileInput from "../FileInput";
import { Button } from "../ui/button";
import { DialogDescription, DialogFooter, DialogHeader } from "../ui/dialog";
import { FormControl, FormField, FormItem, FormMessage } from "../ui/form";
import { Input } from "../ui/input";
import { Separator } from "../ui/separator";
import { Textarea } from "../ui/textarea";
import { Controller, useFormContext } from "react-hook-form";
import DatePicker from "react-datepicker";
import { DeceasedUser } from "@/types";
import LoadingButton from "../LoadingButton";
import AddPlace from "./AddPlace";

type Props = {
  deceasedUser: DeceasedUser;
  handleCancelPlaceInput: () => void;
  handleCancelFileInput: () => void;
  isLoading: boolean;
  isFileInputVisible: boolean;
  setIsFileInputVisible: (visible: boolean) => void;
};

const PlaceModal = ({
  deceasedUser,
  handleCancelPlaceInput,
  handleCancelFileInput,
  isLoading,
  isFileInputVisible,
  setIsFileInputVisible,
}: Props) => {
  const { control } = useFormContext();
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
          name="placeName"
          render={({ field }) => (
            <FormItem className="flex-1">
              <FormControl>
                <Input
                  placeholder="Name of place"
                  className="border-none p-0 focus:outline-none focus-visible:ring-0 text-lg"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
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
        <AddPlace handleCancelPlaceInput={handleCancelPlaceInput} />
        {isFileInputVisible ? (
          <FileInput
            handleCancelFileInput={handleCancelFileInput}
            singlePhoto={false}
            cancelButton={true}
          />
        ) : (
          <Button
            className="h-8 rounded-md flex gap-2 bg-gray-100 text-gray-900 hover:bg-gray-200"
            type="button"
            onClick={() => setIsFileInputVisible(true)}
          >
            <Camera size={18} />
            <span>Add photos associated with this place</span>
          </Button>
        )}

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
          {isFileInputVisible && (
            <FormField
              control={control}
              name="date"
              render={() => (
                <FormItem className="flex-1">
                  <FormControl>
                    <Controller
                      control={control}
                      name="date"
                      render={({ field }) => (
                        <DatePicker
                          selected={field.value ? new Date(field.value) : null}
                          onChange={(date) => field.onChange(date)}
                          showYearPicker
                          dateFormat="yyyy"
                          placeholderText="Estimated photo year"
                          className="flex h-10 w-full rounded-md border border-input bg-background ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 border-none p-0 focus:outline-none focus-visible:ring-0 text-lg"
                        />
                      )}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}
        </div>
        <Separator />
      </DialogDescription>
      <DialogFooter>
        {isLoading ? (
          <LoadingButton>Engraving</LoadingButton>
        ) : (
          <Button type="submit">Engrave</Button>
        )}
      </DialogFooter>
    </>
  );
};

export default PlaceModal;
