import React, { useEffect, useState } from 'react';
import InputUI from "./ui/InputUI";
import ThemeSwitcher from "./ui/ThemeSwitcher";
import { Avatar, Badge, Button, Divider, Link } from "@nextui-org/react";
import { RiVideoUploadFill } from "react-icons/ri";
import { recommended } from "../data";

const Header = ({keyWord}) => {
	const [activeButton, setActiveButton] = useState(0);
	const [keyword, setKeyword] = useState('')

	  const handleButtonClick = (buttonIndex, recommend) => {
		  setActiveButton(buttonIndex);
		  keyWord(recommend)

	};

	const handleChange = (e) => {
		setKeyword(e.target.value)

	}



	const handleClick = () => {
		keyWord(keyword)
	}

	
	
	return (
		<>
			<header className="flex justify-between pb-10">
				<InputUI onchange={handleChange} click={handleClick}/>
				<div className="flex gap-4">
					<ThemeSwitcher />
					<Button variant="light" isIconOnly>
						<RiVideoUploadFill />
					</Button>
					<Badge content="10" color="danger">
						<Avatar
							color="danger"
							src="https://i.pravatar.cc/150?u=a04258114e29026302d"
						/>
					</Badge>
				</div>
			</header>
			<div className="flex w-full gap-2">
					<Button radius="sm" size='sm' className={`text-[14px] button-yt ${activeButton === 0 ? 'active' : ''}`} onClick={() => handleButtonClick(0, 'all')}>All</Button>
					{recommended.map((recommend, i) => (
						<React.Fragment key={i}>
							<Divider orientation="vertical" />
							<Button size='sm' radius="sm" className={`text-[14px] button-yt ${activeButton === i + 1 ? 'active' : ''}`} onClick={() => handleButtonClick(i + 1, recommend)}>{recommend}</Button>
						</React.Fragment>
					))}
			</div>
		</>
	);
};

export default Header;
