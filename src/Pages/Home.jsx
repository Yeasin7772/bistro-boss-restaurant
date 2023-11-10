import { Helmet } from "react-helmet-async";
import Category from "./Category/Category";
import Featured from "./Featured";
import Banner from "./Header/Banner";
import PopularMenu from "./PopularMenu";
import Testimonials from "./Testimonials";


const Home = () => {
    return (
        <div>
             <Helmet>
                <title>Bistro Boss | Home</title>
                
            </Helmet>
            <Banner/>
            <Category/>
            <PopularMenu/>
            <Featured/>
            <Testimonials/>
        </div>
    );
};

export default Home;