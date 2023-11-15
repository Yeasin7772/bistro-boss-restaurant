import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import useAxiosPublic from "../../hooks/useAxiosPublic";

const SocialLogin = () => {
    const { googleSingUp } = useAuth()
    const axiosPublic = useAxiosPublic()
    const navigate = useNavigate()

    const handelGoogleLogin = () => {
        googleSingUp()
            .then(result => {
                console.log(result)
                const userInfo ={
                   email: result?.user?.email,
                   name: result?.user?.displayName
                }
                axiosPublic.post('/users', userInfo)
                .then(res => {
                    console.log(res.data);
                    navigate('/')
                })
            })
            .then(error => {
                console.error(error);
            })

    }
    return (
        <div>
            <div onClick={handelGoogleLogin}>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <g clip-path="url(#clip0_3_144)">
                        <path d="M0 12C0 5.3832 5.3832 0 12 0C14.6723 0 17.2017 0.859771 19.3147 2.4864L16.5262 6.1088C15.2197 5.10309 13.6545 4.57143 12 4.57143C7.90389 4.57143 4.57143 7.90389 4.57143 12C4.57143 16.0961 7.90389 19.4286 12 19.4286C15.2991 19.4286 18.1026 17.2671 19.0688 14.2857H12V9.71429H24V12C24 18.6168 18.6168 24 12 24C5.3832 24 0 18.6168 0 12Z" fill="#444444" />
                    </g>
                    <defs>
                        <clipPath id="clip0_3_144">
                            <rect width="24" height="24" fill="white" />
                        </clipPath>
                    </defs>
                </svg>
            </div>
        </div>
    );
};

export default SocialLogin;