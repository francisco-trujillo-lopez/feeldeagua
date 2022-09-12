// import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import { supabase } from "../../../utils/supbaseClient";
import { useEffect, useState } from "react";

interface Album {
	id: number;
	name: string;
	year: number;
	coverUrl: string;
	fileUrl: string;
}

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

export const Album = () => {
	async function fetchAlbums() {
		const { data, error } = await supabase
			.from("discos")
			.select()
			.order("year", { ascending: false });

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
							{aby.albums.map((album) => (
								<div key={album.id} className=" h-[400px] w-[400px] mb-10">
									<div className="m-4">
										<Image
											alt="album cover"
											width={350}
											height={350}
											src={(album as any).cover_url}></Image>
										<div>
											<b>{album.name}</b>
										</div>
										<div>{album.artist_name}</div>
									</div>
								</div>
							))}
						</div>
					</div>
				);
			})}
		</div>
	);
};