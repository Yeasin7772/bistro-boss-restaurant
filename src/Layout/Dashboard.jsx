import { FaAd, FaClipboardList, FaCalendar, FaHome, FaShoppingCart, FaEnvelope, FaUtensils, FaList, FaUsers, FaBook } from "react-icons/fa";
import { NavLink, Outlet } from "react-router-dom";
import useCart from "../hooks/useCart";
import useAdmin from "../hooks/useAdmin";

const Dashboard = () => {
    const { cart } = useCart()
    // TODO: get isAdmin value from the database
    const {isAdmin} = useAdmin()
    return (
        <div className="flex">
            <div className="w-64 min-h-screen bg-orange-400">
                <ul className="menu">
                    {
                        isAdmin ? <>
                            <li>
                                <NavLink to='/dashboard/adminHome'> <FaHome /> Admin Home</NavLink>
                            </li>
                            <li>
                                <NavLink to='/dashboard/addItems'> <FaUtensils /> Add Items</NavLink>
                            </li>
                            <li>
                                <NavLink to='/dashboard/manageItems'> <FaList />Manage Items</NavLink>
                            </li>
                            <li>
                                <NavLink to='/dashboard/bookings'> <FaBook /> Manage Bookings</NavLink>
                            </li>
                            <li>
                                <NavLink to='/dashboard/allUsers'> <FaUsers /> All Users</NavLink>
                            </li>
                        </> :
                            <>
                                <>
                                <li>
                                    <NavLink to="/dashboard/userHome">
                                        <FaHome></FaHome>
                                        User Home</NavLink>
                                </li>
                                <li>
                                    <NavLink to="/dashboard/reservation">
                                        <FaCalendar></FaCalendar>
                                        Reservation</NavLink>
                                </li>
                                <li>
                                    <NavLink to="/dashboard/cart">
                                        <FaShoppingCart></FaShoppingCart>
                                        My Cart ({cart.length})</NavLink>
                                </li>
                                <li>
                                    <NavLink to="/dashboard/review">
                                        <FaAd></FaAd>
                                        Add a Review</NavLink>
                                </li>
                                <li>
                                    <NavLink to="/dashboard/bookings">
                                        <FaList></FaList>
                                        My Bookings</NavLink>
                                </li>
                            </>
                            </>
                    }
                    <div className="divider"></div>
                    <li>
                        <NavLink to='/'> <FaHome />  Home</NavLink>
                    </li>
                    <li>
                        <NavLink to='/order/salad'> <FaEnvelope />  Contact</NavLink>
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