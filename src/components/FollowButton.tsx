import { useUpdateFollow } from "api/mutations";
import { useGetCurrentUser } from "api/queries";
import { useHistory } from "react-router-dom";
import { Profile } from "utils/types";

type FollowButtonProps = {
  profile: Profile;
  actionButton?: boolean;
};

export default function FollowButton({ profile, actionButton = false }: FollowButtonProps) {
  const history = useHistory();

  const { data: currentUser, isFetching: isCurrentUserFetching } = useGetCurrentUser();

  const { mutate: updateFollow, isLoading } = useUpdateFollow();

  if (isCurrentUserFetching || currentUser?.username === profile.username) return null;

  const handleClick = () => {
    if (!currentUser) {
      history.push("/login");
      return;
    }

    updateFollow({ username: profile.username, following: profile.following });
  };

  return (
    <button
      className={`btn btn-sm btn-outline-secondary${actionButton ? " action-btn" : ""}`}
      type="button"
      disabled={isLoading}
      onClick={handleClick}
    >
      <i className={profile.following ? "ion-minus-round" : "ion-plus-round"} />
      &nbsp; {profile.following ? "Unfollow" : "Follow"} {profile.username}
    </button>
  );
}
