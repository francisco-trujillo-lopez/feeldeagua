/* eslint-disable @next/next/no-img-element */

import { useRef, useState } from "react";
import { DownloadAlbumModal } from "../../modal/modal";
import useMobile from "../../../hooks/useMobile";

/*const options = {
	pixels: 10000,
	distance: 1,
	splitPower: 3,
	saturationDistance: 0,
	lightnessDistance: 1,
	hueDistance: 0,
};*/

export type Album = {};

export const Album = ({ album }: any) => {
	// const [opened, { open, close }] = useDisclosure(false);
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
		//setShowModal(false);
	};

	return (
		<>
			<div className="mb-10 mt-10 lg:mx-12">
				<div className="group h-[250px] w-[250px] lg:h-[350px] lg:w-[350px]">
					<picture>
						<div className="faded-edges golden-shadow flex flex-col justify-center">
							{
								<a
									rel="noopener noreferrer"
									className="faded-edges gray-shadow"
									onClick={handleOpen}>
									<img
										alt="album cover"
										className={`faded-edges contrast-115 h-[300px]lg:h-[350px] w-[300px] cursor-pointer lg:w-[350px]`}
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

							<div className="pointer-events-none invisible absolute w-[350px] text-center text-xl group-hover:visible">
								<section className="mx-12 md:mx-20">
									<b>{album.name}</b>
								</section>
								<section className="mx-12 text-yellow-200 md:mx-20">
									{album?.artists?.name?.toUpperCase()}
								</section>
							</div>
						</div>
					</picture>

					{isMobile && (
						<div className="text-md pointer-events-none pt-2 text-center">
							<section className="mx-12 md:mx-20">
								<b>{album.name}</b>
							</section>
							<section className="mx-12 text-yellow-200 md:mx-20">
								{album?.artists?.name?.toUpperCase()}
							</section>
						</div>
					)}
				</div>
			</div>

			<dialog ref={dialogRef}>
				<DownloadAlbumModal
					opened={showModal}
					close={handleClose}
					album={album}
				/>
			</dialog>
		</>
	);
};
