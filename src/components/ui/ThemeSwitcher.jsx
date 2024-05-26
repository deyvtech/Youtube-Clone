import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { MdDarkMode } from "react-icons/md";
import { BsFillSunFill } from "react-icons/bs";
import { Button } from "@nextui-org/react";

export default function ThemeSwitcher() {
	const [mounted, setMounted] = useState(false);
	const { theme, setTheme } = useTheme();

	useEffect(() => {
		setMounted(true);
	}, []);

	if (!mounted) return null;

	if (theme === "light") {
		return (
			<>
				<Button
					onClick={() => setTheme("dark")}
					variant="light"
					isIconOnly
				>
					<MdDarkMode />
				</Button>
			</>
		);
	} else if (theme === "dark") {
		return (
			<>
				<Button
					onClick={() => setTheme("light")}
					variant="light"
					isIconOnly
				>
					<BsFillSunFill />
				</Button>
			</>
		);
	}
}
