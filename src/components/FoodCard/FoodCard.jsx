
const FoodCard = ({item}) => {
    const { _id, name, recipe, image, category, price } = item || {}
    return (
        <div>
            <div className="card w-96 bg-base-100 shadow-xl">
                <figure><img src={image} alt="Shoes" /></figure>
                <p className="absolute right-0 bg-slate-900 text-white mt-4 mr-4 px-4 ">$ {price}</p>
                <div className="card-body flex flex-col items-center">
                    <h2 className="card-title">{name}</h2>
                    <p>{recipe}</p>
                    <div className="card-actions justify-end">
                    <button className="btn btn-outline bg-slate-100 border-orange-300 border-0 border-b-4 text-orange-400">Add to cart</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FoodCard;