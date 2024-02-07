import type { NextPage } from "next";
import Head from "next/head";
import { SocialIcon } from "react-social-icons";
import { AlbumList } from "../components/album/album-list/album-list";
import { supabase } from "../utils/supabaseClient";
import PageLayout from "../components/layout/page-layout";

/*export async function getServerSideProps() {
	const { data, error } = await supabase
		.from("albums")
		.select(`*, artists (name)`)
		.order("id", { ascending: false });

	console.log("get static props: ", data);

	return {
		props: {
			data,
		},
	};
}*/

const Home: NextPage = () => {
	return (
		<>
			<Head>
				<title>feel de agua</title>
				<meta name="description" content="Sello discográgico independiente" />
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<PageLayout>
				<main className="flex flex-col items-center justify-center">
					<AlbumList />
				</main>
			</PageLayout>
		</>
	);
};

export default Home;
