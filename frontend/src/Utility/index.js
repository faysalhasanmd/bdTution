import axios from "axios";

export const saveAndUpdateUser = async (userData) => {
  const { data } = await axios.post(
    `https://bdtutionsf.vercel.app/user`,
    userData,
  );
  return data;
};
