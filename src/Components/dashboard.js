import { useEffect } from "react";
import {
	Table,
	Thead,
	Tbody,
	Tr,
	Td,
	Th,
	Box,
	Text,
	Button,
	Flex
} from "@chakra-ui/react";
import { connect } from "react-redux";
import { getUsers } from "../Actions/users";

const Dashboard = ({ getUsers, users }) => {
	useEffect(() => {
		getUsers();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<Box
			width="90%"
			margin="auto"
			borderWidth="1px"
			borderRadius="lg"
			boxShadow="xl"
			marginBottom="40px"
		>
			<Flex
				padding="20px"
				justifyContent="space-between"
				alignItems="center"
			>
				<Text fontWeight="bold">User list</Text>
				<Button colorScheme="blue">Add new</Button>
			</Flex>
			<Table variant="striped">
				<Thead>
					<Tr>
						<Th>id</Th>
						<Th>Name</Th>
						<Th>Username</Th>
						<Th>Email</Th>
						<Th>City</Th>
						<Th>Edit</Th>
						<Th>Delete</Th>
					</Tr>
				</Thead>
				<Tbody>
					{users?.map((user) => (
						<Tr key={user.id}>
							<Td>{user.id}</Td>
							<Td>{user.name}</Td>
							<Td>{user.username}</Td>
							<Td>{user.email}</Td>
							<Td>{user.address.city}</Td>
							<Td>
								<Button colorScheme="orange">Edit</Button>
							</Td>
							<Td>
								<Button colorScheme="red">Delete</Button>
							</Td>
						</Tr>
					))}
				</Tbody>
			</Table>
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
		//Pass the dispatch function as an argument to the getUsers action
		// so you can call it asynchronously in the action.
		getUsers: () => getUsers(dispatch)
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
