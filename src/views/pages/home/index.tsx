import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Divider, Stack, TextField, Typography } from "@mui/material";
import Button from "@mui/material/Button";

import CustomSlider from "../../components/CustomSlider";
import FriendsDrawer from "../../components/FriendsDrawer";

const maxRealValue = 50;
const maxMarkValue = 19;
const maxRegularValue = 15;

const sliderMarks = [
  {
    value: 3,
    label: "3",
  },
  {
    value: 6,
    label: "6",
  },
  {
    value: 9,
    label: "9",
  },
  {
    value: 12,
    label: "12",
  },
  {
    value: maxRegularValue,
    label: maxRegularValue,
  },
  {
    value: maxMarkValue,
    label: maxRealValue,
  },
];

const valuetext = (value: number) => {
  return `${value}`;
};

export default function Home() {
  const navigate = useNavigate();
  const location = useLocation();
  const Keyword: string = location?.state?.keyword;
  const Count: number = location?.state?.count;

  const [searchKeyword, setSearchKeyword] = useState<string>(Keyword || "");
  const [resultCount, setResultCount] = useState<number>(Count || 12);
  const [errorStatus, setErrorStatus] = useState<boolean>(false);

  const onResultsCountChange = (value: number) => {
    let resultValue = value;
    if (value > maxRegularValue) {
      resultValue =
        maxRegularValue +
        ((value - maxRegularValue) * (maxRealValue - maxRegularValue)) /
          (maxMarkValue - maxRegularValue);
      resultValue = Math.round(resultValue);
    }
    return setResultCount(resultValue);
  };

  const handleClickSearch = () => {
    if (!searchKeyword) {
      setErrorStatus(true);
      return;
    }
    navigate("/result", {
      state: { keyword: searchKeyword, count: resultCount },
    });
  };

  const sliderDisplayValue =
    resultCount < maxRegularValue
      ? resultCount
      : Math.round(
          maxRegularValue +
            ((resultCount - maxRegularValue) *
              (maxMarkValue - maxRegularValue)) /
              (maxRealValue - maxRegularValue)
        );

  return (
    <div className="w-full flex flex-row flex-grow">
      <div className="w-full xl-max:w-2/3 px-[20px] sm:px-12 md:px-18 lg:px-32 pt-[72px] sm:pt-14 flex flex-col justify-between flex-grow">
        <Stack spacing={2} className="ml-[1px] mt-[1px]">
          <Typography variant="h5">Search</Typography>
          <TextField
            error={errorStatus}
            helperText={errorStatus && "Search keyword is required."}
            className="h-[60px] mt-[18px] md:mt-[22px] sm-[22px]"
            placeholder="Keyword"
            fullWidth
            name="searchkeyword"
            id="searchkeyword"
            value={searchKeyword}
            onChange={(event) => {
              setErrorStatus(false);
              setSearchKeyword(event.target.value);
            }}
          />
          <Divider className="hidden md:block mt-[28px] mb-[32px]" />
          <Typography variant="h5" className="m-0 mt-[30px] md:mt-0">
            # Of Results Per Page
          </Typography>
          <Typography
            className="mt-[14px] md:mt-[16px] font-bold"
            variant="h3"
            component="div"
          >
            {resultCount} <Typography component="span">results</Typography>
          </Typography>

          <CustomSlider
            className="mt-[3px] md:mt-[7px]"
            aria-label="Custom marks"
            defaultValue={15}
            min={3}
            max={maxMarkValue}
            valueLabelDisplay="off"
            getAriaValueText={valuetext}
            value={sliderDisplayValue}
            marks={sliderMarks}
            onChange={(event: Event) => {
              onResultsCountChange(
                parseInt((event.target as HTMLInputElement)?.value)
              );
            }}
          />
          <Divider className="mt-[237px] md:mt-60 sm:my-10"></Divider>
        </Stack>
        <div className="w-full pb-[87px]">
          <div className="w-full">
            <Button
              className="h-[40px] w-full sm:max-w-[343px] mr-[2px] ml-[2px] text-sm font-bold"
              onClick={handleClickSearch}
            >
              SEARCH
            </Button>
          </div>
        </div>
      </div>
      <FriendsDrawer />
    </div>
  );
}
