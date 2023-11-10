import { Helmet } from 'react-helmet-async';
import Cover from '../../SharedPages/Cover/Cover';
import useMenu from '../../hooks/useMenu';
import SectionTitle from '../../components/SectionTitle/SectionTitle';
import MenuCategory from './MenuCategory/MenuCategory';
import menuImg from '../../assets/menu/banner3.jpg'
import dessertImg from '../../assets/menu/dessert-bg.jpeg'
import pizzaImg from '../../assets/menu/pizza-bg.jpg'
import saladImg from '../../assets/menu/salad-bg.jpg'
import soupImg from '../../assets/menu/soup-bg.jpg'

const Menu = () => {
    const [menu] = useMenu()
    const desserts = menu.filter(item => item.category === 'dessert')
    const soup = menu.filter(item => item.category === 'soup')
    const pizza = menu.filter(item => item.category === 'pizza')
    const salad = menu.filter(item => item.category === 'salad')
    const offered = menu.filter(item => item.category === 'offered')
    return (
        <div>
            <Helmet>
                <title>Bistro Boss | Menu</title>

            </Helmet>
            <Cover img={menuImg} title='our menu'></Cover>
            {/* main cover */}
            <SectionTitle subHeading="Don't miss" heading="TODAY'S OFFER">
            </SectionTitle> 
              {/* offered menu items */}
            <MenuCategory items={offered}></MenuCategory>
            {/* dessert menu items */}
            <MenuCategory title='Dessert' img={dessertImg} items={desserts}></MenuCategory>
             {/* pizza menu items */}
            <MenuCategory title='Pizza' img={pizzaImg} items={pizza}></MenuCategory>
             {/* salad menu items */}
            <MenuCategory title='salad' img={saladImg} items={salad}></MenuCategory>
             {/* salad menu items */}
            <MenuCategory title='soup' img={soupImg} items={soup}></MenuCategory>

        </div>
    );
};

export default Menu;