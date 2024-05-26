import React from "react";
import { Divider, Link } from "@nextui-org/react";
import { SiYoutubeshorts } from "react-icons/si";
import { GoHomeFill } from "react-icons/go";
import { MdSubscriptions } from "react-icons/md";
import { CgProfile } from "react-icons/cg";
import { GrHistory } from "react-icons/gr";
import { BiSolidVideos } from "react-icons/bi";
import logo from "../assets/images/YT-logo.jpg";
const Sidebar = () => {
	const linkStyle = "w-[100%] py-2 gap-2 justify-end text-lg flex-row-reverse";
	return (
		<>
			<aside className=" dark:text-white">
				<div className="mx-auto max-w-[150px]">
					<img src={logo} alt="" />
				</div>
				<nav className="d-flex container pt-5 ">
					<ul>
						<li>
							<Link
								color="foreground"
								isBlock
								href="/"
								showAnchorIcon
								anchorIcon={<GoHomeFill />}
								className={linkStyle}
							>
								Home
							</Link>
						</li>
						<li>
							<Link
								color="foreground"
								isBlock
								href="/shorts"
								showAnchorIcon
								anchorIcon={<SiYoutubeshorts />}
								className={linkStyle}
							>
								Shorts
							</Link>
						</li>
						<li>
							<Link
								color="foreground"
								isBlock
								href="/subscriptions"
								showAnchorIcon
								anchorIcon={<MdSubscriptions />}
								className={linkStyle}
							>
								Subcriptions
							</Link>
						</li>
						<Divider className="my-4" />
						<li>
							<Link
								color="foreground"
								isBlock
								href="/"
								showAnchorIcon
								anchorIcon={<CgProfile />}
								className={linkStyle}
							>
								Profile
							</Link>
						</li>
						<li>
							<Link
								color="foreground"
								isBlock
								href="/"
								showAnchorIcon
								anchorIcon={<GrHistory />}
								className={linkStyle}
							>
								History
							</Link>
						</li>
						<li>
							<Link
								color="foreground"
								isBlock
								href="/watch/:id"
								showAnchorIcon
								anchorIcon={<BiSolidVideos />}
								className={linkStyle}
							>
								Your Videos
							</Link>
						</li>
					</ul>
				</nav>
			</aside>
		</>
	);
};

export default Sidebar;
