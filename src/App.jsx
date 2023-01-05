import { BrowserRouter, Routes, Route } from "react-router-dom";

import { lazy, Suspense, useEffect } from "react";
import { ApolloProvider } from "@apollo/client/react";
import client from "./configurations/apollo";
import getToken from "./lib/clientToken";

import Layout from "./pages/Layout/Layout";

const Home = lazy(() => import("./pages/Home/Home"));

function App() {
	const MINUTE_MS = 250000;

	getToken();
	useEffect(() => {
		const interval = setInterval(() => {
			getToken();
		}, MINUTE_MS);

		return () => {
			clearInterval(interval);
		};
	}, []);

	return (
		<ApolloProvider client={client}>
			<BrowserRouter>
				<Suspense>
					<Routes>
						<Route path="/" element={<Layout />}>
							<Route index element={<Home />} />
							{/* <Route path="*" element={<NotFound />} /> */}
						</Route>
					</Routes>
				</Suspense>
			</BrowserRouter>
		</ApolloProvider>
	);
}

export default App;
