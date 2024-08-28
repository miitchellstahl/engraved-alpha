import { getDeceasedUserAlbums } from "@/api/DeceasedUserApi";
import DeceasedUserTabPage from "./DeceasedUserTabPage";

const DeceasedUsersAlbumsPage = () => {
  return (
    <DeceasedUserTabPage fetchData={getDeceasedUserAlbums} dataKey="Albums" />
  );
};

export default DeceasedUsersAlbumsPage;
