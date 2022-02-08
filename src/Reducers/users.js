import {
	GET_USERS,
	CREATE_USER,
	DELETE_USER,
	EDIT_USER
} from "../Actions/types";

const initialState = {
	// Get users from localStorage if available.
	// Else, set default as empty array
	users: JSON.parse(localStorage.getItem("proexe-users")) || []
};

export default function users(state = initialState, action) {
	switch (action.type) {
		case GET_USERS:
			localStorage.setItem(
				"proexe-users",
				JSON.stringify(action.payload)
			);

			return {
				...state,
				users: action.payload
			};
		case CREATE_USER:
			const newState = {
				...state,
				users: [...state.users, action.payload]
			};

			localStorage.setItem(
				"proexe-users",
				JSON.stringify(newState.users)
			);
			return newState;
		case DELETE_USER:
			const filteredUsers = state.users.filter(
				(user) => user.id !== action.payload
			);
			localStorage.setItem("proexe-users", JSON.stringify(filteredUsers));

			return {
				...state,
				users: filteredUsers
			};
		case EDIT_USER:
			const editedUsers = state.users.map((user) => {
				if (user.id === action.payload.id) {
					return {
						...user,
						name: action.payload.name,
						email: action.payload.email
					};
				}
				return user;
			});
			localStorage.setItem("proexe-users", JSON.stringify(editedUsers));

			return {
				...state,
				users: editedUsers
			};
		default:
			return state;
	}
}
