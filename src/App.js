import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Heading } from "@chakra-ui/react";
import Dashboard from "./Components/dashboard";

function App() {
	return (
		<BrowserRouter>
			<Heading as="h1" width="90%" margin="40px auto">
				Dashboard
			</Heading>
			<Routes>
				<Route path="/" element={<Dashboard />} />
			</Routes>
		</BrowserRouter>
	);
}

export default App;
