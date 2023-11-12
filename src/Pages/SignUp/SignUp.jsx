import { Link, useNavigate } from 'react-router-dom'
import img from '../../assets/others/authentication1.png'
import { useForm } from 'react-hook-form';
import { Helmet } from 'react-helmet-async';
import useAuth from '../../hooks/useAuth';
import Swal from 'sweetalert2';


const SignUp = () => {
    const { register, handleSubmit, reset, formState: { errors }, } = useForm()
    const { createUser, updateUserProfile } = useAuth()
    const navigete = useNavigate()

    const onSubmit = (data) => {
        // console.log(data)
        createUser(data.email, data.password)
            .then(result => {
                const loggedUser = result.user
                console.log(loggedUser);
                updateUserProfile(data.name, data.PhotoURL)
                    .then(() => {
                        navigete('/')
                        Swal.fire({
                            position: "top-end",
                            icon: "success",
                            title: "Account Create successfully",
                            showConfirmButton: false,
                            timer: 1500
                        });

                    })
                    .catch(error => {
                        console.error(error);
                    })
            })
            .catch(error => {
                console.error(error);
            })


    }



    // const handelSignUp = () => {
    //     e.preventDefault()
    //     const form = e.target
    //     const name = form.name.value
    //     const email = form.email.value
    //     const password = form.password.value
    //     console.log(email, password, name);
    // }
    return (
        <>
            <Helmet>
                <title>Bistro Boss | Sign Up</title>

            </Helmet>
            <div className="hero min-h-screen bg-[#FFF]">
                <div className="hero-content flex-col lg:flex-row">
                    <div className=" w-1/2 mr-12 ">

                        <img src={img} alt="" />
                    </div>
                    <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                        <form onSubmit={handleSubmit(onSubmit)} className="card-body">
                            <h1 className="text-4xl text-center font-bold">Sign Up!</h1>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Name</span>
                                </label>
                                <input {...register("name", { required: true })}
                                    type="text" name='name' placeholder="Name" className="input input-bordered" />
                                {errors.name && <span className='text-red-500'>Name field is required</span>}
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">PhotoURL</span>
                                </label>
                                <input {...register("PhotoURL", { required: true })}
                                    type="PhotoURL" placeholder="PhotoURL" className="input input-bordered" />
                                {errors.PhotoURL && <span className='text-red-500'>PhotoURL field is required</span>}
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input {...register("email", { required: true })} type="email" name='email' placeholder="email" className="input input-bordered" />
                                {errors.email && <span className='text-red-500'>Email field is required</span>}
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Confirm Password</span>
                                </label>
                                <input {...register("password", { required: true, minLength: 8, maxLength: 20, pattern: /(?=.*[A-Z])(?=.*[@#$%^&+=!])/ })} type="password" name='password' placeholder="password" className="input input-bordered" />
                                {errors.password?.type === 'minLength' && <span className='text-red-500'>password must be 8 characters</span>}
                                {errors.password?.type === 'maxLength' && <span className='text-red-500'>password less than 20 characters</span>}
                                {errors.password?.type === 'pattern' && <span className='text-red-500'>password has on uppercase,on lowercase, on number and special  characters</span>}
                                <label className="label">
                                    <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                                </label>
                            </div>
                            <div className="form-control mt-6">
                                <button type='submit' className="btn bg-[#D1A054] text-white">Sign Up</button>
                            </div>
                        </form>
                        <p className='my-4 text-center'>Already have an account?
                            <Link className='text-[#D1A054] font-bold' to='/login'> Login?</Link></p>
                    </div>
                </div>
            </div>
        </>
    );
};

export default SignUp;