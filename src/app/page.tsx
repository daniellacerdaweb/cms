import { requestGraphQL } from "@/service/graphql";
import Link from "next/link";

const query = `query Posts {
  posts {
    id
    description
    title
    image {
      url
    }
  }
}`;

interface Post {
  id: string;
  description: string;
  title: string;
  image: {
    url: string;
  };
}

interface PostsQueryResponse {
  posts: Post[];
}

export default async function Home() {
  const data = await requestGraphQL<PostsQueryResponse>(query);
  return (
    <>
      {data?.posts.map((item) => {
        return (
          <Link key={item.id} href={`/${item.id}`}>
            {item.title}
          </Link>
        );
      })}
    </>
  );
}
