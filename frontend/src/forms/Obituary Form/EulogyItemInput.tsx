import FileInput from "@/components/FileInput";
import { Button } from "@/components/ui/button";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useFormContext } from "react-hook-form";
import { X } from "lucide-react";

type Props = {
  index: number;
  removeEulogyItem: () => void;
};

const EulogyItemInput = ({ index, removeEulogyItem }: Props) => {
  const { control } = useFormContext();
  return (
    <div className="flex gap-2 flex-col bg-white p-4 rounded-md shadow-base relative">
      <Button
        type="button"
        onClick={removeEulogyItem}
        className="bg-gray-400 rounded-full p-1 hover:bg-gray-500 h-6 w-6 absolute -top-2 -right-2"
      >
        <X className="h-full w-full w-4 text-white" />
      </Button>
      <div className="flex gap-6">
        <FileInput
          name={`${name}[${index}][eulogyAuthorPhoto]`}
          profilePhotoInput={true}
        />
        <FormField
          control={control}
          name={`eulogies[${index}][eulogyAuthor]`}
          render={({ field }) => (
            <FormItem className="flex-1">
              <FormLabel>Name of eulogy author</FormLabel>
              <FormControl>
                <Input placeholder="Who wrote this eulogy?" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      <FormField
        control={control}
        name={`eulogies[${index}][eulogySpeech]`}
        render={({ field }) => (
          <FormItem className="flex-1">
            <FormLabel>Add a eulogy speech</FormLabel>
            <FormControl>
              <Textarea placeholder="Provide a eulogy speech." {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};

export default EulogyItemInput;
