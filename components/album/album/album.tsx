// import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import { supbase } from "../../../utils/supbaseClient";
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

	return albumsByYear;
};

export const Album = () => {
	async function fetchAlbums() {
		const { data, error } = await supbase
			.from("discos")
			.select()
			.order("year", { ascending: false });

		if (!error) {
			setAlbumsByYear(getAlbumsByYear(data));
		}

		console.log("DATA: ", data);
		console.log("ERROR: ", error);
	}

	const [albumsByYear, setAlbumsByYear] = useState<AlbumByYear[] | null>(null);
	useEffect(() => {
		fetchAlbums();
	}, []);

	return (
		<div className="text-center justify-center">
			{albumsByYear?.map((aby) => {
				return (
					<div key={aby.year} className="mb-5">
						<h1 className="font-bold text-4xl">{aby.year}</h1>
						<div className="grid grid-cols-3s">
							{aby.albums.map((album) => (
								<div
									key={album.id}
									className="border-dashed border border-black">
									<Image
										alt="album cover"
										width={200}
										height={200}
										src={album ? `${(album as any).cover_url}` : ""}></Image>
								</div>
							))}
						</div>
					</div>
				);
			})}
		</div>
	);
};

/* 

							<div className="font-bold">
										{album ? (album as any).name : ""}
									</div>
									<div>{album ? (album as any).artist_name : ""}</div>

	return (
		<div className="flex flex-col text-center justify-center">
			{albums?.map((album) => (
				<div key={album.id} className="mb-4">
					<Image
						alt="album cover"
						width={200}
						height={200}
						src={album ? `${(album as any).cover_url}` : ""}></Image>
					<div className="font-bold">{album ? (album as any).name : ""}</div>
					<div>{album ? (album as any).artist_name : ""}</div>
				</div>
			))}
		</div>

	);
*/
