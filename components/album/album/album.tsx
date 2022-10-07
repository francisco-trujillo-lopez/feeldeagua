// import Image from "next/image";

export const Album = ({ album }: any) => {
	return (
		<div className="mx-6 md:mx-12 h-[400px] w-[400px] mb-10 mt-10">
			<div className="h-[350px] w-[350px] m-4">
				<picture>
					<a href={`${album.file_url}`} rel="noopener noreferrer">
						<img
							alt="album cover"
							width={350}
							height={350}
							src={album.cover_url}></img>
					</a>
				</picture>
			</div>
			<div className="mx-12 md:mx-20">
				<b>{album.name}</b>
			</div>
			<div className="mx-12 md:mx-20">{album.artists.name}</div>
		</div>
	);
};
