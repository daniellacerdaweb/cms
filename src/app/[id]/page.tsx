import { requestGraphQL } from "@/service/graphql";

const query = `query Post($id: ID!) {
  post(where: { id: $id }) {
    id
    title
    description
    image {
      url
    }
  }
}`;

interface Post  {
  id: string;
  description: string;
  title: string;
  image: {
    url: string;
  };
};

interface PostsQueryResponse  {
  post: Post;
};

interface PostID {
  params: { id: string };
}

export default async function PostID({ params: { id } }: PostID) {
  const {post} = await requestGraphQL<PostsQueryResponse>(query,{id}) ;
  return (
    <>
    
     <p>{post.id}</p>
     <p>{post.description}</p>
     <p>{post.title}</p>
     <p><img src={`${post.image.url}`} /></p>
    </>
  );
}
