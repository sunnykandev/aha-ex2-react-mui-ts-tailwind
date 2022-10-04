import Api from "./Api";

export default {
  async getFollowers(pageNum: number, perPage: number) {
    const response = await Api().get(
      `users/all?page=${pageNum}&pageSize=${perPage}`
    );
    return response.data.data;
  },
  async getFollowings(pageNum: number, perPage: number) {
    const response = await Api().get(
      `users/friends?page=${pageNum}&pageSize=${perPage}`
    );
    return response.data.data;
  },
};
