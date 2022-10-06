import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Stack, Typography } from "@mui/material";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";

import Api from "../../../service/Api";
import TagCard from "./TagCard";
import TagCardSkeleton from "./TagCardSkeleton";

export default function Tags() {
  const [tagsData, setTagsData] = useState<TagInfo[]>([]);
  const navigation = useNavigate();

  interface TagInfo {
    name: string;
    count: number;
  }

  useEffect(() => {
    Api()
      .get("https://avl-frontend-exam.herokuapp.com/api/tags")
      .then((res) => {
        setTagsData(res?.data);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="w-full flex flex-row">
      <div className="w-full px-[13px] sm:px-[50px] md:px-[100px] lg:px-[100px] xl:px-[245px] pt-[80px] md:pt-[65px]">
        <Stack spacing={2}>
          <div className="md:hidden flex flex-row items-center ml-[12px] md:ml-[-21px] mt-[-63px] mb-[22px]">
            <ArrowBackIosIcon
              fontSize="medium"
              onClick={() => navigation("/")}
              className="cursor-pointer mr-[10px] h-[24px] text-white"
            />
            <Typography className="text-[24px] md:text-[30px]">
              Home Page
            </Typography>
          </div>
          <Typography className="text-[24px] md:text-[30px] ml-[7px] md:ml-[12px]">
            Tags
          </Typography>
          <div className="mt-[21px] md:mt-[24px] grid grid-cols-2 md:grid-cols-3  lg:grid-cols-4 xl:grid-cols-5">
            {tagsData.length
              ? tagsData.map((item: TagInfo, index: number) => (
                  <div
                    key={`${item.name}-${index}`}
                    className="mx-[12px] mb-[25px] md:mb-[36px]"
                  >
                    <TagCard tagName={item.name} resultCount={item.count} />
                  </div>
                ))
              : [...Array(20)].map((value: null | undefined, index: number) => (
                  <div
                    key={`skeleton-${value}-${index}`}
                    className="mx-[12px] mb-[25px] md:mb-[36px]"
                  >
                    <TagCardSkeleton />
                  </div>
                ))}
          </div>
        </Stack>
      </div>
    </div>
  );
}
