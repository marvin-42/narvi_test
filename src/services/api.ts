import { UsersParams, UsersData } from "../types";

export const fetchUsers = async ({
  q,
  page,
  perPage,
}: UsersParams): Promise<UsersData> => {
  const params = new URLSearchParams({
    q,
    page: page.toString(),
    per_page: perPage.toString(),
  });
  try {
    const response = await fetch(
      `https://api.github.com/search/users?${params}`
    );
    const json = await response.json();
    if (!response.ok) {
      const errorText = json?.message ?? response.status
      throw new Error(`An error occurred: ${errorText}`);
    }
    return json;
  } catch (error) {
    throw error;
  }
};
