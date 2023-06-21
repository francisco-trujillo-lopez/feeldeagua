export const getAlbumFilename = (album: any) => {
	return `${album?.artists?.name} - ${album.name} (${album.year})`;
};
