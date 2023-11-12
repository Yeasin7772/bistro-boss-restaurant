import { Helmet } from "react-helmet-async";
import Category from "./Category/Category";
import Featured from "./Featured";
import Banner from "./Header/Banner";
import PopularMenu from "./PopularMenu";
import Testimonials from "./Testimonials";
import ContactInfo from "./ContactInfo/ContactInfo";


const Home = () => {
    return (
        <div>
             <Helmet>
                <title>Bistro Boss | Home</title>
                
            </Helmet>
            <Banner/>
            <Category/>
            <PopularMenu/>
            <ContactInfo/>
            <Featured/>
            <Testimonials/>
        </div>
    );
};

export default Home;