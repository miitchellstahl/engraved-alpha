import { MementoPostData, PostComponentProps } from "@/types";
import MementoComponent from "../MementoComponent";

const MementoPost = ({ postData }: PostComponentProps) => {
  const { content, author, date, type } = postData as MementoPostData;
  return (
    <MementoComponent
      type={type}
      content={content}
      date={date}
      title={author}
    />
  );
};

export default MementoPost;
