// import Image from "next/image";

export const Album = ({ album }: any) => {
	return (
		<div className="h-[400px] w-[400px] mb-10 mt-10">
			<div className="h-[350px] w-[350px] m-4">
				<picture>
					<img
						alt="album cover"
						width={350}
						height={350}
						src={album.cover_url}></img>
				</picture>
			</div>
			<div>
				<b>{album.name}</b>
			</div>
			<div>{album.artists.name}</div>
		</div>
	);
};
