import Link from "next/link";
import { useRouter } from "next/router";

export default function AdminLayout({ children }: any) {
	const router = useRouter();

	const menuItems = [
		{
			href: "/admin",
			title: "Home",
			icon: "",
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
				<aside className="bg-base-200 w-80">
					<div className="flex align-middle justify-center mt-4 mb-6">
						<picture>
							<img
								src="/logo-feel.png"
								alt="logo feel"
								width={100}
								height={100}
							/>
						</picture>
					</div>
					<nav>
						<ul className="menu menu-compact flex flex-col p-0 px-1">
							{menuItems.map(({ href, title }) => (
								<li className="m-2" key={title}>
									<Link href={href}>
										<a
											className={`flex p-2 bg-gray-200 rounded hover:bg-secondary hover:text-gray-800  text-black cursor-pointer ${
												router.asPath === href &&
												"bg-primary hover:bg-primary font-bold hover:text-black text-white"
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
