import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import Youtube from "../api/Youtube";
import Video from "../components/Video";

const API_KEY = import.meta.env.VITE_API_KEY;

const Watch = () => {
	let { videoId } = useParams();
	const [data, setData] = useState([]);
	const [currentVideo, setCurrentVideo] = useState();
	const [currentId, setCurrentId] = useState("");
	const [keyword, setKeyword] = useState("");
	const fetchById = async () => {
		try {
			const response = await Youtube.get(
				`videos?key=${API_KEY}&id=${videoId}&part=snippet,statistics`
			);

			setCurrentVideo(response.data.items);
		} catch (error) {}
	};

	const fetchKeyword = async () => {
		try {
			const { snippet } = currentVideo[0];

			const response = await Youtube.get(
				`search?key=${API_KEY}&q=${snippet.tags[0]}&type=video&part=snippet&maxResults=10`
			);
			const videoIds = response.data.items.map((item) => item.id.videoId);
			setKeyword(videoIds);
		} catch (error) {}
	};

    const fetchRelatedVideos = async () => {
		const statsResponse = await Youtube.get(
			`videos?part=snippet,statistics&id=${keyword.join(
				","
			)}&key=${API_KEY}`
		);

		setData(statsResponse.data.items);
	};

	useEffect(() => {
		setCurrentId(videoId);
	}, []);

	useEffect(() => {
		fetchById();
	}, [currentId]);

	useEffect(() => {
		fetchKeyword();
	}, [currentVideo]);

	useEffect(() => {
		fetchRelatedVideos();
	}, [keyword]);

	return (
		<>
            <Video data={data} current={currentVideo && currentVideo[0]} id={videoId } />
		</>
	);
};

export default Watch;
