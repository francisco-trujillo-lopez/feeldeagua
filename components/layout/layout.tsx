import Link from "next/link";
import { useRouter } from "next/router";

export default function Layout({ children }: any) {
	const router = useRouter();

	const menuItems = [
		{
			href: "/admin",
			title: "Home",
		},
		{
			href: "/admin/album-add",
			title: "Nuevo disco",
		},
		{
			href: "/admin/artist-add",
			title: "Nuevo artista",
		},
	];

	return (
		<div className="min-h-screen flex flex-col">
			<div className="flex flex-col md:flex-row flex-1">
				<aside className="bg-gray-100 w-full md:w-60">
					<nav>
						<ul>
							{menuItems.map(({ href, title }) => (
								<li className="m-2" key={title}>
									<Link href={href}>
										<a
											className={`flex p-2 bg-gray-200 rounded hover:bg-gray-300 hover:text-gray-600 text-black cursor-pointer ${
												router.asPath === href &&
												"bg-gray-600 hover:bg-gray-600 font-bold hover:text-white text-white"
											}`}>
											{title}
										</a>
									</Link>
								</li>
							))}
						</ul>
					</nav>
				</aside>
				<main className="flex-1">{children}</main>
			</div>
		</div>
	);
}
