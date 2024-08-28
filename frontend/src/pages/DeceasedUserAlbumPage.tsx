import { getAlbum } from "@/api/DeceasedUserApi";
import DeceasedUserTabPage from "./DeceasedUserTabPage";

const DeceasedUserAlbumPage = () => {
  return <DeceasedUserTabPage fetchData={getAlbum} dataKey="Album" />;
};

export default DeceasedUserAlbumPage;
