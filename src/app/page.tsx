import CreatePost from "@/components/CreatePost";
import LeftMenu from "@/components/LeftMenu";
import PostFeed from "@/components/feed/PostFeed";
import RightMenu from "@/components/rightMenu/RightMenu";
import Stories from "@/components/feed/Stories";

export default function Home() {
  return (
    <div className="flex gap-6 py-5">
      <div className="hidden xl:block w-[20%]"><LeftMenu pageType={'home'} /></div>
      <div className="w-full lg:w-[70%] xl:w-[50%]">
        <div className="flex flex-col gap-2">
          <Stories />
          <CreatePost />
          <PostFeed />
        </div>
      </div>
      <div className="hidden lg:block w-[30%]"><RightMenu /></div>
    </div>
  );
}
