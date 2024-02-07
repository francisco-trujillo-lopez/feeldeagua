import { Suspense } from "react";
import PageLayout from "../../components/layout/page-layout";
import { supabase } from "../../utils/supabaseClient";
import { useQuery } from "@tanstack/react-query";
import { fetchArtists } from "../../services/supabase.service";
import { Triangle } from "react-loader-spinner";

// export const getServerSideProps = async () => {
// 	//const { data } = await supabase.from("artists").select("name, id, current");

// };

export function Artist({ artist }: any) {
	return <li className="py-1 px-1 text-3xl">{artist.toUpperCase()}</li>;
}

export default function ArtistsPage() {
	const { isLoading, isError, data, error } = useQuery(
		["artists"],
		fetchArtists,
	);

	const artists = data
		?.filter((item) => item.name !== "Varios")
		.sort((a1, a2) => (a1.name.toUpperCase() < a2.name.toUpperCase() ? -1 : 1));

	const currentArtists = artists?.filter((a: any) => a.current);
	const formerArtists = artists?.filter((a: any) => !a.current);
	return (
		<PageLayout>
			<main className="flex flex-col items-center justify-center">
				{isLoading && <Triangle color="#fcba03" />}
				<section className="py-20 text-center">
					<ul className="text-center">
						{currentArtists?.map((artist: any) => (
							<Artist key={artist.id} artist={artist.name} />
						))}
					</ul>

					{!isLoading && (
						<div className="pt-10 pb-2 text-4xl text-primary">*</div>
					)}
					<ul className="text-center">
						{formerArtists?.map((artist: any) => (
							<Artist key={artist.id} artist={artist.name} />
						))}
					</ul>
				</section>
			</main>
		</PageLayout>
	);
}
