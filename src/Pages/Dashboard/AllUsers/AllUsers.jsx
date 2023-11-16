import { useQuery } from "@tanstack/react-query";
import useAxios from "../../../hooks/useAxios";
import { FaTrashAlt, FaUsers } from "react-icons/fa";
import Swal from "sweetalert2";


const AllUsers = () => {

    const axiosSecure = useAxios()
    const { data: users = [], refetch } = useQuery({
        queryKey: ["users"],
        queryFn: async () => {
            try {
                const res = await axiosSecure.get('/users');
                return res.data;
            } catch (error) {
                throw new Error("Error fetching user data: " + error.message);
            }
        }
    });
    // console.log(users);

    // make admin update user 

    const handelMakeAdmin = (user) => {
        axiosSecure.patch(`/users/admin/${user._id}`)
            .then(res => {
                console.log(res.data);
                if (res.data.modifiedCount > 0) {
                    refetch()
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: `${user.name} is an Admin now!`,
                        showConfirmButton: false,
                        timer: 1500
                    });
                }
            })
    }




    // deleted users

    const handelDelete = (id) => {
        console.log(id);

        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {

                axiosSecure.delete(`/users/${id}`)
                    .then(res => {
                        if (res.data.deletedCount > 0) {
                            refetch()
                            Swal.fire({
                                title: "Deleted!",
                                text: "Your file has been deleted.",
                                icon: "success"
                            });
                        }
                    })
            }
        });
    }



    return (
        <div>
            <div className="flex justify-evenly my-5">
                <h2 className="text-3xl">All Users</h2>
                <h2 className="text-3xl">Total Users : {users.length} </h2>
            </div>
            <div className="overflow-x-auto">
                <table className="table table-zebra w-full">
                    {/* head */}
                    <thead>
                        <tr>
                            <th></th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Roll </th>
                            <th>Action </th>
                        </tr>
                    </thead>
                    <tbody>
                        {users?.map((user, index) => <tr key={user._id}>
                            <th>{++index}</th>
                            <td>{user?.name}</td>
                            <td>{user?.email}</td>
                            <td>
                                {
                                    user.role === 'admin' ? <span className="text-xl text-primary">Admin</span> :
                                        <button onClick={() => handelMakeAdmin(user)}
                                            className="btn  btn-lg bg-[#D1A054]">
                                            <FaUsers className="text-white text-2xl" /></button>
                                }
                            </td>
                            <td>
                                <button onClick={() => handelDelete(user._id)}
                                    className="btn btn-ghost btn-lg"><FaTrashAlt className="text-red-600" /></button>
                            </td>
                        </tr>)}


                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AllUsers;