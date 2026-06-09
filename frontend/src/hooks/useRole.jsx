import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";

const useRole = () => {
  const { user, loading } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: role, isLoading } = useQuery({
    enabled: !!user?.email && !loading,
    queryKey: ["role", user?.email],
    queryFn: async () => {
      const { data } = await axiosSecure(`/user/role/${user.email}`);
      console.log("Role API response:", data);
      return data?.role || "student";
    },
  });

  return [role, isLoading];
};

export default useRole;
