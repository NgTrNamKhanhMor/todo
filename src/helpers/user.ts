import { useSelector } from "react-redux";
import { RootState } from "~redux/store";

export const selectCurrentUser = () => {
  const userSlice = useSelector((state: RootState) => state.user);
  return (
    userSlice.users?.find((user) => user.id === userSlice.currentUserId) || null
  );
};
