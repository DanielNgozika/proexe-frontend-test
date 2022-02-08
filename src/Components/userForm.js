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

const UserForm = ({ createUser, editUser, users }) => {
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
			createUser({
				// Because the API always returns a new user with an id of 11,
				// check the highest id in the users array and add 1 to it for
				// the new user. This way, duplicate ids won't be created.
				id: Math.max(...users.map((user) => +user.id)) + 1,
				name,
				email
			});
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
			paddingBottom="40px"
			marginBottom="40px"
		>
			<Text fontSize="20px" fontWeight="bold" padding="20px">
				Form
			</Text>
			<form
				onSubmit={handleSubmit}
				style={{ padding: "30px", borderTop: "1px solid grey" }}
			>
				<FormControl
					isRequired
					isInvalid={isNameError}
					width="60%"
					ml="auto"
				>
					<Flex>
						<FormLabel htmlFor="name">Name</FormLabel>
						<Input
							id="name"
							value={name}
							onChange={(e) => setName(e.target.value)}
							autoFocus
						/>
					</Flex>
					{isNameError && (
						<FormErrorMessage mb={5} pl="60px">
							Name is required
						</FormErrorMessage>
					)}
				</FormControl>
				<FormControl
					isRequired
					isInvalid={isEmailError}
					width="60%"
					ml="auto"
				>
					<Flex>
						<FormLabel htmlFor="email">Email</FormLabel>
						<Input
							id="email"
							value={email}
							type="email"
							onChange={(e) => setEmail(e.target.value)}
						/>
					</Flex>
					{isEmailError && (
						<FormErrorMessage mb={5} pl="60px">
							Email is required
						</FormErrorMessage>
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
