import React, {useEffect, useState} from 'react';
import useLoadUserData from "../LoadUserData";
import {useNavigate} from "react-router-dom";




const LoadData = ({children}:any) => {
  const {user, loading} = useLoadUserData();
  const [deviceToken, setDeviceToken] = useState()
  useEffect(() => {
    checkAccount();
  }, [user, loading]);
 const checkAccount = () =>{
   if (!loading && user === null) {
   }
   if (user) {

   }
 }
  return (<>
    {loading ? <div>

    </div> : children}
  </>);
}
export default LoadData;
