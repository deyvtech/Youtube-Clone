import React from "react";
import {
	Card,
	CardBody,
	CardFooter,
	Image,
	Avatar,
	Link,
} from "@nextui-org/react";
import ReactTimeAgo from "react-time-ago";

const Home = ({ data }) => {
	let formatter = Intl.NumberFormat("en", { notation: "compact" });
	return (
		<div className="grid grid-cols-4 gap-4" key={1}>
			{data.map((content) => (
				<React.Fragment key={content.id}>
					<Link href={`/watch/${content.id}`}>
						<Card
							shadow="sm"
							className="w-[350px] bg-transparent"
							isFooterBlurred
						>
							<CardBody className="overflow-visible p-0">
								<Image
									isZoomed
									shadow="sm"
									radius="lg"
									width="100%"
									alt=""
									className="w-full object-cover h-[200px]"
									src={content.snippet.thumbnails.high.url}
								/>
							</CardBody>
							<CardFooter className="text-small gap-2 text-left">
								<Avatar
									className="min-w-[56px]"
									size="lg"
									name={content.snippet.channelTitle}
								/>
								<div>
									<h3 className=" text-[16px] font-medium">
										{content.snippet.title}
									</h3>
									<h4 className=" text-slate-500 font-bold mt-2 hover:text-white">
										{content.snippet.channelTitle}
									</h4>
									<p className="text-slate-500 font-bold">
										<span className="mr-4">
											{formatter.format(
												Number(
													content.statistics.viewCount
												)
											)} views
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
				</React.Fragment>
			))}
		</div>
	);
};

export default Home;
