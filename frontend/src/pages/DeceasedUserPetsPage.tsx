import { getAllDeceasedUserPets } from "@/api/DeceasedUserApi";
import DeceasedUserTabPage from "./DeceasedUserTabPage";

const DeceasedUserPetsPage = () => {
  return (
    <DeceasedUserTabPage fetchData={getAllDeceasedUserPets} dataKey="Pets" />
  );
};

export default DeceasedUserPetsPage;
