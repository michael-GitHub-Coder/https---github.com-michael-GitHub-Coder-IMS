import { apiSlice } from "./apiSlice";

const USERS_URL = "/api/auth";

export const usersAPISlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        login: builder.mutation({
            query: (data) => ({
                url: `${USERS_URL}/login`,
                method: "POST",
                body: data
            })
        }),
        logout: builder.mutation({
            query: ()=>({
                url: `${USERS_URL}/logout`,
                method: "POST",
            })
        }),
        register: builder.mutation({
            query: (data)=>({
                url: `${USERS_URL}/sign-up`,
                method: "POST",
                body: data
            })
        }),
        getTickets: builder.query({
            query:()=>({
                url: `${USERS_URL}/All-Tickets`,
                method:"GET"
            })
        })
    })
})

export const { useLoginMutation,useLogoutMutation,useGetTicketsQuery } = usersAPISlice;