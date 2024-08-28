import FileInput from "./FileInput";
import { Button } from "./ui/button";

const PersonalizeAddPhotosModal = () => {
  return (
    <div className="space-y-4">
      <h1>Add Photos</h1>
      <FileInput singlePhoto={false} />
      <Button>Save</Button>
    </div>
  );
};

export default PersonalizeAddPhotosModal;
