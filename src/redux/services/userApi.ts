import { createApi } from "@reduxjs/toolkit/query/react";
import axiosInstance from "~/api/api";
import { apiEndpoints } from "~/api/endpoints";
import { User } from "~/types/user";
import {
  loginFailure,
  loginSuccess,
  registerFailure,
  registerSuccess,
} from "~redux/slices/userSlices";

const baseQuery = async ({
  url,
  method,
  body,
}: {
  url: string;
  method: string;
  body?: any;
}) => {
  try {
    const result = await axiosInstance({
      url,
      method,
      data: body,
    });
    return { data: result.data };
  } catch (axiosError) {
    const err = axiosError as { response?: { data: any; status: number } };
    return {
      error: {
        status: err.response?.status,
        data: err.response?.data,
      },
    };
  }
};

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: baseQuery,
  endpoints: (builder) => ({
    login: builder.mutation<User, { email: string; password: string }>({
      query: (credentials) => ({
        url: apiEndpoints.user.base,
        method: "GET",
      }),
      transformResponse: (response: User[], meta, { email, password }) => {
        const user = response.find(
          (user) => user.email === email && user.password === password
        );
        if (!user) {
          throw new Error("Invalid email or password");
        }
        return user;
      },
      async onQueryStarted({ email, password }, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(loginSuccess(data));
        } catch (error) {
          if (error instanceof Error) {
            dispatch(loginFailure(error.message));
          } else {
            dispatch(loginFailure("An unknown error occurred"));
          }
        }
      },
    }),
    register: builder.mutation<
      User,
      { name: string; email: string; password: string }
    >({
      query: (userDetails) => ({
        url: apiEndpoints.user.base,
        method: "GET",
      }),
      transformResponse: async (response: User[], meta, userDetails) => {
        const userExists = response.some(
          (user) => user.email === userDetails.email
        );
        if (userExists) {
          throw new Error("User with this email already exists");
        }
        const newUser: User = {
          id: response.length + 1,
          ...userDetails,
        };

        await axiosInstance.post(apiEndpoints.user.base, newUser, {
          headers: {
            "Content-Type": "application/json",
          },
        });
        return newUser;
      },
      async onQueryStarted(userDetails, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(registerSuccess(data));
        } catch (error) {
          if (error instanceof Error) {
            dispatch(registerFailure(error.message));
          } else {
            dispatch(registerFailure("An unknown error occurred"));
          }
        }
      },
    }),
  }),
});

export const { useLoginMutation, useRegisterMutation } = userApi;
