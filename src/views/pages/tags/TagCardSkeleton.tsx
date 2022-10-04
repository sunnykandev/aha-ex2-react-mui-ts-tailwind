import { Skeleton } from "@mui/material";

export default function TagCard() {
  return (
    <div className="w-full">
      <Skeleton
        className="mb-2 flex flex-col rounded-lg bg-white bg-opacity-5 w-full aspect-square"
        animation="wave"
        height={100}
        component="div"
        sx={{ transform: "scale(1)" }}
      />
      <Skeleton
        className="mb-2"
        animation="wave"
        width={60}
        height={12}
        component="div"
        sx={{ transform: "scale(1)" }}
      />
      <Skeleton
        animation="wave"
        width={40}
        height={10}
        component="div"
        sx={{ transform: "scale(1)" }}
      />
    </div>
  );
}
