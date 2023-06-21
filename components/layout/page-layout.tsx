import Link from "next/link";
import { useRouter } from "next/router";

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
						width={200}
						height={200}
						className="opacity-90 contrast-100"
					/>
				</picture>

				<ul className="mt-8 flex flex-col text-2xl lg:flex-row">
					{menuItems.map(({ href, title }) => (
						<li
							className={`mx-8 cursor-pointer font-bold ${
								router.asPath === href &&
								"font-bold text-primary hover:text-white "
							}`}
							key={title}>
							<Link href={href}>{title}</Link>
						</li>
					))}
				</ul>
			</div>
			{children}
		</>
	);
}
