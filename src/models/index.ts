export interface FriendModel {
  name: string;
  username: string;
  avater: string;
  isFollowing?: boolean;
}

export interface FriendsDataModel {
  followers: FriendModel[];
  followings: FriendModel[];
}

export interface AnimalModel {
  avater: string;
  name: string;
  username: string;
}
