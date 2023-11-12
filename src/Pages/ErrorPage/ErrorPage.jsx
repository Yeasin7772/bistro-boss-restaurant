import errorImg from '../../assets/reservation/404.gif'
import{Link} from 'react-router-dom'
const ErrorPage = () => {
    return (
        <div className='min-h-screen'>
            <img src={errorImg} alt="Error" />
           <Link to='/'><button className='btn btn-outline'>Back</button></Link>
        </div>
    );
};

export default ErrorPage;