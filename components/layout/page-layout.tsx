import Link from "next/link";
import { useRouter } from "next/router";
import { Suspense } from "react";
import { Dna } from "react-loader-spinner";
import { SocialIcon } from "react-social-icons";

const menuItems = [
	{
		href: "/",
		title: "DISCOS",
		icon: "",
	},
	{
		href: "/artists",
		title: "ARTISTAS",
	},
	{
		href: "/newsletter",
		title: "NOVEDADES",
	},
];

export default function PageLayout({ children }: any) {
	const router = useRouter();

	return (
		<>
			<div className="mb-8 flex flex-col items-center justify-center">
				<picture>
					<img
						src="/logo-feel-rojo.png"
						alt="logo feel"
						width={150}
						height={150}
						className="mt-5 opacity-90 contrast-100"
					/>
				</picture>

				<ul className="mt-8 flex flex-col text-2xl lg:flex-row lg:text-center">
					{menuItems.map(({ href, title }) => (
						<li
							className={`cursor-pointer font-bold lg:w-[200px] ${
								router.asPath === href && "font-bold text-primary"
							}`}
							key={title}>
							<Link href={href}>{title}</Link>
						</li>
					))}
				</ul>
			</div>
			<Suspense fallback={<Dna />}>{children}</Suspense>

			<footer className="flex flex-col items-center justify-center pb-10">
				<div className="flex flex-row items-center justify-center">
					<SocialIcon
						className="ml-4"
						bgColor="white"
						fgColor="black"
						target={"_blank"}
						url="https://www.instagram.com/feeldeagua"></SocialIcon>
					<SocialIcon
						className="ml-4"
						bgColor="white"
						fgColor="black"
						target={"_blank"}
						url="https://www.youtube.com/user/feeldeagua"></SocialIcon>
					<SocialIcon
						className="ml-4"
						bgColor="white"
						fgColor="black"
						target={"_blank"}
						url="https://www.facebook.com/feeldeagua/"></SocialIcon>
				</div>

				<span className="mt-8 ml-4">feel de agua</span>
				<span className="mt-1 ml-4">2022</span>
			</footer>
		</>
	);
}
