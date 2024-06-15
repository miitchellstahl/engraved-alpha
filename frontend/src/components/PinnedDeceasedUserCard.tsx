import { Card, CardHeader } from "./ui/card";
import { Separator } from "./ui/separator";

type Props = {
  profilePhoto: string;
  title: string;
  content: string;
};

const PinnedDeceasedUserCard = ({ profilePhoto, title, content }: Props) => {
  return (
    <Card className="p-5 space-y-4 shadow-sm">
      <CardHeader className="flex flex-row gap-4 p-0">
        <img
          className="h-[40px] w-[40px] rounded-sm"
          src={profilePhoto}
          alt=""
        />
        <h2 className="font-bold">{title}</h2>
      </CardHeader>
      <Separator />
      <div className="content whitespace-pre-wrap break-words">{content}</div>
      {/* READ MORE FUNCTIONALITY */}
      {/* {content.length > 1000 && "Read more"} */}
    </Card>
  );
};

export default PinnedDeceasedUserCard;
