import { useLoaderData } from "react-router-dom";
import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import useAxios from "../../../hooks/useAxios";
import { FaUtensils } from "react-icons/fa";



const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY
//const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;


const UpdateItem = () => {
    const { name, category, recipe, price, _id, image } = useLoaderData()
    const { register, handleSubmit, reset } = useForm()
    const axiosPublic = useAxiosPublic()
    const axiosSecure = useAxios()
    // const item = useLoaderData()

    // console.log(item);

    const onSubmit = async (data) => {
        console.log(data);
        // const imageFile = { image: data.image[0] }
        // const res = await axiosPublic.post(image_hosting_api, imageFile, {
        //     headers: {
        //         'content-type': 'multipart/form-data'
        //     }
        // });
        // console.log(res.data); // if work true then image hosting successfully 

        // if (data.success) {
            // now send data mongo  
            const menuItem = {
                name: data.name,
                category: data.category,
                price: parseFloat(data.price),
                recipe: data.recipe,
                 image: image
            }
            const menuRes = await axiosSecure.patch(`/menu/${_id}`, menuItem);
            console.log(menuRes.data)
            if (menuRes.data.modifiedCount > 0) {
                // show success popup
                // reset();
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: `${data.name} is updated to the menu.`,
                    showConfirmButton: false,
                    timer: 1500
                });
            }
        // }
        // console.log( 'with image url', res.data);
    };
    return (
        <div>
            <SectionTitle heading='Update an Item' subHeading='Refresh info'></SectionTitle>
            <div className="bg-[#F3F3F3]">
                <form onSubmit={handleSubmit(onSubmit)}>

                    <div className="form-control w-full my-6">
                        <label className="label">
                            <span className="label-text">Recipe name?</span>

                        </label>
                        <input type="text"
                            defaultValue={name}
                            placeholder="Recipe name"
                            {...register("name", { require: true })}
                            className="input input-bordered w-full " />

                    </div>

                    <div className="flex gap-6">
                        {/* category */}
                        <div className="form-control w-full my-6">
                            <label className="label">
                                <span className="label-text">Category name?</span>

                            </label>
                            <select defaultValue={category}  {...register("category")}
                                className="select select-bordered w-full ">
                                <option disabled value='default'>Selected a category</option>
                                <option value="salad">Salad</option>
                                <option value="pizza">Pizza</option>
                                <option value="soup">Soup</option>
                                <option value="dessert">Dessert</option>
                                <option value="drinks">Drinks</option>
                            </select>
                        </div>
                        {/* price */}
                        <div className="form-control w-full my-6">
                            <label className="label">
                                <span className="label-text">Price?</span>

                            </label>
                            <input type="number"
                                defaultValue={price}
                                placeholder="Price"
                                {...register("price", { require: true })}
                                className="input input-bordered w-full " />
                        </div>
                    </div>
                    {/* recipe details */}
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Recipe Details</span>

                        </label>
                        <textarea defaultValue={recipe} {...register("recipe")}
                            className="textarea textarea-bordered h-24 w-full"
                            placeholder="Recipe Details"></textarea>

                    </div>


                    <div className="form-control w-full my-6">
                        <input {...register("image", { require: true })} type="file" className="file-input w-full max-w-xs" />
                    </div>

                    <button className="btn">Update menu Item <FaUtensils className="ml-4" /></button>
                </form>
            </div>
        </div>
    );
};

export default UpdateItem;