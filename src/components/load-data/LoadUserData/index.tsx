import useSWR from 'swr';
import store from "../../../stores";
import {setAccountData} from "../../../stores/userSlice";
import jwt_decode from "jwt-decode";

const loadUserData = () => {
  return new Promise(async resolve => {
    try {
      const tokens = await localStorage.getItem('accessToken') as string
      const user = await jwt_decode(tokens)
      if(user){
        console.log("111111",user)
        store.dispatch(setAccountData(user));
      }else {
        window.location.replace( '/login')
      }
      resolve(user);
    }
    catch(err) {
      resolve(null);
    }
  })
}


export const loadData = (props: any) => {
  return new Promise(async (resolve, reject) => {
    const user = await loadUserData();
    resolve({
      userData: user,
    })
  })
}

export default function useLoadUserData() {
  const {data, error}: any = useSWR("/", loadData);

  const loading = !data && !error;

  return {
    user: data?.userData,
    loading,
  }
}
