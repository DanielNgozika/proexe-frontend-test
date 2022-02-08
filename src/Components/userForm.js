import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { connect } from "react-redux";
import {
	Box,
	Text,
	FormControl,
	Input,
	FormLabel,
	FormErrorMessage,
	Flex,
	Button
} from "@chakra-ui/react";
import { createUser, editUser } from "../Actions/users";

const UserForm = ({ createUser, editUser }) => {
	const navigate = useNavigate();
	const { state } = useLocation();
	const [name, setName] = useState(state?.user?.name || "");
	const isNameError = name === "";

	const [email, setEmail] = useState(state?.user?.email || "");
	const isEmailError = email === "";

	function handleSubmit(e) {
		e.preventDefault();
		if (state?.user) {
			editUser({ id: state.user.id, name, email });
			navigate("/");
		} else {
			createUser({ name, email });
			navigate("/");
		}
	}

	return (
		<Box
			width="90%"
			margin="auto"
			borderWidth="1px"
			borderRadius="lg"
			boxShadow="xl"
			marginBottom="40px"
		>
			<form onSubmit={handleSubmit}>
				<Text>Form</Text>
				<FormControl isRequired isInvalid={isNameError}>
					<FormLabel htmlFor="name">Name</FormLabel>
					<Input
						id="name"
						value={name}
						onChange={(e) => setName(e.target.value)}
						autoFocus
					/>
					{isNameError && (
						<FormErrorMessage>Name is required</FormErrorMessage>
					)}
				</FormControl>
				<FormControl isRequired isInvalid={isEmailError}>
					<FormLabel htmlFor="email">Email</FormLabel>
					<Input
						id="email"
						value={email}
						type="email"
						onChange={(e) => setEmail(e.target.value)}
					/>
					{isEmailError && (
						<FormErrorMessage>Email is required</FormErrorMessage>
					)}
				</FormControl>
				<Flex justifyContent="flex-end">
					<Button
						background="transparent"
						border="1px solid red"
						color="red"
						marginRight="20px"
						onClick={() => {
							navigate("/");
						}}
					>
						Cancel
					</Button>
					<Button colorScheme="green" type="submit">
						Submit
					</Button>
				</Flex>
			</form>
		</Box>
	);
};

function mapStateToProps({ users }) {
	return {
		users: users.users
	};
}

function mapDispatchToProps(dispatch) {
	return {
		//Pass the dispatch function as an argument to the createUser action
		// so you can call it asynchronously in the action.
		createUser: (args) => createUser(dispatch, args),
		editUser: (args) => editUser(dispatch, args)
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(UserForm);
