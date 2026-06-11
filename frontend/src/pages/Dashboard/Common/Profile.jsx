import useAuth from "../../../hooks/useAuth";
import coverImg from "../../../assets/images/Pcover.jpg";
import useRole from "../../../hooks/useRole";
import { Link } from "react-router";

const Profile = () => {
  const { user } = useAuth();
  const [role, isRoleLoading] = useRole();
  console.log(role, isRoleLoading);

  // ইমেজ না থাকলে নামের প্রথম অক্ষর দিয়ে ডেমো ইমেজ তৈরির লজিক
  const defaultAvatar = `https://ui-avatars.com/api/?name=${encodeURIComponent(
    user?.displayName || "User",
  )}&background=84cc16&color=fff&size=150&bold=true`;

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="bg-white shadow-lg rounded-2xl md:w-4/5 lg:w-3/5">
        <img
          loading="lazy"
          alt="cover photo"
          src={coverImg}
          className="w-full mb-4 rounded-t-lg h-56"
        />
        <div className="flex flex-col items-center justify-center p-4 -mt-16">
          <a href="#" className="relative block">
            <img
              loading="lazy"
              alt="profile"
              // এখানে শর্ত অনুযায়ী ইমেজ সেট করা হয়েছে
              src={user?.photoURL ? user.photoURL : defaultAvatar}
              className="mx-auto object-cover rounded-full h-24 w-24  border-2 border-white "
            />
          </a>

          <p className="p-2 px-4 text-xs text-white bg-lime-500 rounded-full">
            {role}
          </p>
          <p className="mt-2 text-xl font-medium text-gray-800 ">
            User Id: {user?.uid}
          </p>
          <div className="w-full p-2 mt-4 rounded-lg">
            <div className="flex flex-wrap items-center justify-between text-sm text-gray-600 ">
              <p className="flex flex-col">
                Name
                <span className="font-bold text-gray-600 ">
                  {user?.displayName}
                </span>
              </p>
              <p className="flex flex-col">
                Email
                <span className="font-bold text-gray-600 ">{user?.email}</span>
              </p>

              <div>
                <Link
                  to="/profile-setting"
                  className="bg-lime-500  px-10 py-1 rounded-lg text-white cursor-pointer hover:bg-lime-800 block mb-1"
                >
                  Update Profile
                </Link>
                <Link
                  to="/profile-setting"
                  className="bg-lime-500 px-7 py-1 rounded-lg text-white cursor-pointer hover:bg-lime-800"
                >
                  Change Password
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
