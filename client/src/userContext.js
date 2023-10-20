import React,{createContext, useState} from 'react';

export const userContext = createContext();
const initialState = {
    userState:false,
    user:''
}

const UserProvider = ({children})=>{
    const [state,setState] = useState(initialState);
    return (
    <userContext.Provider value={{state,setState}}>
        {children}
    </userContext.Provider>
    );
}

export default UserProvider;
