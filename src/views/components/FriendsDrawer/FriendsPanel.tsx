import React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";

import { useAppDispatch, useAppSelector } from "../../../hooks/reduxHooks";
import { fetchFollowers, fetchFollowings } from "../../../store/friendsActions";

import FriendsList from "./FriendsList";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ px: 1, py: 3.2 }}>
          <div>{children}</div>
        </Box>
      )}
    </div>
  );
}

//Dynamically assign attributes based on index.
function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function FriendsPanel() {
  const countPerPage = 10; // Set default number of items per page.
  const dispatch = useAppDispatch();
  const [tabIndex, setTabIndex] = React.useState<number>(0);
  const followers = useAppSelector((state) => state.friends.followers);
  const followings = useAppSelector((state) => state.friends.followings);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabIndex(newValue);
  };

  React.useEffect(() => {
    //fetch the first page of items once component is mounted.
    dispatch(fetchFollowers(1, countPerPage));
    dispatch(fetchFollowings(1, countPerPage));
  }, [dispatch]);

  return (
    <>
      <Box sx={{ width: "100%" }}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs
            value={tabIndex}
            onChange={handleTabChange}
            aria-label="basic tabs example"
            variant="fullWidth"
          >
            <Tab label="Followers" {...a11yProps(0)} />
            <Tab label="Following" {...a11yProps(1)} />
          </Tabs>
        </Box>
        <TabPanel value={tabIndex} index={0}>
          <FriendsList
            elementId="followers-container"
            items={followers}
            emitFetchMore={(pageNum: number, perPage: number) =>
              dispatch(fetchFollowers(pageNum, perPage))
            }
            perPageProp={10}
          />
        </TabPanel>
        <TabPanel value={tabIndex} index={1}>
          <FriendsList
            elementId="followings-container"
            items={followings}
            emitFetchMore={(pageNum: number, perPage: number) =>
              dispatch(fetchFollowings(pageNum, perPage))
            }
            perPageProp={10}
          />
        </TabPanel>
      </Box>
    </>
  );
}
