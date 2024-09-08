import { useState, useCallback } from "react";
import { FormControl, FormField, FormItem, FormMessage } from "./ui/form";
import { useFormContext } from "react-hook-form";
import { useDropzone } from "react-dropzone";
import { CameraIcon, UserIcon, XIcon } from "lucide-react";
import { cn } from "@/lib/utils";

type Props = {
  handleCancelFileInput?: () => void;
  singlePhoto?: boolean;
  cancelButton?: boolean;
  name?: string;
  profilePhotoInput?: boolean;
};

const FileInput = ({
  handleCancelFileInput,
  singlePhoto = true,
  cancelButton = false,
  name = "photos",
  profilePhotoInput = false,
}: Props) => {
  const { control, setValue, getValues } = useFormContext();
  const [uploads, setUploads] = useState<string[]>([]);
  console.log(profilePhotoInput);

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      console.log("Uploaded file(s):", acceptedFiles);
      const fileUrls = acceptedFiles.map((file) => URL.createObjectURL(file));
      const newUploads = singlePhoto
        ? [fileUrls[0]]
        : [...uploads, ...fileUrls];
      setUploads(newUploads);

      if (singlePhoto) {
        setValue(name, acceptedFiles[0], { shouldValidate: true });
        console.log("New file:", acceptedFiles[0]);
      } else {
        const currentPhotos = getValues(name) || [];
        const newPhotos = [...currentPhotos, ...acceptedFiles];
        setValue(name, newPhotos, { shouldValidate: true });
        console.log("New files:", newPhotos);
      }
    },
    [setValue, getValues, singlePhoto, uploads, name]
  );

  const removePhoto = (index: number) => {
    const newUploads = uploads.filter((_, i) => i !== index);
    setUploads(newUploads);

    if (singlePhoto) {
      setValue(name, undefined, { shouldValidate: true });
    } else {
      const currentPhotos = getValues(name) || [];
      const newPhotos = currentPhotos.filter(
        (_: any, i: number) => i !== index
      );
      setValue(name, newPhotos, { shouldValidate: true });
    }
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "image/*": [] },
    multiple: !singlePhoto,
  });

  return (
    <FormField
      control={control}
      name={name}
      render={({ field, fieldState }) => (
        <FormItem className="flex-1 h-full flex flex-col">
          <FormControl className="h-full">
            <div
              {...getRootProps()}
              className={cn(
                "p-4 rounded-md cursor-pointer hover:bg-gray-300",
                "relative h-full flex flex-col justify-center",
                isDragActive
                  ? "border-gray-400 bg-gray-300"
                  : "border-gray-400 bg-gray-200",
                fieldState.error
                  ? "border-red-500 border-2"
                  : "border border-gray-200",
                profilePhotoInput && "p-0 overflow-hidden"
              )}
            >
              <input {...getInputProps()} />

              {uploads.length === 0 ? (
                profilePhotoInput ? (
                  <div className="flex flex-col items-center justify-center flex-1">
                    <UserIcon size={15} className="text-gray-900" />
                  </div>
                ) : (
                  <div className="flex flex-col items-center">
                    <CameraIcon className="size-15 text-gray-900 mx-auto mb-2" />
                    <p className="text-gray-900 text-md">Add Photos</p>
                  </div>
                )
              ) : (
                <div
                  className={cn(
                    "flex flex-wrap gap-2 justify-center",
                    profilePhotoInput && "h-full w-full"
                  )}
                >
                  {uploads.map((upload, index) => (
                    <div
                      key={index}
                      className={cn(
                        "relative group",
                        profilePhotoInput && singlePhoto && "h-full w-full"
                      )}
                    >
                      <img
                        src={upload}
                        alt={`Upload preview ${index + 1}`}
                        className={cn(
                          profilePhotoInput && singlePhoto
                            ? "w-full h-full object-cover"
                            : "w-20 h-20",
                          "object-cover rounded-md"
                        )}
                      />
                      <div
                        className={cn(
                          "absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center",
                          profilePhotoInput ? "hidden group-hover:flex" : "flex"
                        )}
                      >
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            removePhoto(index);
                          }}
                          className="bg-red-500 rounded-full p-1 hover:bg-red-600 transition-colors"
                        >
                          <XIcon className="size-4 text-white" />
                        </button>
                      </div>
                    </div>
                  ))}
                  {!singlePhoto && uploads.length > 0 && (
                    <div className="w-20 h-20 flex items-center justify-center border-2 border-gray-4">
                      <CameraIcon className="size-8 text-gray-400" />
                    </div>
                  )}
                </div>
              )}
              {cancelButton && (
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleCancelFileInput?.();
                    setUploads([]);
                    setValue(name, singlePhoto ? undefined : [], {
                      shouldValidate: true,
                    });
                  }}
                  className="absolute top-2 right-2 bg-gray-400 rounded-full p-1 hover:bg-gray-500"
                >
                  <XIcon className="size-4 text-white" />
                </button>
              )}
            </div>
          </FormControl>
        </FormItem>
      )}
    />
  );
};

export default FileInput;
