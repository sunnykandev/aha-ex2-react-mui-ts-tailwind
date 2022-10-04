import React from "react";
import axios from "axios";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";

import FriendInfoCard from "./FriendInfoCard";
import FriendItemSkeleton from "./FriendItemSkeleton";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

interface FriendInfo {
  name: string;
  username: string;
  avater: string;
  isFollowing?: boolean;
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

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function Friends() {
  const [value, setValue] = React.useState<number>(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const [friends, setFriends] = React.useState<FriendInfo[]>([]);
  const [followingFriends, setFollowingFriends] = React.useState<FriendInfo[]>(
    []
  );

  React.useEffect(() => {
    axios({
      method: "get",
      url: "https://avl-frontend-exam.herokuapp.com/api/users/all?page=1&pageSize=10",
    })
      .then((res) => {
        const allData = res?.data?.data;
        setFriends(allData);
        const followData = allData.filter(
          (item: FriendInfo) => item?.isFollowing === true
        );
        setFollowingFriends(followData);
      })
      .catch((error) => console.error(`Error ${error}`));
    return () => {};
  }, []);

  return (
    <>
      <Box sx={{ width: "100%" }}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="basic tabs example"
            variant="fullWidth"
          >
            <Tab label="Followers" {...a11yProps(0)} />
            <Tab label="Following" {...a11yProps(1)} />
          </Tabs>
        </Box>
        <TabPanel value={value} index={0}>
          {friends.length
            ? friends.map((item: FriendInfo, index: number) => (
                <div key={`followers-${index}`}>
                  <FriendInfoCard
                    avatar={item?.avater}
                    name={item?.name}
                    username={item?.username}
                    isFollowing={item?.isFollowing}
                  />
                </div>
              ))
            : [...Array(8)].map((val: null | undefined, index: number) => (
                <div key={`loading-${val}-${index}`}>
                  <FriendItemSkeleton />
                </div>
              ))}
        </TabPanel>
        <TabPanel value={value} index={1}>
          {followingFriends.map((item: FriendInfo, index: number) => (
            <div key={`following-${index}`}>
              <FriendInfoCard
                avatar={item?.avater}
                name={item?.name}
                username={item?.username}
                isFollowing={item?.isFollowing}
              />
            </div>
          ))}
        </TabPanel>
      </Box>
    </>
  );
}
