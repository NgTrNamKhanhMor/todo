import { useSelector } from "react-redux";
import { RootState } from "~redux/store";

export const selectCurrentUserId = () => {
  const currentUserId = useSelector(
    (state: RootState) => state.user.currentUserId
  );

  return currentUserId || null;
};
