import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../hooks/useAuth";
import useAxios from "../../../hooks/useAxios";
import { FaBook, FaCar, FaDollarSign, FaUser } from "react-icons/fa";


const AdminHome = () => {
    const { user } = useAuth()
    const axiosSecure = useAxios()

    const { data: stats } = useQuery({
        queryKey: ['admin-stats'],
        queryFn: async () => {
            const res = await axiosSecure.get('/admin-stats')
            return res.data
        }
    })
    return (
        <div>
            <h2 className="text-2xl">
                <span>Hi, Welcome</span>
                {
                    user?.displayName ? user?.displayName : 'Back'
                }
            </h2>

            <div className="stats shadow gap-8 ">

                <div className="stat bg-gradient-to-r from-purple-500 to-pink-200">
                    <div className="stat-figure text-secondary">
                        <FaDollarSign className="text-5xl" />
                    </div>
                    <div className="stat-title">Revenue</div>
                    <div className="stat-value">${stats?.revenue}</div>
                    <div className="stat-desc">Jan 1st - Feb 1st</div>
                </div>

                <div className="stat  bg-gradient-to-r from-yellow-500 via-yellow-300 to-yellow-200 rounded">
                    <div className="stat-figure text-secondary">
                        <FaBook className="text-5xl" />
                    </div>
                    <div className="stat-title">Products</div>
                    <div className="stat-value">{stats?.menuItems}</div>
                    <div className="stat-desc">↗︎ 400 (22%)</div>
                </div>
                <div className="stat bg-gradient-to-r from-pink-500 to-pink-200">
                    <div className="stat-figure text-secondary">
                        <FaUser className="text-5xl" />
                    </div>
                    <div className="stat-title">Customers</div>
                    <div className="stat-value">{stats?.users}</div>
                    <div className="stat-desc">↗︎ 400 (22%)</div>
                </div>

                <div className="stat bg-gradient-to-r from-blue-500 to-blue-200">
                    <div className="stat-figure text-secondary">
                        <FaCar className="text-5xl"/>
                    </div>
                    <div className="stat-title">Orders</div>
                    <div className="stat-value">{stats?.orders}</div>
                    <div className="stat-desc">↘︎ 90 (14%)</div>
                </div>

            </div>

        </div>
    );
};

export default AdminHome;