import { NextPage } from "next";
import Layout from "../../components/layout/layout";

const AdminPage: NextPage = () => {
	return (
		<Layout>
			<div className="text-xl text-blue-700">This is the admin page</div>
		</Layout>
	);
};

export default AdminPage;
