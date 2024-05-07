import { useUserContext } from "@/context/AuthContext";
import {
  useDeleteSavedPost,
  useGetCurrentUser,
  useLikePost,
  useSavePost,
} from "@/lib/react-query/queries";
import { Models } from "appwrite";
import Loader from "@/components/shared/Loader";
import { useEffect, useState } from "react";

type PostStatsProps = {
  post: Models.Document;
  userId: string;
};

const PostStats = ({ post, userId }: PostStatsProps) => {
  const { mutateAsync: likePostMutateAsync } = useLikePost();
  const { mutateAsync: savePostMutateAsync, isPending: isPendingSavePost } =
    useSavePost();
  const {
    mutateAsync: deleteSavedMutateAsync,
    isPending: isPendingDeleteSavePost,
  } = useDeleteSavedPost();
  const likesList = post.likes.map((user: Models.Document) => user.$id);
  const [likes, setLikes] = useState<string[]>(likesList);
  const [isSaved, setIsSaved] = useState(false);
  const { data: currentUser } = useGetCurrentUser();
  //console.log("user", currentUser);
  const savedPostRecord = currentUser?.save.find(
    (record: Models.Document) => record.post.$id === post.$id
  );
  useEffect(() => {
    setIsSaved(!!savedPostRecord);
  }, [currentUser]);

  const handleLikePost = async (
    e: React.MouseEvent<HTMLImageElement, MouseEvent>
  ) => {
    e.stopPropagation();
    let likesArray = [...likes];
    // in if condition it means user has already liked it but trying to unlike it and in else condition user liking it
    if (likesArray.includes(userId)) {
      likesArray = likesArray.filter((id) => id != userId);
    } else {
      likesArray.push(userId);
    }
    setLikes(likesArray);
    await likePostMutateAsync({ postId: post.$id, likesArray: likesArray });
  };

  const handleSavePost = async (
    e: React.MouseEvent<HTMLImageElement, MouseEvent>
  ) => {
    e.stopPropagation();
    if (savedPostRecord) {
      setIsSaved(false);
      await deleteSavedMutateAsync(savedPostRecord.$id);
      return;
    }
    await savePostMutateAsync({ userId: userId, postId: post.$id });
    setIsSaved(true);
  };

  return (
    <div className="flex justify-between items-center z-20">
      <div className="flex gap-2 mr-5">
        <img
          src={
            likes.includes(userId)
              ? "/src/assets/icons/liked.svg"
              : "/src/assets/icons/like.svg"
          }
          alt=""
          height={20}
          width={20}
          className="cursor-pointer"
          onClick={(e) => {
            handleLikePost(e);
          }}
        />
        <p className="small-medium lg:base-medium">{likes.length}</p>
      </div>
      <div className="flex gap-2 mr-5">
        {isPendingSavePost || isPendingDeleteSavePost ? (
          <Loader></Loader>
        ) : (
          <img
            src={
              isSaved
                ? "/src/assets/icons/saved.svg"
                : "/src/assets/icons/save.svg"
            }
            alt=""
            height={20}
            width={20}
            className="cursor-pointer"
            onClick={(e) => handleSavePost(e)}
          />
        )}
      </div>
    </div>
  );
};

export default PostStats;
