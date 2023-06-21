import { NextPage } from "next";
import AdminLayout from "../../components/layout/admin-layout";

const AdminPage: NextPage = () => {
	return (
		<AdminLayout>
			<div className="text-xl text-blue-700">This is the admin page</div>
		</AdminLayout>
	);
};

export default AdminPage;
