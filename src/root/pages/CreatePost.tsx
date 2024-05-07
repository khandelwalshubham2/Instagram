import PostForm from "@/components/form/PostForm";

const CreatePost = () => {
  return (
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
        <PostForm action="Create"></PostForm>
      </div>
    </div>
  );
};

export default CreatePost;
