import React, { useReducer, useState, useEffect } from "react";
import ReactTimeAgo from "react-time-ago";
import { BiLike } from "react-icons/bi";
import { BiSolidLike } from "react-icons/bi";
import {
	Card,
	CardBody,
	CardFooter,
	CardHeader,
	Divider,
	Image,
	Avatar,
	Link,
	Input,
	Button,
} from "@nextui-org/react";

const ACTIONS = {
	ADD_COMMENT: "comment",
	LIKE: "like",
};

const reducer = (comments, action) => {
	switch (action.type) {
		case ACTIONS.ADD_COMMENT:
			return [...comments, newComment(action.payload.comment)];
		case ACTIONS.LIKE:
			return comments.map((comment) => {
				if (comment.id === action.payload.id) {
					return { ...comment, status: !comment.status };
				}
				return comment;
			});
	}
};

const newComment = (comment) => {
	return { id: new Date().getTime(), comment: comment, status: false };
};

const Video = ({ data, current, id }) => {
	const [comments, dispatch] = useReducer(reducer, []);
	const [comment, setComment] = useState("");
	const [count, commentCount] = useState(Number(current?.statistics.commentCount) || 0)

	useEffect(() => {
		console.log(comments);
	}, [comments]);

	const handleSubmit = () => {
		dispatch({
			type: ACTIONS.ADD_COMMENT,
			payload: { comment: comment },
		});
		commentCount(prev => prev + 1)
		setComment("");
	};

	let formatter = Intl.NumberFormat("en", { notation: "compact" });
	const date = current?.snippet?.publishedAt || 0;
	console.log(current);
	return (
		<div className="flex gap-24">
			<div>
				<iframe
					id="ytplayer"
					type="text/html"
					width="900"
					height="500"
					src={`https://www.youtube.com/embed/${id}?autoplay=1`}
					allow="autoplay"
					allowFullScreen
				/>
				<h2 className="text-2xl mt-5">{current?.snippet.title}</h2>
				<div className="flex items-center gap-4 mt-5">
					<Avatar
						className="min-w-[56px]"
						size="lg"
						name={current?.snippet.channelTitle || "No Title"}
					/>
					<div>
						<h3 className="text-slate-500">
							{current?.snippet.channelTitle}
						</h3>
					</div>
				</div>
				<div>
					<Card className="max-w-full mt-5">
						<CardHeader className="flex gap-3">
							{formatter.format(
								Number(current?.statistics.viewCount)
							)}{" "}
							views
							<span>
								<ReactTimeAgo
									date={new Date(date).getTime()}
									locale="en-US"
								/>
							</span>
						</CardHeader>
						<Divider />
						<CardBody>
							<p>{current?.snippet.localized.description}</p>
						</CardBody>
						<Divider />
						<h2  className="text-2xl p-4">{ count} comments</h2>
						<CardFooter className="flex-col items-end">
							<Input
								type="text"
								variant={"underlined"}
								label="Add a comment"
								value={comment}
								onChange={(e) => setComment(e.target.value)}
							/>
							<Button
								onClick={handleSubmit}
								className="block mt-3 text-right"
								variant={"flat"}
							>
								Comment
							</Button>
						</CardFooter>
					</Card>
					<div className="mt-10">
						<ul>
							{comments.map((comment, i) => (
								<li className="flex gap-5 mb-5">
									<Avatar
										color="danger"
										src="https://i.pravatar.cc/150?u=a04258114e29026302d"
									/>
									<p>
										{comment.comment}{" "}
										<Button
											isIconOnly
											variant="light"
											aria-label="Like"
											onClick={() => dispatch({type: ACTIONS.LIKE, payload: {id: comment.id}})}
										>
											{ comment.status ? <BiSolidLike /> : <BiLike />}
										</Button>{" "}
									</p>
								</li>
							))}
						</ul>
					</div>
				</div>
			</div>

			<div className="flex gap-10 flex-col">
				{data.map((content) => (
					<>
						<Link href={`/watch/${content.id}`}>
							<Card
								shadow="sm"
								className="w-[350px] bg-transparent"
								isFooterBlurred
								key={content.id}
							>
								<CardBody className="overflow-visible p-0">
									<Image
										isZoomed
										shadow="sm"
										radius="lg"
										width="100%"
										alt=""
										className="w-full object-cover h-[200px]"
										src={
											content.snippet.thumbnails.high.url
										}
									/>
								</CardBody>
								<CardFooter className="text-small gap-2 text-left">
									<Avatar
										className="min-w-[56px]"
										size="lg"
										name={
											content.snippet.channelTitle ||
											"No Title"
										}
									/>
									<div>
										<h3 className=" text-[16px] font-medium">
											{content.snippet.title}
										</h3>
										<h4 className=" text-slate-500 font-bold mt-2 hover:text-white">
											{content.snippet.channelTitle ||
												"No Title"}
										</h4>
										<p className="text-slate-500 font-bold">
											<span className="mr-4">
												{formatter.format(
													Number(
														content.statistics
															.viewCount
													)
												)}{" "}
												views
											</span>
											<span>
												<ReactTimeAgo
													date={new Date(
														content.snippet.publishedAt
													).getTime()}
													locale="en-US"
												/>
											</span>
										</p>
									</div>
								</CardFooter>
							</Card>
						</Link>
					</>
				))}
			</div>
		</div>
	);
};

export default Video;
