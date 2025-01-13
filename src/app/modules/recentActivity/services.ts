import { ActivityModel } from "./model";

const getActivity = async () => {
  const activities = await ActivityModel.find()
    .sort({ timestamp: -1 })
    .limit(8)
    .populate("userId");
  return activities;
};

export const activityServices = {
  getActivity,
};
