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

type Props = {
  index: number;
  removeEulogyItem: () => void;
};

const EulogyItemInput = ({ index, removeEulogyItem }: Props) => {
  const { control } = useFormContext();
  return (
    <div className="flex gap-2 flex-col">
      <FormField
        control={control}
        name={`eulogies[${index}][eulogySpeech]`}
        render={({ field }) => (
          <FormItem className="flex-1">
            <div className="flex gap-2 items-center justify-between">
              <FormLabel>Add a eulogy speech</FormLabel>
            </div>

            <FormControl>
              <Textarea placeholder="Provide a eulogy speech." {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={control}
        name={`eulogies[${index}][eulogyAuthor]`}
        render={({ field }) => (
          <FormItem className="flex-1">
            <div className="flex gap-2 items-center justify-between">
              <FormLabel>Name of eulogy author</FormLabel>
            </div>

            <FormControl>
              <Input placeholder="Who wrote this eulogy?" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FileInput name={`eulogies[${index}][eulogyAuthorPhoto]`} />

      <Button
        type="button"
        onClick={removeEulogyItem}
        className="bg-red-500 max-h-fit w-fit"
      >
        Cancel
      </Button>
    </div>
  );
};

export default EulogyItemInput;
