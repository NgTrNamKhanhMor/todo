export interface User {
  id: number;
  name: string;
  email: string;
  password: string;
}

export interface UserState {
  currentUserId: number | null;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}
