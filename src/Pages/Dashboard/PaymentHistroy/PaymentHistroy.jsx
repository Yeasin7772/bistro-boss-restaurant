import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../hooks/useAuth";
import useAxios from "../../../hooks/useAxios";


const PaymentHistory = () => {
    const { user } = useAuth()
    const axiosSecure = useAxios()
    const { data: payments = [] } = useQuery({
        queryKey: ['payments', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/payment/${user.email}`)
            return res.data
        }
    })
    return (
        <div>
            <h2 className="text-3xl">Total payments: {payments.length}</h2>
            <div className="overflow-x-auto">
                <table className="table table-zebra">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Price</th>
                            <th>Transaction Id</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                       
                       {payments?.map((payment,idx) =>  <tr key={payment._id}>
                            <th>{++idx}</th>
                            <td>${payment?.price}</td>
                            <td>{payment?.transactionId}</td>
                            <td>{payment?.status}</td>
                        </tr>)}
                       
                       
                    </tbody>
                </table>
            </div>

        </div>
    );
};

export default PaymentHistory;