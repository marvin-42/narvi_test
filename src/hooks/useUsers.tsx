import { useInfiniteQuery } from "@tanstack/react-query";

import { fetchUsers } from "../services/api";

const perPage = 30

export default function useUsers(query: string) {
  return useInfiniteQuery({
    queryKey: ["users", query],
    queryFn: ({ pageParam }) =>
      fetchUsers({ q: query, page: pageParam, perPage }),
    initialPageParam: 1,
    getNextPageParam: (lastPage, _, lastPageParam) => {
      if (lastPage.items.length === perPage) {
        return lastPageParam + 1;
      }
    },
    enabled: !!query,
  });
}
