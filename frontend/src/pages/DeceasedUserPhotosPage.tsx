import { getAllDeceasedUserPhotos } from "@/api/DeceasedUserApi";
import DeceasedUserTabPage from "./DeceasedUserTabPage";

const DeceasedUserPhotosPage = () => {
  return (
    <DeceasedUserTabPage
      fetchData={getAllDeceasedUserPhotos}
      dataKey="Photos"
    />
  );
};

export default DeceasedUserPhotosPage;
