import { FriendModel, FriendsDataModel } from "../models";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialFriendsState: FriendsDataModel = {
  followers: [],
  followings: [],
};

const friendsSlice = createSlice({
  name: "friends",
  initialState: initialFriendsState,
  reducers: {
    setFollowers(state, action: PayloadAction<FriendModel[]>) {
      state.followers = action.payload;
    },
    setFollowings(state, action: PayloadAction<FriendModel[]>) {
      state.followings = action.payload;
    },
  },
});
export default friendsSlice;
