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
		console.log(`---error`, error);
	}
};
