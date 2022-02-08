import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Heading } from "@chakra-ui/react";
import Dashboard from "./Components/dashboard";
import AddNewForm from "./Components/userForm";

function App() {
	return (
		<BrowserRouter>
			<Heading as="h1" width="90%" margin="40px auto">
				Dashboard
			</Heading>
			<Routes>
				<Route path="/" element={<Dashboard />} />
				<Route path="/new" element={<AddNewForm />} />
			</Routes>
		</BrowserRouter>
	);
}

export default App;
