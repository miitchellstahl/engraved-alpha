import { createContext, useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getDeceasedUserElementCounts } from "./api/DeceasedUserApi";
import { useQuery } from "react-query";
import { Album } from "./types";

interface NavigationContextProps {
  currentPage: number;
  goToNextPage: () => void;
  goToPreviousPage: () => void;
  pages: { name: string; path: string }[];
  deceasedUserCount: number;
}

const NavigationContext = createContext<NavigationContextProps>({
  currentPage: 0,
  goToNextPage: () => {},
  goToPreviousPage: () => {},
  pages: [],
  deceasedUserCount: 0,
});

type Props = {
  children: React.ReactNode;
};

export const useNavigation = () => {
  return useContext(NavigationContext);
};

export const NavigationProvider = ({ children }: Props) => {
  const { deceasedUserId } = useParams();
  const navigate = useNavigate();

  const [currentPage, setCurrentPage] = useState(0);
  const [pages, setPages] = useState<{ name: string; path: string }[]>([]);

  const { data: deceasedUserCount } = useQuery(
    ["getDeceasedUserCounts", deceasedUserId],
    () => getDeceasedUserElementCounts(deceasedUserId as string),
    { enabled: !!deceasedUserId }
  );

  useEffect(() => {
    if (deceasedUserCount) {
      const dynamicPages = [
        { name: "Home", path: `/profile/${deceasedUserId}` },
        ...(deceasedUserCount.photoCount > 0
          ? [{ name: "Photos", path: `/profile/${deceasedUserId}/photos` }]
          : []),
        ...(deceasedUserCount.petCount > 0
          ? [{ name: "Pets", path: `/profile/${deceasedUserId}/pets` }]
          : []),
        ...(deceasedUserCount.placeCount > 0
          ? [{ name: "Places", path: `/profile/${deceasedUserId}/places` }]
          : []),
        ...(deceasedUserCount.albumCount > 0
          ? [{ name: "Albums", path: `/profile/${deceasedUserId}/albums` }]
          : []),
        ...deceasedUserCount?.albumTitles.map((album: Album) => ({
          name: album.title,
          path: `/profile/${deceasedUserId}/album/${album._id}`,
        })),
      ];

      setPages(dynamicPages);
    }
  }, [deceasedUserCount, deceasedUserId]);

  // Update currentPage based on current location path
  useEffect(() => {
    const path = location.pathname.toLowerCase();

    const pageIndex = pages.findIndex((page) => page.path === path);
    if (pageIndex !== -1) {
      setCurrentPage(pageIndex);
    }
  }, [location.pathname, pages]);

  const goToNextPage = () => {
    if (currentPage < pages.length - 1) {
      setCurrentPage(currentPage + 1);
      navigate(pages[currentPage + 1].path);
    }
  };

  const goToPreviousPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
      navigate(pages[currentPage - 1].path);
    }
  };

  return (
    <NavigationContext.Provider
      value={{
        currentPage,
        goToNextPage,
        goToPreviousPage,
        pages,
        deceasedUserCount,
      }}
    >
      {children}
    </NavigationContext.Provider>
  );
};
