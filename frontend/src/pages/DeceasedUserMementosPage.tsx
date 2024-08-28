import { getAllDeceasedUserMementos } from "@/api/DeceasedUserApi";
import DeceasedUserTabPage from "./DeceasedUserTabPage";

const DeceasedUserMementosPage = () => {
  return (
    <DeceasedUserTabPage
      fetchData={getAllDeceasedUserMementos}
      dataKey="Mementos"
    />
  );
};

export default DeceasedUserMementosPage;
