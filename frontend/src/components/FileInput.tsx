import { useState, useCallback } from "react";
import { FormControl, FormField, FormItem, FormMessage } from "./ui/form";
import { useFormContext } from "react-hook-form";
import { useDropzone } from "react-dropzone";
import { CameraIcon, XIcon } from "lucide-react";

type Props = {
  handleCancelFileInput?: () => void;
  singlePhoto?: boolean;
  cancelButton?: boolean;
  name?: string;
};

const FileInput = ({
  handleCancelFileInput,
  singlePhoto = true,
  cancelButton = false,
  name = "photos",
}: Props) => {
  const { control, setValue, getValues } = useFormContext();
  const [uploads, setUploads] = useState<string[]>([]);

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
      render={() => (
        <FormItem className="flex-1 h-full flex flex-col">
          <FormControl className="h-full">
            <div
              {...getRootProps()}
              className={`p-4 rounded-md cursor-pointer hover:bg-gray-300 ${
                isDragActive
                  ? "border-gray-900 bg-gray-300"
                  : "border-gray-900 bg-gray-200"
              } relative h-full flex flex-col justify-center`}
            >
              <input {...getInputProps()} />
              {uploads.length === 0 ? (
                <div className="flex flex-col items-center">
                  <CameraIcon className="size-15 text-gray-900 mx-auto mb-2" />
                  <p className="text-gray-900 text-md">Add Photos</p>
                </div>
              ) : (
                <div className="flex flex-wrap gap-2 justify-center">
                  {uploads.map((upload, index) => (
                    <div key={index} className="relative">
                      <img
                        src={upload}
                        alt={`Upload preview ${index + 1}`}
                        className="w-20 h-20 object-cover rounded-md"
                      />
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          removePhoto(index);
                        }}
                        className="absolute -top-2 -right-2 bg-red-500 rounded-full p-1"
                      >
                        <XIcon className="size-4 text-white" />
                      </button>
                    </div>
                  ))}
                  {!singlePhoto && uploads.length > 0 && (
                    <div className="w-20 h-20 flex items-center justify-center border-2 border-dashed border-gray-400 rounded-md">
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
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default FileInput;
