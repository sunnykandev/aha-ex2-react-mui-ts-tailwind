import { Skeleton } from "@mui/material";

const styles = {
  gridItem: {
    margin: "18px",
    marginBottom: "11px",
  },
  imageSkeleton: {
    height: "0px",
    paddingBottom: "66%",
  },
};

export default function AnimalItemSkeleton() {
  return (
    <>
      <div style={styles.gridItem}>
        <Skeleton
          animation="wave"
          component="div"
          sx={{ transform: "scale(1)" }}
          style={styles.imageSkeleton}
        />
        <Skeleton
          animation="wave"
          width={150}
          height={12}
          component="div"
          sx={{ transform: "scale(1)" }}
          className="mb-2 mt-3"
        />
        <Skeleton
          animation="wave"
          width={100}
          height={12}
          component="div"
          sx={{ transform: "scale(1)" }}
        />
      </div>
    </>
  );
}
