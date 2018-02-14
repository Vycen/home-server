//import { setTimeout } from "timers";
import { URL } from "../constants";

let __headers = {
  "Authorization":undefined,
  "Content-Type":"application/json"
};

export const toggle = () => new Promise((res, rej)=>{
  fetch(URL.host+"/api/user", {
    method:'GET',
    headers:{
      ...__headers
    },
  }).then(
    (resp)=>{
      if(resp.status != 200) return Promise.reject(resp.status);
      else return resp.json();
    }
  )
    .then(
      (users)=>{
        res(users);
      }
    )
    .catch(
      (err)=>{
        rej(err);
      }
    )
});