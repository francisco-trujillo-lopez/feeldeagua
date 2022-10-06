import { supabase } from "../../../utils/supabaseClient";
import { useEffect, useState } from "react";
import { Album } from "../album/album";

export const AlbumList = () => {
	async function fetchAlbums() {
		const { data, error } = await supabase
			.from("albums_duplicate")
			.select(`*, artists (name)`)
			.order("id", { ascending: false });

		if (!error) {
			setAlbums(data);
		}
	}

	const [albums, setAlbums] = useState<any[] | null>([]);
	useEffect(() => {
		fetchAlbums();
	}, []);

	return (
		<div className="text-center justify-center">
			<div className="grid grid-cols-1 lg:grid-cols-3 mb-[100px]">
				{albums!.map((album, index) => {
					return <Album key={index} album={album} />;
				})}
			</div>
		</div>
	);
};
