import { API } from "../constants";
import { GET_USERS, CREATE_USER, DELETE_USER, EDIT_USER } from "./types";

export const getUsers = async (dispatch) => {
	try {
		const request = await fetch(API);
		if (!request.ok) {
			const error = await request.json();
			throw Error(error.error.message);
		}
		const data = await request.json();
		dispatch({
			type: GET_USERS,
			payload: data
		});
	} catch (error) {
		console.log(`---get user error`, error);
	}
};

export const createUser = async (dispatch, values) => {
	try {
		const request = await fetch(API, {
			method: "POST",
			body: JSON.stringify(values)
		});
		if (!request.ok) {
			const error = await request.json();
			throw Error(error.error.message);
		}
		const data = await request.json();
		dispatch({
			type: CREATE_USER,
			payload: {
				...data,
				...values
			}
		});
	} catch (error) {
		console.log(`---create user error`, error);
	}
};

export const deleteUser = async (dispatch, id) => {
	try {
		const request = await fetch(API, {
			// Using "GET" method because a "DELETE"
			// method is not supported by the API.
			method: "GET"
		});
		if (!request.ok) {
			const error = await request.json();
			throw Error(error.error.message);
		}
		dispatch({
			type: DELETE_USER,
			payload: id
		});
	} catch (error) {
		console.log(`---delete user error`, error);
	}
};

export const editUser = async (dispatch, values) => {
	try {
		const request = await fetch(API, {
			//using "POST" method because a "PUT"
			// is not supported by the API.
			method: "POST",
			body: JSON.stringify(values)
		});
		if (!request.ok) {
			const error = await request.json();
			throw Error(error.error.message);
		}

		dispatch({
			type: EDIT_USER,
			payload: values
		});
	} catch (error) {
		console.log(`---edit user error`, error);
	}
};
