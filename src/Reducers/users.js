const initialState = {
	// Get users from localStorage if available.
	// Else, set default as empty array
	users: JSON.parse(localStorage.getItem("proexe-users")) || []
};

export default function users(state = initialState, action) {
	switch (action.type) {
		case "GET_USERS":
			localStorage.setItem(
				"proexe-users",
				JSON.stringify(action.payload)
			);

			return {
				...state,
				users: action.payload
			};
		default:
			return state;
	}
}
