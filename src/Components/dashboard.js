import { useEffect, useState } from "react";
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
	Flex,
	Modal,
	ModalOverlay,
	ModalContent,
	ModalHeader,
	ModalBody,
	ModalFooter,
	useDisclosure
} from "@chakra-ui/react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { getUsers, deleteUser } from "../Actions/users";

const Dashboard = ({ getUsers, users, deleteUser }) => {
	const { isOpen, onOpen, onClose } = useDisclosure();
	const [toBeDeleted, setToBeDeleted] = useState(null);
	useEffect(() => {
		// since the API doesn't save new users and user edits,
		// only fetch the users when the users array is empty.
		// Otherwise, new local additions and edits will be overriden by the API.
		if (users.length === 0) {
			getUsers();
		}
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
				<Button colorScheme="blue">
					<Link
						to="/form"
						style={{
							height: "100%",
							display: "flex",
							alignItems: "center"
						}}
					>
						Add new
					</Link>
				</Button>
			</Flex>
			{users.length > 0 && (
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
								<Td>{user.address?.city}</Td>
								<Td>
									<Button colorScheme="orange">
										<Link
											to="/form"
											state={{
												user: user
											}}
											style={{
												height: "100%",
												display: "flex",
												alignItems: "center"
											}}
										>
											Edit
										</Link>
									</Button>
								</Td>
								<Td>
									<Button
										colorScheme="red"
										onClick={() => {
											onOpen();
											setToBeDeleted(user.id);
										}}
									>
										Delete
									</Button>
								</Td>
							</Tr>
						))}
					</Tbody>
				</Table>
			)}
			{!users.length && (
				<Text textAlign="center" mb={3}>
					No users.
				</Text>
			)}

			{/* delete modal */}
			<Modal isOpen={isOpen} onClose={onClose} isCentered>
				<ModalOverlay opacity="0" />
				<ModalContent>
					<ModalHeader>Delete</ModalHeader>
					<ModalBody>
						Are you sure you want to delete this user?
					</ModalBody>

					<ModalFooter>
						<Button
							colorScheme="blackAlpha"
							mr={3}
							onClick={onClose}
						>
							Cancel
						</Button>
						<Button
							colorScheme="red"
							onClick={() => {
								deleteUser(toBeDeleted);
								onClose();
							}}
						>
							Delete
						</Button>
					</ModalFooter>
				</ModalContent>
			</Modal>
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
		getUsers: () => getUsers(dispatch),
		deleteUser: (id) => deleteUser(dispatch, id)
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
