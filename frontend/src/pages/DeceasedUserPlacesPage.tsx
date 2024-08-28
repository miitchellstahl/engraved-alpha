import { getAllDeceasedUserPlaces } from "@/api/DeceasedUserApi";
import DeceasedUserTabPage from "./DeceasedUserTabPage";

const DeceasedUserPlacesPage = () => {
  return (
    <DeceasedUserTabPage
      fetchData={getAllDeceasedUserPlaces}
      dataKey="Places"
    />
  );
};

export default DeceasedUserPlacesPage;
