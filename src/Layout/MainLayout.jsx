import { Outlet, useLocation } from 'react-router-dom'
import Footer from '../SharedPages/Footer';
import NavBar from '../SharedPages/NavBar';

const MainLayout = () => {
    const location = useLocation()
    const noHeaderFooter = location.pathname.includes('login') || location.pathname.includes('signUp')
    return (
        <div>
           { noHeaderFooter ||  <NavBar />}
            <Outlet />
           { noHeaderFooter || <Footer />}
        </div>
    );
};

export default MainLayout;