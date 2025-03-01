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
        addUser: builder.mutation({
            query: (data)=>({
                url: `${USERS_URL}/member`,
                method: "POST",
                body: data
            })
        }),
        getMe: builder.query({
            query:()=>({
                url: `${USERS_URL}/All-Tickets`,
                method:"GET"
            })
        }),
        getTickets: builder.query({
            query:()=>({
                url: `${USERS_URL}/All-Tickets`,
                method:"GET"
            })
        }),
        updateProfile: builder.mutation({
           query:({_id, ...data})=>({
                url: `${USERS_URL}/Update-profile/${_id}`,
                method: "PUT",
                body: data
           })
        }),
        addticket: builder.mutation({
            query: (data)=>({
                url: `${USERS_URL}/Add-Ticket`,
                method: "POST",
                body: data
            })
        }),
        getUsers: builder.query({
            query: () => ({
                url: `${USERS_URL}/All-Users`,
                method: "GET",
            }),
        }),
        updateTicket: builder.mutation({
            query: ({ ticketId, assignedTo }) => ({
                url: `${USERS_URL}/update-ticket/${ticketId}`,
                method: "PUT",
                body: { assignedTo },
            }),
        }),
        
    })
})

export const { useGetUsersQuery, useUpdateTicketMutation, useLoginMutation,useRegisterMutation,useLogoutMutation,useGetTicketsQuery,useAddUserMutation,useUpdateProfileMutation,useAddticketMutation } = usersAPISlice;