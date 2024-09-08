import { Card, CardHeader } from "./ui/card";
import { Separator } from "./ui/separator";
import { Textarea } from "./ui/textarea";
import { FormControl, FormField, FormItem, FormMessage } from "./ui/form";
import { useFormContext } from "react-hook-form";
import { useEffect, useRef, useState } from "react";
import { Pencil } from "lucide-react";
import { Badge } from "./ui/badge";
import { Input } from "./ui/input";
import FileInput from "./FileInput";
import { motion, AnimatePresence } from "framer-motion";

type Props = {
  profilePhoto: string;
  title: string;
  isLoading: boolean;
  name: string;
  index?: number;
};

const EditingPinnedDeceasedUserCard = ({
  profilePhoto,
  title,
  isLoading,
  name,
  index,
}: Props) => {
  const { control } = useFormContext(); // Initialize the form
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const eulogySpeechRef = useRef<HTMLTextAreaElement>(null);
  const [isEditingAuthor, setIsEditingAuthor] = useState(false);
  const [isEditingSpeech, setIsEditingSpeech] = useState(false);
  const [isEditingObituary, setIsEditingObituary] = useState(false);

  const toggleEdit = () => setIsEditingObituary((prev) => !prev);

  const adjustTextareaHeight = (ref: React.RefObject<HTMLTextAreaElement>) => {
    if (ref.current) {
      ref.current.style.height = "auto";
      ref.current.style.height = `${ref.current.scrollHeight}px`;
    }
  };

  useEffect(() => {
    adjustTextareaHeight(textareaRef);
    adjustTextareaHeight(eulogySpeechRef);
  }, []);

  const handleObituaryEdit = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    adjustTextareaHeight(textareaRef);
    // You might want to update the form value here if needed
    // For example: setValue(name, value);
  };

  const handleTextareaInput = (ref: React.RefObject<HTMLTextAreaElement>) => {
    adjustTextareaHeight(ref);
  };

  const handleTextareaSelect = (ref: React.RefObject<HTMLTextAreaElement>) => {
    handleTextareaInput(ref);
  };

  console.log(isEditingAuthor);

  return (
    <Card className="p-5 space-y-4 shadow-sm flex flex-col">
      <CardHeader className="flex flex-row gap-3 p-0 justify-between items-start space-y-0">
        <div className="flex items-center gap-3">
          {name === "eulogies" ? (
            <div className="w-[40px] h-[40px]">
              {" "}
              <FileInput
                name={`${name}.${index}.eulogyAuthorPhoto`}
                profilePhotoInput={true}
              />
            </div>
          ) : (
            <img
              className="h-[40px] w-[40px] rounded-sm object-cover object-left"
              src={profilePhoto}
              alt=""
            />
          )}

          {name === "eulogies" ? (
            <div className=" flex gap-2 items-center">
              <FormField
                control={control}
                name={`${name}.${index}.eulogyAuthor`}
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormControl>
                      {isEditingAuthor ? (
                        <Input
                          className="w-full overflow-hidden border-none focus-visible:ring-offset-0 focus-visible:outline-none focus-visible:border-none text-md p-0 focus-visible:ring-0 focus-visible:resize-none"
                          {...field}
                          onBlur={() => setIsEditingAuthor(false)}
                          autoFocus
                        />
                      ) : (
                        <h2
                          className="font-bold cursor-pointer"
                          onClick={() => setIsEditingAuthor(true)}
                        >
                          {field.value || "Who wrote this eulogy?"}
                        </h2>
                      )}
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          ) : (
            <h2 className="font-bold">{title}</h2>
          )}
        </div>
        {name === "obituary" ? (
          <Badge className="flex w-fit bg-purple-100 hover:bg-purple-100 text-purple-800 rounded-sm bg-opacity-80 select-none">
            <Pencil size={15} />
            <AnimatePresence mode="wait">
              {isEditingObituary && (
                <motion.span
                  key="editing"
                  initial={{ width: 0, opacity: 0 }}
                  animate={{ width: "auto", opacity: 1 }}
                  exit={{ width: 0, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="mr-1"
                >
                  Editing
                </motion.span>
              )}
            </AnimatePresence>
            <span>Obituary</span>
          </Badge>
        ) : (
          <Badge className="flex w-fit gap-2 bg-indigo-100 text-indigo-800 hover:bg-indigo-100 bg-opacity-80 rounded-sm select-none">
            <Pencil size={15} />
            <span>Eulogy</span>
          </Badge>
        )}
      </CardHeader>
      <Separator />
      {name === "obituary" ? (
        <div className="content whitespace-pre-wrap break-words">
          <FormField
            control={control}
            name={name}
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormControl>
                  <Textarea
                    onFocus={() => setIsEditingObituary(true)}
                    className="overflow-hidden border-none focus-visible:ring-offset-0 focus-visible:outline-none focus-visible:border-none text-md p-0 focus-visible:ring-0 focus-visible:resize-none"
                    {...field}
                    onBlur={(e) => {
                      setIsEditingObituary(false);
                      field.onBlur(e);
                    }}
                    ref={textareaRef}
                    onChange={(e) => {
                      field.onChange(e);
                      handleObituaryEdit(e);
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      ) : name === "eulogies" ? (
        <div className="content whitespace-pre-wrap break-words">
          <FormField
            control={control}
            name={`${name}.${index}.eulogySpeech`}
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormControl>
                  {isEditingSpeech ? (
                    <Textarea
                      className="w-full overflow-hidden border-none focus-visible:ring-offset-0 focus-visible:outline-none focus-visible:border-none text-md p-0 focus-visible:ring-0 focus-visible:resize-none"
                      {...field}
                      onBlur={() => setIsEditingSpeech(false)}
                      autoFocus
                      ref={eulogySpeechRef}
                      onChange={(e) => {
                        field.onChange(e);
                        handleTextareaInput(eulogySpeechRef);
                      }}
                    />
                  ) : (
                    <div
                      className="cursor-pointer"
                      onClick={() => setIsEditingSpeech(true)}
                    >
                      {field.value || `What will they say about Mitchell?`}
                    </div>
                  )}
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      ) : (
        <div></div>
      )}
    </Card>
  );
};

export default EditingPinnedDeceasedUserCard;
