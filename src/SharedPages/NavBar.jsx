import { Link } from 'react-router-dom'
import useAuth from '../hooks/useAuth';
const NavBar = () => {
    const { user, logOut } = useAuth()

    const handelLogOut = () => {
        logOut()
        .then(result => {
            const user = result.user
            console.log(user);
        })
        .catch(error => {
            console.error(error);
        })
    }

    const navLinks =
        <>
            <li className='text-xl font-medium'><Link to='/'>Home</Link></li>
            <li className='text-xl font-medium'><Link to='/menu'>Our Menu</Link></li>
            <li className='text-xl font-medium'><Link to='/order/salad'>Order Food</Link></li>
            <li className='text-xl font-medium'><Link to='/contact'>CONTACT US</Link></li>
            <li className='text-xl font-medium'> <Link to='/dashboard'>DASHBOARD</Link></li>
        </>

    return (
        <>
            <div className="navbar fixed z-10 bg-opacity-10 lg:text-white max-w-screen-xl bg-[#15151580] uppercase">
                <div className="navbar-start">
                    <div className="dropdown">
                        <label tabIndex={0} className="btn btn-ghost lg:hidden">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                        </label>
                        <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                            {navLinks}


                        </ul>
                    </div>
                    <a className="btn btn-ghost normal-case text-xl">BISTRO BOSS <br />Restaurant</a>
                </div>
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-1">
                        {navLinks}
                    </ul>
                </div>
                <div className="navbar-end">
                    {
                        user ? <Link ><button onClick={handelLogOut} className='btn btn-ghost'>Log Out</button></Link>
                            :
                            <Link to='/login'><button className='btn btn-outline btn-secondary'>Login</button></Link>

                    }
                </div>
            </div>

        </>
    );
};

export default NavBar;