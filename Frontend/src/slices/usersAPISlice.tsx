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
                url: `${USERS_URL}/check-auth`,
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
        updateGroup: builder.mutation({
            query:({id, ...data})=>({
                 url: `${USERS_URL}/Add-to-group/${id}`,
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
        getRegions: builder.query({
            query: () => ({
                url: `${USERS_URL}/All-Regions`,
                method: "GET",
            }),
        }),
        getGroups: builder.query({
            query: () => ({
                url: `${USERS_URL}/getGroups`,
                method: "GET",
            }),
        }),
        updateTicket: builder.mutation({
            query: ({ ticketId, assignedTo, status}) => ({
                url: `${USERS_URL}/update-ticket/${ticketId}`,
                method: "PUT",
                body:{
                    ...(assignedTo ? { assignedTo } : {}), 
                    ...(status ? { status } : {}) 
                }     
            }),
        }),
        addGroup: builder.mutation({
            query: (data) => ({
                url: `${USERS_URL}/Add-Group`,
                method: "POST",
                body: data
            })
        }),
    })
})

export const {
    useUpdateGroupMutation,
    useGetGroupsQuery, 
    useAddGroupMutation,
    useGetRegionsQuery, 
    useGetUsersQuery, 
    useUpdateTicketMutation, 
    useLoginMutation,
    useRegisterMutation,
    useLogoutMutation,
    useGetTicketsQuery,
    useAddUserMutation,
    useUpdateProfileMutation,
    useGetMeQuery,
    useAddticketMutation } = usersAPISlice;