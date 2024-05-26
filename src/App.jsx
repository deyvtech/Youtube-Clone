import React, { useEffect, useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import { NextUIProvider } from "@nextui-org/react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";

import Home from "./pages/home";
import Shorts from "./pages/shorts";
import Subscriptions from "./pages/subscriptions";
import Watch from "./pages/watch";

import Youtube from "./api/Youtube";
const API_KEY = import.meta.env.VITE_API_KEY;

function App() {
	const navigate = useNavigate();
	const [data, setData] = useState([]);

	const fetch = async () => {
		try {
			const response = await Youtube.get(
				`videos?key=${API_KEY}&part=snippet,statistics&chart=mostPopular&maxResults=20`
			);
			setData(response.data.items);
		} catch (error) {}
	};

	const fetchKeyword = async (keyword) => {
		try {
			const response = await Youtube.get(
				`search?key=${API_KEY}&q=${keyword}&type=video&part=snippet&maxResults=20`
			);
			const videoIds = response.data.items.map((item) => item.id.videoId);
			const statsResponse = await Youtube.get(
				`videos?part=snippet,statistics&id=${videoIds.join(
					","
				)}&key=${API_KEY}`
			);

			setData(statsResponse.data.items);
		} catch (error) {}
	};

	const handleKeyWord = (keyword) => {
		console.log(keyword);
		if (keyword === 'all') {
			fetch();
		} else {
		fetchKeyword(keyword);
			
		}
	};

	useEffect(() => {
		fetch();
	}, []);

	return (
		<>
			<NextUIProvider navigate={navigate}>
				<NextThemesProvider attribute="class" defaultTheme="light">
					<div className="flex ">
						<div id="navigation" className="w-[15%] p-5 ">
							<Sidebar />
						</div>
						<div
							id="container"
							className="dark:text-white w-[85%] px-10 py-5"
						>
							<Header keyWord={handleKeyWord} />
							<div className="mt-10">
								<Routes>
									<Route
										path="/"
										element={<Home data={data} />}
									/>
									<Route
										path="/shorts"
										element={<Shorts />}
									/>
									<Route
										path="/subscriptions"
										element={<Subscriptions />}
									/>
									<Route
										path="/watch/:videoId"
										element={<Watch />}
									/>
								</Routes>
							</div>
						</div>
					</div>
				</NextThemesProvider>
			</NextUIProvider>
		</>
	);
}

export default App;
