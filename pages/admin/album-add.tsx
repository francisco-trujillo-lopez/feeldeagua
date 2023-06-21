import { NextPage } from "next";
import { useEffect, useRef, useState } from "react";
import Album from "../../components/album/album/album.type";
import AdminLayout from "../../components/layout/admin-layout";
import { supabase } from "../../utils/supabaseClient";
import { useForm } from "react-hook-form";
import Cropper from "react-easy-crop";
import Slider from "react-easy-crop";

const AlbumAdd: NextPage = () => {
	const [artists, setArtists] = useState<any[] | null>([]);
	const [files, setFiles] = useState([]);
	const [image, setImage] = useState("");
	const [crop, setCrop] = useState({ x: 0, y: 0 });
	const [zoom, setZoom] = useState<number>(1);

	const selectFileInputRef = useRef<HTMLInputElement>(null);
	const selectFile = () => {
		selectFileInputRef.current?.click();
	};

	const {
		register,
		handleSubmit,
		watch,
		formState: { errors },
	} = useForm();
	const onSubmit = async (data: Partial<Album>) => await insertAlbum(data);

	async function fetchArtists() {
		const { data, error } = await supabase
			.from("artists")
			.select("name, id")
			.order("name", { ascending: true });

		if (!error) {
			setArtists(data);
		}
	}

	async function insertAlbum(album: Partial<Album>) {
		const { data, error } = await supabase
			.from("albums")
			.insert([
				{ name: album.name, year: album.year, artist_id: album.artistId },
			]);

		console.log("ERROR: ", error);
	}

	useEffect(() => {
		fetchArtists();
	}, []);

	const years = () => {
		let years = [];

		for (let i = new Date().getFullYear(); i >= 1990; i--) {
			years.push(i.toString());
		}

		return years;
	};

	function customHandleSubmit(e: any) {
		e.preventDefault();
		console.log(
			"SUBMIT EVENT: ",
			Object.fromEntries(new FormData(e.target).entries()),
		);
	}

	function cropCompleted(e: any) {
		console.log("CROP COMPLETE");
	}

	const onImageSelected = (e: any) => {
		setImage(e.target.files[0] || null);

		if (e.target.files?.length) {
			const reader = new FileReader();
			reader.readAsDataURL(e.target.files[0]);
			reader.addEventListener("load", () => {
				setImage(String(reader.result));
			});
		}
	};

	return (
		<AdminLayout>
			<div className="m-8 flex flex-col">
				<div className="text-xl text-white mb-4 ml-4">Agregar nuevo disco</div>
				<form onSubmit={customHandleSubmit}>
					<div className="flex flex-col align-middle mx-2 px-5 bg-white text-black rounded-sm">
						<span className="">Tapa</span>

						<div className="relative h-[400px]">
							<Cropper
								image={image || ""}
								crop={crop}
								zoom={zoom}
								zoomWithScroll
								onCropChange={setCrop}
								aspect={1}
								onZoomChange={(zoom) => setZoom(zoom)}
								onCropComplete={cropCompleted}
							/>
						</div>

						<input
							type="range"
							min="1"
							max="2"
							step={0.001}
							value={zoom}
							className="range range-secondary my-2"
							onChange={(e) => setZoom(Number(e.target.value))}
						/>

						<input
							className="file-input my-4 hidden"
							id="upload-cover"
							type="file"
							ref={selectFileInputRef}
							onChange={onImageSelected}
						/>

						<input
							className="btn btn-primary my-4"
							type="button"
							onClick={selectFile}
							value={"SELECCIONAR TAPA"}
						/>

						<span className="my-2">Nombre</span>
						<input
							type={"text"}
							className="input input-bordered"
							{...register("name")}
						/>

						<span className="my-2">Artista</span>
						<select
							className="select select-bordered"
							{...register("artist_id")}>
							{artists?.map((artist) => {
								return (
									<option key={artist.id} value={artist.id}>
										{artist.name}
									</option>
								);
							})}
						</select>

						<span className="my-2">Año</span>
						<select className="select select-bordered" {...register("year")}>
							{years().map((year) => {
								return (
									<option key={year} value={year}>
										{year}
									</option>
								);
							})}
						</select>
						<input
							className="btn btn-primary my-4"
							type="submit"
							value="GUARDAR"
						/>
					</div>
				</form>
			</div>
		</AdminLayout>
	);
};

export default AlbumAdd;