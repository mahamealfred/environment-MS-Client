import React, { useContext } from "react";
import axios from "axios";
import { Buffer } from "buffer";

//Local Test APIs:
//auth
const base_localhost_login_test = "http://localhost:8000/api/v1/auth";
//products
const base_localhost_view_product_test="http://localhost:8000/api/v1/product";
const serverResponse = {
    responseCode: "",
    responseDescription: "",
    communicationStatus: "",
    userId: "",
    username: "",
    email: "",
    token:"",
  
  };
const loginUser = async (requestPayload) => {
   

  try {
    const response=await axios.post(base_localhost_login_test,requestPayload)
    console.log("data.t..",response.data)
        if (response.data.status === "200") {
          serverResponse.responseDescription = response.data.message;
          serverResponse.responseCode = response.data.status;
          serverResponse.userId = response.data?.data?.id;
          serverResponse.username = response.data?.data?.username;
          serverResponse.email = response.data?.token;
         
        } else {
            console.log("data.t..",response.data)
          serverResponse.responseCode = response.data.status;
          serverResponse.responseDescription = response.data.error;
          
        }
    
  } catch (err) {
    serverResponse.responseDescription =
    "USER ACCESS PROCESSING ERROR -" + err;
  serverResponse.communicationStatus =
    "USER ACCESS PROCESSING FAILURE -" + err;
  serverResponse.responseCode = "402";

  if (!err.response) {
      console.log('No Server Response');
  } else if (err.response.status === 400) {
    //console.log('Missing Username or Password');
  } else if (err.response.status === 401) {
    // console.log('Unauthorized');
  } else {
    //console.log('Login Failed');
  }
  }

  }


  //products
  const fetchProducs = async () => {
    const serverResponse = {
      responseCode: "",
      responseDescription: "",
      responseDate: "",
      data: "",
    };
   
    await axios
      .get(base_localhost_view_product_test)
      .then((response) => {
        if (response.data.responseCode === "200") {
          serverResponse.responseCode = response.data.responseCode;
          serverResponse.responseDescription = response.data.codeDescription;
          serverResponse.data = response.data.data;
        } else {
         
          serverResponse.responseCode = response.data.responseCode;
  
        }
      })
      .catch((err) => {
        serverResponse.responseDescription =
          "AGENT TRANSACTION ACCESS PROCESSING ERROR -" + err;
        serverResponse.communicationStatus =
          "AGENT TRANSACTION ACCESS PROCESSING ERROR -" + err;
        serverResponse.responseCode = "601";
  
        if (!err.response) {
        } else if (err.response.status === 400) {
        } else if (err.response.status === 401) {
        } else {
        }
        //errRef.current.focus();
      });
  
    return serverResponse;
  };

export {
  loginUser,
  fetchProducs
};
  