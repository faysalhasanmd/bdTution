import axios from "axios";

export const saveAndUpdateUser = async (userData) => {
  const { data } = await axios.post(
    `https://miraculous-vibrancy-production.up.railway.app/user`,
    userData,
  );
  return data;
};
