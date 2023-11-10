import {Outlet} from 'react-router-dom'
import Footer from '../SharedPages/Footer';
import NavBar from '../SharedPages/NavBar';

const MainLayout = () => {
    return (
        <div>
            <NavBar/>
            <Outlet/>
            <Footer/>
        </div>
    );
};

export default MainLayout;