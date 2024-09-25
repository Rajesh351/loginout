import { useEffect } from "react"
import { JOB_API_END_POINT } from "../components/consts";
import { useDispatch } from "react-redux";
import { setEmpolye } from "../redux/authSlice";
import axios from "axios";
const useGetAllEmploye=()=>{
    const dispatch=useDispatch();
    useEffect(()=>{
        const allempolye=async()=>{

            try {
                const res = await axios.get(`${JOB_API_END_POINT}/getall`,{withCredentials:true});
                if(res.data.success){
                    dispatch(setEmpolye(res.data.users));
                }
            } catch (error) {
                console.log(error);
            }
        }
        allempolye();
    },[])
}
export default useGetAllEmploye;