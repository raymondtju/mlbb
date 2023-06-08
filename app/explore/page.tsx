import ExploreDialog from "@/components/explore/explore-dialog";
import PostForm from "@/components/explore/post-form";
import PostList from "@/components/explore/post-list";
import { Button } from "@/components/shared/button";
import getCurrentUser from "@/lib/actions/getCurrentUser";
import getPosts from "@/lib/actions/getPosts";

async function ExplorePage() {
  const currentUser = await getCurrentUser();
  const posts = await getPosts();

  return (
    <>
      <div className="flex flex-row gap-6">
        <div>Search Bar PlaceHolder </div>
        {currentUser && (
          <ExploreDialog
            title="Edit"
            triggerChild={<Button>Create a new post</Button>}
          >
            <PostForm />
          </ExploreDialog>
        )}
      </div>
      <div>{posts && <PostList posts={posts} />}</div>
    </>
  );
}

export default ExplorePage;
