import { NextPage } from "next";
import AdminLayout from "../../components/layout/admin-layout";

const ArtistAdd: NextPage = () => {
	return (
		<AdminLayout>
			<div className="text-xl text-blue-700">This is the Add Artist page</div>
		</AdminLayout>
	);
};

export default ArtistAdd;
