
import { Album } from "../album/album";
import { useQuery } from "@tanstack/react-query";
import { Audio, Dna, Triangle } from "react-loader-spinner";
import { fetchAlbums } from "../../../services/supabase.service";

export const AlbumList = () => {
	const { isLoading, isError, data, error } = useQuery(['albums'], fetchAlbums);

	return (
		<>
		{isLoading && <Triangle color="#fcba03" />}
			<div className="justify-center p-2 pt-2 text-center">
				<div className="mb-[100px] grid grid-cols-1 lg:grid-cols-3">
					{data?.map((album: any, index: number) => {
						return <Album key={index} album={album} />;
					})}
				</div>
			</div>
			</>
	);
};
