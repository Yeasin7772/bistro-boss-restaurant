import { FaAd, FaClipboardList, FaCalendar, FaHome, FaShoppingCart, FaSearch } from "react-icons/fa";
import { NavLink, Outlet } from "react-router-dom";
import useCart from "../hooks/useCart";

const Dashboard = () => {
    const [cart] = useCart()
    return (
        <div className="flex">
            <div className="w-64 min-h-screen bg-orange-400">
                <ul className="menu">
                    <li>
                        <NavLink to='/dashboard/userHome'> <FaHome /> User Home</NavLink>
                    </li>
                    <li>
                        <NavLink to='/dashboard/reservation'> <FaCalendar /> Reservation</NavLink>
                    </li>
                    <li>
                        <NavLink to='/dashboard/cart'> <FaShoppingCart />My Cart ({cart?.length})</NavLink>
                    </li>
                    <li>
                        <NavLink to='/dashboard/review'> <FaAd /> Review</NavLink>
                    </li>
                    <li>
                        <NavLink to='/dashboard/myBookings'> <FaClipboardList /> My Bookings</NavLink>
                    </li>
                    <div className="divider"></div>
                    <li>
                        <NavLink to='/'> <FaHome />  Home</NavLink>
                    </li>
                    <li>
                        <NavLink to='/order/salad'> <FaSearch />  Menu</NavLink>
                    </li>


                </ul>

            </div>
            <div className="flex-1 p-5">
                <Outlet />
            </div>
        </div>
    );
};

export default Dashboard;