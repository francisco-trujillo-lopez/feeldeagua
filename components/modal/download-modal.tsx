/* eslint-disable @next/next/no-img-element */

import { getAlbumFilename } from "../../utils/album-file-name";
import useDownloader from "../../utils/useDownloader/use-downloader";
import { ProgressBar } from "../progress-bar";
import { supabase } from "../../utils/supabaseClient";

export type DownloadModalProps = {
	album: any;
	opened: boolean;
	close: () => void;
};

export function BasicDownloadAlbumModal({
	opened,
	close,
	album,
}: DownloadModalProps) {
	const { percentage, download, cancel, error, isInProgress, isComplete } =
		useDownloader();

	const handleDownload = (album: any) => {
		const filename = getAlbumFilename(album);
		download(album.file_url, filename).then(() =>
			updateAlbumDownloads(album.id, album.downloads),
		);
	};

	async function updateAlbumDownloads(albumId: number, downloads: number) {
		const data = supabase.rpc("incrementDownloads", { albumId: album.id });
		console.log(data);

		if (error) console.log("ERROR: ", error);
	}

	return (
		<>
			<div>
				<div className="flex flex-col items-center justify-center">
					<img
						alt="album cover"
						width={450}
						height={450}
						src={album.cover_url || ""}
					/>
					<span className="mx-6 p-5">
						<p>
							Gracias por descargar{" "}
							<span className="font-bold">{album.name}</span> de{" "}
							<span className="font-bold">{album?.artists?.name}</span>
						</p>
					</span>
				</div>
				<ProgressBar
					percentage={percentage}
					isComplete={/*isComplete*/ false}
					error={error?.errorMessage || ""}
				/>
			</div>
			<div className="flex flex-row items-center justify-center p-7">
				<button
					className="mr-1 mb-1 rounded bg-yellow-500 px-6 py-3 text-sm font-bold uppercase text-black shadow outline-none transition-all duration-150 ease-linear hover:shadow-lg focus:outline-none active:bg-emerald-600"
					type="button"
					onClick={() => handleDownload(album)}
					disabled={isInProgress && !isComplete}>
					{isComplete ? "Descargar de nuevo" : "Descargar"}
				</button>
			</div>
		</>
	);
}
