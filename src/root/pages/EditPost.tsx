import PostForm from "@/components/form/PostForm";
import { Loader } from "@/components/shared";
import { useGetPostById } from "@/lib/react-query/queries";
import { useParams } from "react-router-dom";

const EditPost = () => {
  const { id } = useParams();
  const { data: post, isLoading } = useGetPostById(id as string);
  return isLoading ? (
    <div className="flex-center w-full h-full">
      <Loader />
    </div>
  ) : (
    <div className="flex flex-1">
      <div className="common-container max-w-5xl">
        <div className="gap-3 flex items-center self-start">
          <img
            src="/src/assets/icons/add-post.svg"
            width={36}
            height={36}
            alt="add"
          />
          <h2 className="h3-bold md:h2-bold text-left w-full">Create Post</h2>
        </div>
        <PostForm action="Update" post={post}></PostForm>
      </div>
    </div>
  );
};

export default EditPost;
