import { GraphQLClient } from "graphql-request";

interface Variables {
  [key: string]: string;
}

export const requestGraphQL = async <T>(query: string, variables?: Variables): Promise<T> => {
  const urlGraphql = process.env.NEXT_PUBLIC_URL;
  const token = process.env.NEXT_PUBLIC_TOKEN;

  if (!urlGraphql || !token) {
    throw new Error("Missing GraphQL URL or Authorization token");
  }

  const client = new GraphQLClient(urlGraphql);
  client.setHeader("Authorization", `Bearer ${token}`);

  try {
    return await client.request<T>(query, variables);
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};