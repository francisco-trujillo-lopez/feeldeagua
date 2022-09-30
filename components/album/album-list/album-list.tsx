import { supabase } from "../../../utils/supabaseClient";
import { useEffect, useState } from "react";
import { Album } from "../album/album";

interface AlbumByYear {
	year: number;
	albums: Array<any>;
}

const getAlbumsByYear = (data: any[]) => {
	const albumsByYear: AlbumByYear[] = [];

	data.forEach((album) => {
		const year = albumsByYear.filter((aby) => aby.year === album.year)[0];

		if (year) {
			year.albums.push(album);
		} else {
			albumsByYear.push({ year: album.year, albums: [album] });
		}
	});

	console.log(albumsByYear);
	return albumsByYear;
};

export const AlbumList = () => {
	async function fetchAlbums() {
		const { data, error } = await supabase
			.from("albums_duplicate")
			.select(`*, artists (name)`)
			.order("id", { ascending: false });

		if (!error) {
			setAlbumsByYear(getAlbumsByYear(data));
		}
	}

	const [albumsByYear, setAlbumsByYear] = useState<AlbumByYear[] | null>(null);
	useEffect(() => {
		fetchAlbums();
	}, []);

	return (
		<div className="text-center justify-center">
			{albumsByYear?.map((aby) => {
				return (
					<div key={aby.year} className="">
						<h1 className="font-bold text-4xl mb-5 mt-5">{aby.year}</h1>
						<div className="grid grid-cols-1 sm:grid-cols-3 mb-[100px]">
							{aby.albums.map((album, index) => {
								return <Album key={index} album={album} />;
							})}
						</div>
					</div>
				);
			})}
		</div>
	);
};
