import { useQuery } from "@tanstack/react-query";
import { getUser } from "../services/auth";

export const useUser = () => {
    return useQuery({
        queryKey: ["user"],
        queryFn: getUser,
    });
};
