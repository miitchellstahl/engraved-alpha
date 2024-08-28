import { Card, CardHeader } from "../ui/card";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";
import { Camera, MapPin, Music } from "lucide-react";
import { Dialog, DialogContent, DialogTrigger } from "../ui/dialog";
import BaseDialogComponent from "./BaseDialogComponent";
import { useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "../ui/form";
import { useMutation, useQueryClient } from "react-query";
import {
  createMementoPost,
  createPhotoPost,
  createPlacePost,
} from "@/api/DeceasedUserApi";
import { DeceasedUser } from "@/types";
import { APIProvider } from "@vis.gl/react-google-maps";
import PhotoVideoModal from "./PhotoVideoModal";
import PlaceModal from "./PlaceModal";
import SuccessModal from "./SuccessModal";
import { Skeleton } from "../ui/skeleton";
const MAP_API_KEY = import.meta.env.VITE_MAP_API_KEY;

const createFormSchema = (
  isFileInputVisible: boolean,
  isPlaceInputVisible: boolean
) =>
  z.object({
    content: z.string().refine(
      (val) => {
        if (
          !isFileInputVisible &&
          !isPlaceInputVisible &&
          val.trim().length === 0
        ) {
          console.log(val);
          console.log("A regular memento needs a description here");
          return false;
        }
        console.log(
          "This includes a file input and does not need content or includes content"
        );
        return true;
      },
      { message: "Description is required" }
    ),

    date: z
      .date()
      .optional()
      .refine(
        (date) => {
          // Require date when file input is visible
          if (isFileInputVisible && !date) {
            return false;
          }
          return true;
        },
        { message: "Date is required when a file is attached." }
      ),
    placeName: z
      .string()
      .optional()
      .refine(
        (placeName) => {
          // Require date when file input is visible
          if (isPlaceInputVisible && !placeName) {
            return false;
          }
          return true;
        },
        { message: "Place Name is required when place is attached" }
      ),

    author: z
      .string({ required_error: "Your name is required" })
      .min(1, "Your name is required"),
    location: z.string({ required_error: "Location is required" }).optional(),
    placeLongitude: z
      .number({ required_error: "Longitude is required" })
      .optional(),
    placeLatitude: z
      .number({ required_error: "Latitude is required" })
      .optional(),
    photos: z
      .array(z.instanceof(File))
      .optional()
      .refine(
        (photos) => {
          if (isFileInputVisible && (!photos || photos.length === 0)) {
            return false;
          }
          return true;
        },
        { message: "Photo is required when photo field is present" }
      ),
  });

type Props = {
  deceasedUser: DeceasedUser;
};

type PostMementoForm = z.infer<ReturnType<typeof createFormSchema>>;

const PostMemento = ({ deceasedUser }: Props) => {
  const [open, setOpen] = useState(false);
  const [isFileInputVisible, setIsFileInputVisible] = useState(false);
  const [isPlaceInputVisible, setIsPlaceInputVisible] = useState(false);

  //Modal states
  const [modalType, setModalType] = useState("Default");

  console.log("FILE INPUT VISIBLE" + isFileInputVisible);
  console.log("PLACE INPUT VISIBLE" + isPlaceInputVisible);

  const form = useForm<PostMementoForm>({
    resolver: zodResolver(
      createFormSchema(isFileInputVisible, isPlaceInputVisible)
    ),
    defaultValues: {
      content: "",
      date: undefined,
      author: "",
      location: "",
      photos: [],
    },
  });

  const queryClient = useQueryClient();

  const postMemento = useMutation(
    (mementoFormData: FormData) =>
      createMementoPost(deceasedUser._id, mementoFormData),
    {
      onSuccess: async () => {
        form.reset();
        await queryClient.invalidateQueries("getDeceasedUser");
        await queryClient.invalidateQueries("getWallViewContent");
        await queryClient.invalidateQueries("getDeceasedUserCounts");
        setModalType("Success");
      },
      onError: (error: Error) => {
        console.error(error);
      },
    }
  );

  const postPhoto = useMutation(
    (photoFormData: FormData) =>
      createPhotoPost(deceasedUser._id, photoFormData),
    {
      onSuccess: async () => {
        form.reset();
        await queryClient.invalidateQueries("getDeceasedUser");
        await queryClient.invalidateQueries("getWallViewContent");
        await queryClient.invalidateQueries("getDeceasedUserCounts");
        setModalType("Success");
        setIsFileInputVisible(false);
        setIsPlaceInputVisible(false);
      },
      onError: (error: Error) => {
        console.error(error);
      },
    }
  );

  const postPlace = useMutation(
    (placeFormData: FormData) =>
      createPlacePost(deceasedUser._id, placeFormData),
    {
      onSuccess: async () => {
        await queryClient.invalidateQueries("getDeceasedUser");
        await queryClient.invalidateQueries("getWallViewContent");
        await queryClient.invalidateQueries("getDeceasedUserCounts");
        setModalType("Success");
        setIsFileInputVisible(false);
        setIsPlaceInputVisible(false);
      },
      onError: (error: Error) => {
        console.error(error);
      },
    }
  );

  const onSubmit = (formDataJson: PostMementoForm) => {
    const formData = new FormData();
    if (formDataJson.location)
      formData.append("location", formDataJson.location);
    if (formDataJson.content) {
      formData.append("content", formDataJson.content);
    }
    if (formDataJson.date) {
      formData.append("date", formDataJson.date.toISOString());
    }

    if (formDataJson.placeName) {
      formData.append("placeName", formDataJson.placeName);
    }
    if (formDataJson.placeLatitude) {
      formData.append("placeLatitude", formDataJson.placeLatitude.toString());
    }
    if (formDataJson.placeLongitude) {
      formData.append("placeLongitude", formDataJson.placeLongitude.toString());
    }
    formData.append("author", formDataJson.author);
    // Append photos if present
    if (formDataJson.photos && formDataJson.photos.length > 0) {
      formDataJson.photos.forEach((photo) => {
        formData.append(`photos`, photo);
      });
    }

    console.log(formDataJson);

    if (modalType === "PhotoVideo") {
      postPhoto.mutate(formData);
    } else if (modalType === "Place") {
      postPlace.mutate(formData);
    } else {
      postMemento.mutate(formData);
    }
  };

  const handleContributeAgain = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    form.reset();
    setModalType("Default");
  };

  const openPhotoVideoDialog = () => {
    form.reset();
    setIsFileInputVisible(true);
    setIsPlaceInputVisible(false);
    setModalType("PhotoVideo");
    setIsPlaceInputVisible(false);
    setOpen(true);
  };

  const openPlaceDialog = () => {
    form.reset();
    setModalType("Place");
    setIsFileInputVisible(false);
    setIsPlaceInputVisible(true);
    setOpen(true);
  };

  const openBaseDialog = () => {
    form.reset();
    setIsFileInputVisible(false);
    setIsPlaceInputVisible(false);
    setModalType("Default");
    setOpen(true);
  };

  const handleCancelFileInput = () => {
    if (modalType === "PhotoVideo") {
      setIsFileInputVisible(false);
      setModalType("Default");
    } else if (modalType == "Place") {
      setIsFileInputVisible(false);
    }

    // clearErrors("photo");
    // setValue("photo", undefined);
  };

  const handleCancelPlaceInput = () => {
    if (modalType === "Place") {
      setIsPlaceInputVisible(false);
      setModalType("Default");
    } else if (modalType === "PhotoVideo") {
      setIsPlaceInputVisible(false);
    }
  };

  return (
    <APIProvider apiKey={MAP_API_KEY}>
      <Form {...form}>
        <Dialog open={open} onOpenChange={setOpen}>
          <Card className="shadow-md p-3 space-y-3">
            <CardHeader className="p-0">
              <DialogTrigger asChild onClick={openBaseDialog}>
                {!deceasedUser ? (
                  <Button className="bg-white border-solid border-2 border-gray-100 text-slate-400 font-normal justify-start hover:bg-gray-100 text-sm sm:text-base w-full disabled">
                    <Skeleton className="w-full h-3 rounded-md" />
                  </Button>
                ) : (
                  <Button className="bg-white border-solid border-2 border-gray-100 text-slate-400 font-normal justify-start hover:bg-gray-100 text-sm sm:text-base w-full">
                    Write about {deceasedUser?.firstName}...
                  </Button>
                )}
              </DialogTrigger>
            </CardHeader>
            <Separator />
            <div className="button-group flex gap-3 flex-col md:flex-row ">
              <DialogTrigger asChild onClick={openPhotoVideoDialog}>
                <Button
                  className="h-8 rounded-md flex gap-2 bg-gray-100 text-gray-900 hover:bg-gray-200"
                  type="button"
                >
                  <Camera size={18} />
                  <span>Photo/Video</span>
                </Button>
              </DialogTrigger>
              <DialogTrigger asChild onClick={openPlaceDialog}>
                <Button
                  className="h-8 rounded-md flex gap-2 bg-gray-100 text-gray-900 hover:bg-gray-200"
                  type="button"
                >
                  <MapPin size={18} />
                  <span>Place</span>
                </Button>
              </DialogTrigger>
              <Button
                className="h-8 rounded-md flex gap-2 bg-gray-100 text-gray-900 hover:bg-gray-200"
                type="button"
              >
                <Music size={18} />
                <span>Song</span>
              </Button>
            </div>
          </Card>
          <DialogContent className="overflow-y-scroll max-h-[95%]">
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              {modalType === "PhotoVideo" ? (
                <PhotoVideoModal
                  deceasedUser={deceasedUser}
                  handleCancelFileInput={handleCancelFileInput}
                  isLoading={postPhoto.isLoading}
                  isPlaceInputVisible={isPlaceInputVisible}
                  setIsPlaceInputVisible={setIsPlaceInputVisible}
                  handleCancelPlaceInput={handleCancelPlaceInput}
                />
              ) : modalType === "Place" ? (
                <PlaceModal
                  handleCancelPlaceInput={handleCancelPlaceInput}
                  handleCancelFileInput={handleCancelFileInput}
                  isFileInputVisible={isFileInputVisible}
                  setIsFileInputVisible={setIsFileInputVisible}
                  isLoading={postPlace.isLoading}
                  deceasedUser={deceasedUser}
                />
              ) : modalType === "Success" ? (
                <SuccessModal
                  deceasedUser={deceasedUser}
                  handleContributeAgain={handleContributeAgain}
                />
              ) : (
                <BaseDialogComponent
                  deceasedUser={deceasedUser}
                  isMementoPostLoading={postMemento.isLoading}
                  openPhotoVideoDialog={openPhotoVideoDialog}
                  openPlaceDialog={openPlaceDialog}
                />
              )}
            </form>
          </DialogContent>
        </Dialog>
      </Form>
    </APIProvider>
  );
};

export default PostMemento;
