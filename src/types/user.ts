export interface User {
  id: number;
  name: string;
  email: string;
  password: string;
}

export interface UserState {
  users: User[] | null;
  currentUserId: number | null;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}
