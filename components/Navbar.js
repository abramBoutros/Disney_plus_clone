import Image from "next/image";
import Link from "next/link";
import logo from "../public/disney.png";

const Navbar = ({ account }) => {
	return (
		<div className="navbar">
			<div className="logo-wrapper">
				<Link href="/">
					<Image src={logo} alt="Disney Logo" width={160} height={80}></Image>
				</Link>
			</div>
			<div className="account-info">
				<p>Welcome {account.username}</p>
				<img
					src={account.avatar.url}
					className="avatar"
					alt={account.username}
				/>
			</div>
		</div>
	);
};

export default Navbar;
