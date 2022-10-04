import Skeleton from "@mui/material/Skeleton";

export default function FriendItemSkeleton() {
  const styles = {
    userInfo: {
      marginBottom: "3.1px",
      marginLeft: "1px",
    },
  };

  return (
    <>
      <div className="flex flex-row justify-between p-3">
        <div style={styles.userInfo} className="flex flex-row space-x-4">
          <div className="rounded-md">
            <Skeleton
              animation="wave"
              width={40}
              height={40}
              component="div"
              sx={{ transform: "scale(1)" }}
            />
          </div>
          <div className="flex flex-col">
            <Skeleton
              animation="wave"
              width={250}
              height={12}
              component="div"
              sx={{ transform: "scale(1)" }}
              className="mb-2"
            />
            <Skeleton
              animation="wave"
              width={150}
              height={12}
              component="div"
              sx={{ transform: "scale(1)" }}
            />
          </div>
        </div>
      </div>
    </>
  );
}
