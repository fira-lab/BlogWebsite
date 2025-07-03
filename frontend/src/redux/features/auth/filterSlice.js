import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    filteredUsers: [],
};

const filterSlice = createSlice({
    name: 'filter',
    initialState,
    reducers: {
        FILTER_USERS(state, action) {
            const { users, search } = action.payload; // Use 'search' instead of 'Search'
            const tempUsers =
                Array.isArray(users) && search
                    ? users.filter((user) =>
                          (user.name ? user.name.toLowerCase().includes(search.toLowerCase()) : false) ||
                          (user.email ? user.email.toLowerCase().includes(search.toLowerCase()) : false)
                      )
                    : [];

            state.filteredUsers = tempUsers;
        },
    },
});

export const { FILTER_USERS } = filterSlice.actions;

export const selectUsers = (state) => state.filter.filteredUsers;

export default filterSlice.reducer;
