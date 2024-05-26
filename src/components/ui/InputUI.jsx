import React from "react";
import { Input, Button } from "@nextui-org/react";
import { IoIosSearch } from "react-icons/io";

const InputUI = ({onchange, click}) => {
	return (
		<>
			<Input
				radius="sm"
				className="w-[500px]"
				size="md"
				variant={"flat"}
				type="text"
				placeholder="Search"
				onChange={onchange}
				endContent={
					<Button isIconOnly variant="light" onClick={click} className="absolute right-0">
						<IoIosSearch className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
					</Button>
				}
			/>
		</>
	);
};

export default InputUI;
