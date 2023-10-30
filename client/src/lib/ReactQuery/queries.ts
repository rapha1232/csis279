import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

import { QUERY_KEYS } from "./keys";
import { NewUser, UpdateUser, User } from "../../types/index";
import { createUserAccount, signInAccount, signOutAccount } from "./users";
import { useDispatch } from "react-redux";
import { clearUser, setUser } from "../../app/store";
import { useNavigate } from "react-router-dom";
import { toast } from "../../components/ui/use-toast";

// ============================================================
// AUTH QUERIES
// ============================================================

export const useCreateUserAccount = () => {
  return useMutation({
    mutationFn: (user: NewUser) => createUserAccount(user),
  });
};

export const useSignInAccount = () => {
  const dispatch = useDispatch();
  return useMutation({
    mutationFn: (user: { Email: string; Password: string }) =>
      signInAccount(user),
    onSuccess: (data: User) => {
      dispatch(setUser(data));
      toast({
        title: `Welcome Back ${data.FirstName}!`,
      });
    },
  });
};

export const useSignOutAccount = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  return useMutation({
    mutationFn: signOutAccount,
    onSuccess: () => {
      dispatch(clearUser());
      navigate("/sign-in", { replace: true });
    },
  });
};

// ============================================================
// USER QUERIES
// ============================================================

// export const useGetCurrentUser = () => {
//   return useQuery({
//     queryKey: [QUERY_KEYS.GET_CURRENT_USER],
//     queryFn: getCurrentUser,
//   });
// };

// export const useGetUsers = (limit?: number) => {
//   return useQuery({
//     queryKey: [QUERY_KEYS.GET_USERS],
//     queryFn: () => getUsers(limit),
//   });
// };

// export const useGetUserById = (userId: string) => {
//   return useQuery({
//     queryKey: [QUERY_KEYS.GET_USER_BY_ID, userId],
//     queryFn: () => getUserById(userId),
//     enabled: !!userId,
//   });
// };

// export const useUpdateUser = () => {
//   const queryClient = useQueryClient();
//   return useMutation({
//     mutationFn: (user: UpdateUser) => updateUser(user),
//     onSuccess: (data) => {
//       queryClient.invalidateQueries({
//         queryKey: [QUERY_KEYS.GET_CURRENT_USER],
//       });
//       queryClient.invalidateQueries({
//         queryKey: [QUERY_KEYS.GET_USER_BY_ID, data?.$id],
//       });
//     },
//   });
// };
