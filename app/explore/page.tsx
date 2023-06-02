import PostButton from "@/components/explore/post-button";
import getCurrentUser from "@/lib/actions/getCurrentUser";

async function ExplorePage() {
  const currentUser = await getCurrentUser();

  return (
    <>
      <div className="flex flex-row gap-6">
        <div>Search Bar PlaceHolder </div>
        {currentUser && <PostButton />}
      </div>
      <div>Post List Placeholder</div>
    </>
  );
}

export default ExplorePage;
