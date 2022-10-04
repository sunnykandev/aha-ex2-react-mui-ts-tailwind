import { AnyAction } from "@reduxjs/toolkit";
import { ThunkAction } from "@reduxjs/toolkit";

import friendsSlice from "./friendsSlice";
import { RootState } from "./index";
import { FriendModel } from "../models";
import FriendsServicece from "../service/friendsService";

export const friendsActions = friendsSlice.actions;

export const fetchFollowers = (
  pageNum: number,
  perPage: number
): ThunkAction<void, RootState, unknown, AnyAction> => {
  return async (dispatch, getState) => {
    if (getState().friends.followers.length / perPage > pageNum) {
      return;
    }
    const response: FriendModel[] = await FriendsServicece.getFollowers(
      pageNum,
      perPage
    );
    dispatch(
      friendsActions.setFollowers(getState().friends.followers.concat(response))
    );
  };
};

export const fetchFollowings = (
  pageNum: number,
  perPage: number
): ThunkAction<void, RootState, unknown, AnyAction> => {
  return async (dispatch, getState) => {
    if (getState().friends.followings.length / perPage > pageNum) {
      return;
    }
    const response: FriendModel[] = await FriendsServicece.getFollowings(
      pageNum,
      perPage
    );
    dispatch(
      friendsActions.setFollowings(
        getState().friends.followings.concat(response)
      )
    );
  };
};
