/* eslint-disable @next/next/no-img-element */

import { Suspense, useRef, useState } from "react";
import { DownloadAlbumModal } from "../../modal/modal";
import useMobile from "../../../hooks/useMobile";
import { Dna } from "react-loader-spinner";
import { BasicDownloadAlbumModal } from "../../modal/download-modal";

export type Album = {};

export const Album = ({ album }: any) => {
	const [showModal, setShowModal] = useState(false);
	const { isMobile } = useMobile();
	const dialogRef = useRef<any>(null);

	const handleOpen = () => {
		if (!dialogRef || !dialogRef.current) return;
		dialogRef.current.showModal();
		//setShowModal(true);
	};

	const handleClose = () => {
		if (!dialogRef || !dialogRef.current) return;
		dialogRef.current.closeModal();
	};

	return (
		<>
			<Suspense fallback={<Dna />}>
				<div className="mb-5 mt-10 lg:mx-12 lg:mb-10 ">
					<div className="group w-[250px] lg:h-[350px] lg:w-[350px]">
						<picture>
							<div className="faded-edges golden-shadow flex flex-col justify-center">
								{
									<a
										rel="noopener noreferrer"
										className="faded-edges gray-shadow"
										onClick={handleOpen}>
										<img
											alt="album cover"
											className={`faded-edges h-[300px]lg:h-[350px] w-[300px] cursor-pointer contrast-125 lg:w-[350px]`}
											src={album.cover_url || ""}
										/>
									</a>
								}
								{/*<div
								onClick={handleOpen}
								className="faded-edges golden-shadow cursor-pointer"
								style={{
									background: `url(${album.cover_url}) no-repeat center`,
									backgroundSize: "cover",
									width: "350px",
									height: "350px",
								}}></div>
						*/}

								{!isMobile && (
									<div className="pointer-events-none invisible absolute w-[350px] text-center text-xl group-hover:visible">
										<section className="mx-12 md:mx-20">
											<b>{album.name}</b>
										</section>
										<section className="mx-12 text-yellow-200 md:mx-20">
											{album?.artists?.name?.toUpperCase()}
										</section>
									</div>
								)}
							</div>
						</picture>

						{isMobile && (
							<div className="text-md pointer-events-none pt-2 text-center">
								<section className="mx-6 md:mx-20">
									<b>{album.name}</b>
								</section>
								<section className="mx-6 text-yellow-200 md:mx-20">
									{album?.artists?.name?.toUpperCase()}
								</section>
							</div>
						)}
					</div>
				</div>

				<dialog ref={dialogRef} className="rounded-sm backdrop:backdrop-blur">
					<BasicDownloadAlbumModal
						opened={showModal}
						close={handleClose}
						album={album}
					/>
				</dialog>
			</Suspense>
		</>
	);
};
