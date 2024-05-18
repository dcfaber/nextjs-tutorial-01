import getUser from "../../lib/getUser";
import getUserPosts from "../../lib/getUserPosts";
import UserPosts from "./components/UserPosts";
import type { Metadata } from "next";
import { Suspense } from "react";

type Params = {
  params: { userId: string };
};

export async function generateMetadata({
  params: { userId },
}: Params): Promise<Metadata> {
  const user = await getUser(userId);

  return {
    title: user.name,
  };
}

export default async function UserPage({ params: { userId } }: Params) {
  const userData: Promise<User> = getUser(userId);
  const userPostData: Promise<Post[]> = getUserPosts(userId);

  const user = await userData;

  return (
    <>
      <h2>{user.name}</h2>
      <br />
      <Suspense fallback={<h2>Loading...</h2>}>
        <UserPosts promise={userPostData} />
      </Suspense>
    </>
  );
}
