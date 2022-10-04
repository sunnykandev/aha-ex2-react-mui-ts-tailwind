import ImageWithFallback from "../ImageWithFallback";

export default function FriendInfoListItem({
  name = "",
  username = "",
  avatar = "",
  isFollowing = false,
}) {
  const styles = {
    followButton: {
      fontFamily: "Open Sans",
      fontWeight: 600,
      paddingLeft: "10px",
      paddingRight: "10px",
      height: "28px",
      marginTop: "5px",
      marginRight: "-1px",
    },
    userInfo: {
      marginBottom: "3.1px",
      marginLeft: "1px",
    },
    name: {
      marginTop: "-2px",
    },
    userName: {
      lineHeight: 1.3,
    },
  };

  return (
    <>
      <div className="flex flex-row justify-between p-2">
        <div style={styles.userInfo} className="flex flex-row space-x-4">
          <div className="rounded-md">
            <ImageWithFallback
              className="border border-1 border-white rounded-md"
              fallbackSrc={"/images/sample-user.png"}
              src={avatar}
              alt="userAvatar"
              width={40}
              height={40}
            />
          </div>
          <div className="flex flex-col">
            <div style={styles.name} className="text-base text-white">
              {name}
            </div>
            <div
              style={styles.userName}
              className="text-sm text-white text-opacity-50"
            >
              @{username}
            </div>
          </div>
        </div>
        <div>
          {isFollowing ? (
            <button
              style={styles.followButton}
              className="border border-white rounded-full bg-white text-black  hover:text-white hover:bg-black hover:border hover:border-white text-xs"
            >
              Following
            </button>
          ) : (
            <button
              style={styles.followButton}
              className="border border-white rounded-full text-white  hover:text-black hover:bg-white hover:border hover:border-black text-xs"
            >
              Follow
            </button>
          )}
        </div>
      </div>
    </>
  );
}
