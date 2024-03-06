import React, {useState} from 'react';
export const Context = React.createContext();




const Wrapper = (props) => {

    const [userData, setUserData] = useState(null);
    const [loggedInStatus, setLoggedInStatus] = useState(false);
    const [userId, setUserId] = useState();
    const [username, setUsername] = useState();
    const [email, setEmail] = useState();





    return (
        <Context.Provider value = {{
            loggedInStatus:loggedInStatus,
            userId:userId,
           username:username,
           email:email,
         
            updateUserId:(userIdData)=>{
                setUserId(userIdData);
            },
            updateUsername:(username)=>{
                setUsername(username);
            },
            updateLoginStatus:(data)=>{
                setLoggedInStatus(data);
            },
            updateEmail:(email)=>{
                setUsername(email);
            },
            
        }}>
            {
                
                /*<IntlProvider messages={messages} locale={locale}>*/}
                {props.children}
            {/*</IntlProvider>*/}
        </Context.Provider>

    );
}


export default Wrapper;