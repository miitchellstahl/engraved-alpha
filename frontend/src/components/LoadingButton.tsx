import { Loader2 } from "lucide-react";
import { Button } from "./ui/button";

type Props = {
  children: React.ReactNode;
};

const LoadingButton = ({ children }: Props) => {
  return (
    <Button disabled>
      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
      {children}
    </Button>
  );
};

export default LoadingButton;
