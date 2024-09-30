
import { useMemo } from "react";

import { Alert } from "@mui/material";
import InfiniteScroll from "react-infinite-scroller";

import UserCard from "./UserCard";
import Loader from "./Loader";
import { User } from "../types";
import useUsers from "../hooks/useUsers";

interface UsersProps {
  query: string;
}

export default function Users({ query }: UsersProps) {
  const { data, error, isLoading, fetchNextPage, hasNextPage } =
    useUsers(query);

  
  // Reduce and memorize results from infinite react query
  const reducedData = useMemo(() => {
    if (data?.pages) {
      return data.pages.reduce(
        (prev, curr) => [
          ...prev,
          ...curr.items.map((item) => ({
            username: item.login,
            avatarUrl: item.avatar_url,
            id: item.id,
          })),
        ],
        [] as User[]
      );
    }
    return null;
  }, [data]);

  if (error)
    return (
      <Alert variant="filled" severity="error">
        {error.message}
      </Alert>
    );

  if (isLoading) return <Loader />;

  if (reducedData) {
    return reducedData.length === 0 ? (
      <Alert severity="warning">No data for searched query.</Alert>
    ) : (
      <InfiniteScroll
        loadMore={() => fetchNextPage()}
        hasMore={hasNextPage}
        loader={<Loader key="loader" />}
      >
        {reducedData.map((item) => (
          <UserCard
            key={item.id}
            avatarUrl={item.avatarUrl}
            username={item.username}
          />
        ))}
      </InfiniteScroll>
    );
  }

  return null;
}
