export interface UsersParams {
  q: string;
  page: number;
  perPage: number;
}

export interface UsersData {
  total_count: number;
  incomplete_results: boolean;
  items: Array<{
    id: string;
    login: string;
    avatar_url: string;
  }>;
}

export interface User {
  id: string;
  avatarUrl: string;
  username: string;
}
