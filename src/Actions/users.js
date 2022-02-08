import { API } from "../constants";
import { GET_USERS, CREATE_USER } from "./types";

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
