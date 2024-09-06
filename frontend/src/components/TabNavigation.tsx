import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "./ui/button";
import { useNavigation } from "@/NavigationContext";
import { Skeleton } from "./ui/skeleton";
import MiniWeather from "./MiniWeather";
const MAP_API_KEY = import.meta.env.VITE_MAP_API_KEY;

type WeatherDescription =
  | "Clear"
  | "Thunderstorm"
  | "Drizzle"
  | "Rain"
  | "Snow"
  | "Atmosphere"
  | "Haze"
  | "Clouds";

type Props = {
  data: any;
  isLoading: boolean;
  weatherTimezone?: number;
  sunsetTimestamp?: number;
  sunriseTimestamp?: number;
  description?: WeatherDescription;
  isWeatherLoading?: boolean;
};

const TabNavigation = ({
  data,
  isLoading,
  weatherTimezone,
  sunriseTimestamp,
  sunsetTimestamp,
  description,
  isWeatherLoading,
}: Props) => {
  const { goToNextPage, goToPreviousPage, currentPage, pages } =
    useNavigation();

  const currentDate = new Date();

  return (
    <div className="flex justify-between my-4 mt-0 px-6 xl:px-0">
      <div className="prev-and-content flex gap-4 items-center">
        <div className="flex items-center gap-2">
          <Button
            className="h-8 rounded-md w-fit flex gap-2 bg-gray-200 text-gray-900 hover:bg-gray-300"
            onClick={goToPreviousPage}
            disabled={currentPage === 0}
          >
            <ChevronLeft size={15} />
            {pages[currentPage - 1]?.name === "Home" ? (
              <>
                {data?.deceasedUser?.firstName} {data?.deceasedUser?.lastName}
              </>
            ) : (
              pages[currentPage - 1]?.name
            )}
          </Button>
        </div>

        <div className="label flex gap-4 items-center">
          {isLoading ? (
            <Skeleton className="h-4 w-[85px] shadow-md" />
          ) : (
            <>
              {pages[currentPage]?.name !== "Home" ? (
                <h2 className="text-md font-semibold">
                  {pages[currentPage]?.name}
                </h2>
              ) : (
                <h2 className="text-md font-semibold">
                  {data?.firstName} {data?.lastName}
                </h2>
              )}
            </>
          )}
          {pages[currentPage]?.name === "Photos" ? (
            <div className="label-images flex">
              {isLoading ? (
                <>
                  <Skeleton className="h-8 w-8 object-cover rounded-sm border border-white border-2 shadow-md" />
                  <Skeleton className="h-8 w-8 object-cover rounded-sm border border-white border-2 -ml-3 shadow-md" />
                  <Skeleton className="h-8 w-8 object-cover rounded-sm border border-white border-2 -ml-3 shadow-md" />
                  <Skeleton className="h-8 w-8 object-cover rounded-sm border border-white border-2 -ml-3 shadow-md" />
                  <Skeleton className="h-8 w-8 object-cover rounded-sm border border-white border-2 -ml-3 shadow-md" />
                </>
              ) : (
                <div className="label-images flex">
                  {data?.photos?.map((photo: any, index: number) => (
                    <img
                      key={index}
                      className={`h-8 w-8 object-cover rounded-sm border border-white border-2 ${
                        index !== 0 ? "-ml-3" : ""
                      } shadow-md`}
                      src={photo?.photoUrl}
                      alt=""
                    />
                  ))}

                  <div
                    className="h-8 w-10 rounded-sm border border-white border-2 flex items-center justify-center -ml-3 bg-gray-100
              "
                  >
                    <span className="text-sm font-light ">{data?.count}</span>
                  </div>
                </div>
              )}
            </div>
          ) : null}

          {pages[currentPage]?.name === data?.album?.title ? (
            <div className="label-images flex">
              {isLoading ? (
                <>
                  <Skeleton className="h-8 w-8 object-cover rounded-sm border border-white border-2 shadow-md" />
                  <Skeleton className="h-8 w-8 object-cover rounded-sm border border-white border-2 -ml-3 shadow-md" />
                  <Skeleton className="h-8 w-8 object-cover rounded-sm border border-white border-2 -ml-3 shadow-md" />
                  <Skeleton className="h-8 w-8 object-cover rounded-sm border border-white border-2 -ml-3 shadow-md" />
                  <Skeleton className="h-8 w-8 object-cover rounded-sm border border-white border-2 -ml-3 shadow-md" />
                </>
              ) : (
                <div className="label-images flex">
                  {data?.album?.photos?.map((photo: any, index: number) => (
                    <img
                      key={index}
                      className={`h-8 w-8 object-cover rounded-sm border border-white border-2 ${
                        index !== 0 ? "-ml-3" : ""
                      } shadow-md`}
                      src={photo?.photoUrl}
                      alt=""
                    />
                  ))}
                  <div
                    className="h-8 w-10 rounded-sm border border-white border-2 flex items-center justify-center -ml-3 bg-gray-100
              "
                  >
                    <span className="text-sm font-light ">{data?.count}</span>
                  </div>
                </div>
              )}
            </div>
          ) : null}

          {pages[currentPage]?.name === "Places" ? (
            <div className="label-map flex">
              {isLoading ? (
                <>
                  <Skeleton className="h-8 w-8 object-cover rounded-sm border border-white border-2 shadow-md" />
                  <Skeleton className="h-8 w-8 object-cover rounded-sm border border-white border-2 -ml-3 shadow-md" />
                  <Skeleton className="h-8 w-8 object-cover rounded-sm border border-white border-2 -ml-3 shadow-md" />
                  <Skeleton className="h-8 w-8 object-cover rounded-sm border border-white border-2 -ml-3 shadow-md" />
                  <Skeleton className="h-8 w-8 object-cover rounded-sm border border-white border-2 -ml-3 shadow-md" />
                </>
              ) : (
                <div className="label-map flex">
                  {data?.places?.map((place: any, index: number) => (
                    <img
                      key={index}
                      className={`h-8 w-8 object-cover rounded-sm border border-white border-2 ${
                        index !== 0 ? "-ml-3" : ""
                      } shadow-md`}
                      src={`https://maps.googleapis.com/maps/api/staticmap?center=${place?.placeLatitude},${place?.placeLongitude}&zoom=17&size=400x400&key=${MAP_API_KEY}`}
                      alt=""
                    />
                  ))}
                  <div
                    className="h-8 w-10 rounded-sm border border-white border-2 flex items-center justify-center -ml-3 bg-gray-100
              "
                  >
                    <span className="text-sm font-light ">{data?.count}</span>
                  </div>
                </div>
              )}
            </div>
          ) : null}

          {pages[currentPage]?.name === "Home" ? (
            <div className="label-images flex">
              {isLoading && isWeatherLoading ? (
                <>
                  {" "}
                  <Skeleton className="h-8 w-8 object-cover rounded-sm border border-white border-2 shadow-md" />
                  <Skeleton className="h-8 w-8 object-cover rounded-sm border border-white border-2 -ml-3 shadow-md" />
                  <Skeleton className="h-8 w-8 object-cover rounded-sm border border-white border-2 -ml-3 shadow-md" />
                  <Skeleton className="h-8 w-8 object-cover rounded-sm border border-white border-2 -ml-3 shadow-md" />
                  <Skeleton className="h-8 w-8 object-cover rounded-sm border border-white border-2 -ml-3 shadow-md" />
                </>
              ) : (
                <>
                  <img
                    className={`h-8 w-8 object-cover rounded-sm border border-white border-2 shadow-md`}
                    src={data?.profilePhotoUrl}
                    alt=""
                  />

                  <img
                    className={`h-8 w-8 object-cover rounded-sm border border-white border-2 -ml-3 shadow-md`}
                    src={`https://maps.googleapis.com/maps/api/staticmap?center=${data?.cityDiedLatitude},${data?.cityDiedLongitude}&zoom=17&size=400x400&key=${MAP_API_KEY}`}
                    alt=""
                  />

                  <div className="mini-weather"></div>

                  {data?.photos?.length > 0 && (
                    <img
                      className={`h-8 w-8 object-cover rounded-sm border border-white border-2 -ml-3 shadow-md`}
                      src={data?.photos?.[0]?.photoUrl}
                      alt=""
                    />
                  )}

                  {data?.pets?.length > 0 && (
                    <img
                      className={`h-8 w-8 object-cover rounded-sm border border-white border-2 -ml-3 shadow-md`}
                      src={data?.pets?.[0]?.photoUrl}
                      alt=""
                    />
                  )}
                  <MiniWeather
                    currentDate={currentDate}
                    weatherTimezone={weatherTimezone as number}
                    sunsetTimestamp={sunsetTimestamp as number}
                    sunriseTimestamp={sunriseTimestamp as number}
                    description={description as WeatherDescription}
                  />
                </>
              )}
            </div>
          ) : null}

          {pages[currentPage]?.name === "Albums" ? (
            <div className="label-albums flex">
              {isLoading ? (
                <>
                  <Skeleton className="h-8 w-16 object-cover rounded-sm border border-white border-2 shadow-md" />
                  <Skeleton className="h-8 w-16 object-cover rounded-sm border border-white border-2 -ml-3 shadow-md" />
                </>
              ) : (
                <div className="label-albums flex">
                  {data?.albums?.map((album: any, index: number) => (
                    <img
                      key={index}
                      className={`h-8 w-16 object-cover rounded-sm border border-white border-2 ${
                        index !== 0 ? "-ml-3" : ""
                      } shadow-md`}
                      src={album?.photos?.[0]?.photoUrl}
                      alt=""
                    />
                  ))}
                  <div
                    className="h-8 w-16 rounded-sm border border-white border-2 flex items-center justify-center -ml-3 bg-gray-100
              "
                  >
                    <span className="text-sm font-light ">{data?.count}</span>
                  </div>
                </div>
              )}
            </div>
          ) : null}

          {pages[currentPage]?.name === "Pets" ? (
            <div className="label-pets flex">
              {isLoading ? (
                <>
                  <Skeleton className="h-8 w-8 object-cover rounded-sm border border-white border-2 shadow-md" />
                  <Skeleton className="h-8 w-8 object-cover rounded-sm border border-white border-2 -ml-3 shadow-md" />
                </>
              ) : (
                <div className="label-pets flex">
                  {data?.pets?.map((pet: any, index: number) => (
                    <img
                      key={index}
                      className={`h-8 w-8 object-cover rounded-sm border border-white border-2 ${
                        index !== 0 ? "-ml-3" : ""
                      } shadow-md`}
                      src={pet?.photoUrl}
                      alt=""
                    />
                  ))}

                  <div
                    className="h-8 w-10 rounded-sm border border-white border-2 flex items-center justify-center -ml-3 bg-gray-100
              "
                  >
                    <span className="text-sm font-light ">{data?.count}</span>
                  </div>
                </div>
              )}
            </div>
          ) : null}
        </div>
      </div>

      <Button
        className="h-8 rounded-md w-fit flex gap-2 bg-indigo-100 text-indigo-900 hover:bg-indigo-200"
        onClick={goToNextPage}
        disabled={currentPage === pages?.length - 1}
      >
        {pages[currentPage + 1]?.name}
        <ChevronRight size={15} />
      </Button>
    </div>
  );
};

export default TabNavigation;
