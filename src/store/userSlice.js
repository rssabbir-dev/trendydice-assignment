import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
	name: 'users',
	initialState: {
		users: [],
		isUsersLoading: true,
		reactCollection: [],
		isUserDeleteLoading: false,
		isUserUpdateLoading: false,
		modalData: {},
		modalOpen: false,
	},
	reducers: {
		getUser(state, action) {
			const users = action.payload; // Array
			state.users = users;
		},
		setUserLoading(state, action) {
			const loading = action.payload; // Boolean
			state.isUsersLoading = loading;
		},
		setStoreReactCollection(state, action) {
			const reactedUserId = action.payload; // USER ID NUMBER
			if (state.reactCollection.includes(reactedUserId)) {
				const newCollection = state.reactCollection.filter(
					(react) => react !== reactedUserId
				);
				state.reactCollection = newCollection;
				localStorage.setItem('react', JSON.stringify(newCollection));
			} else {
				state.reactCollection.push(reactedUserId);
				localStorage.setItem(
					'react',
					JSON.stringify(state.reactCollection)
				);
			}
		},
		loadReactCollection(state, action) {
			const collection = action.payload;
			state.reactCollection = collection;
		},
		setUserDeleteLoading(state, action) {
			const loading = action.payload; // Boolean
			state.isUserDeleteLoading = loading;
		},
		setUserUpdateLoading(state, action) {
			const loading = action.payload; // Boolean
			state.isUserUpdateLoading = loading;
		},
		setModalData(state, action) {
			const data = action.payload;
			state.modalData = data;
		},
		handleUserEdit(state, action) {
			const user = action.payload;
			state.modalData = user;
			state.modalOpen = true;
		},
		setModalOpen(state, action) {
			const isOpen = action.payload;
			state.modalOpen = isOpen;
		},
	},
});
export const userActions = userSlice.actions;
export default userSlice;
