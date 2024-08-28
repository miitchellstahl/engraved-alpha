import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import { CreditCard, Stars } from "lucide-react";

type Props = {
  firstName: String;
};

const DeceasedUserButtonHeader = ({ firstName }: Props) => {
  return (
    <div className="button-group flex flex-col xl:flex-row w-full gap-4">
      <Link to="/" className="flex-1">
        <Button className="h-8 rounded-md flex gap-2 bg-indigo-100 text-indigo-900 hover:bg-indigo-200">
          <Stars size={18} />
          <span>Pay respects to {firstName}</span>
        </Button>
      </Link>

      <Link to="/" className="flex-1">
        <Button className="h-8 rounded-md flex gap-2 bg-pink-100 text-pink-900 hover:bg-pink-200">
          <CreditCard size={18} />{" "}
          <span>Donate to charity in the name of {firstName}</span>
        </Button>
      </Link>
    </div>
  );
};

export default DeceasedUserButtonHeader;
