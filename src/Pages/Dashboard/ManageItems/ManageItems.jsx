import { FaEdit, FaTrashAlt } from "react-icons/fa";
import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import useMenu from "../../../hooks/useMenu";
import useAxios from "../../../hooks/useAxios";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";

const ManageItems = () => {
    const [menu, refetch] = useMenu()
    const axiosSecure = useAxios()

    const handelDelete = (item) => {
        console.log(item);

        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then(async (result) => {
            if (result.isConfirmed) {
                const res = await axiosSecure.delete(`/menu/${item?._id}`)
                if (res.data.deletedCount > 0) {
                    refetch()
                    Swal.fire({
                        title: "Deleted!",
                        text: `${item?.name} has been deleted`,
                        icon: "success"
                    });
                }

            }
        });
    }
    return (
        <div>
            <SectionTitle heading='Manage All Items'
                subHeading='Hurry Up'></SectionTitle>
            <div>
                <div className="overflow-x-auto">
                    <table className="table w-full">
                        {/* head */}
                        <thead>
                            <tr>
                                <th>
                                    #
                                </th>
                                <th>Image</th>
                                <th>Items Name</th>
                                <th>Price</th>
                                <th>Update</th>
                                <th>Deleted</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                menu?.map((item, idx) => <tr key={item._id}>
                                    <td>
                                        {++idx}
                                    </td>
                                    <td>
                                        <div className="flex items-center gap-3">
                                            <div className="avatar">
                                                <div className="mask mask-squircle w-12 h-12">
                                                    <img src={item?.image} alt="Avatar Tailwind CSS Component" />
                                                </div>
                                            </div>

                                        </div>
                                    </td>
                                    <td>
                                        {item?.name}

                                    </td>
                                    <td>{item?.price}</td>
                                    <td>
                                        <Link to={`/dashboard/updateItem/${item?._id}`}
                                            className="btn  btn-lg ">
                                            <FaEdit className="text-[#D1A054] text-xl" /></Link>
                                    </td>
                                    <td>
                                        <td>
                                            <button onClick={() => handelDelete(item)}
                                                className="btn btn-ghost btn-lg"><FaTrashAlt className="text-red-600" /></button>
                                        </td>
                                    </td>
                                </tr>)
                            }

                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default ManageItems;