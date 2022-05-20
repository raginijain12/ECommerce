 import React,{useContext, useState,useEffect,createContext} from "react";
import {auth} from '../firebase';
const AuthContext=createContext();

 export function useAuth(){
     return useContext(AuthContext);
}

export function AuthProvider({children}){
     const [currentUser,setCurrentUser]=useState();

     function signup(email,password){
        return auth.createUserWithEmailAndPassword(email,password);
     }

     useEffect(()=>{
         const unsubscribe=auth.onAuthStateChanged((user)=>{
            setCurrentUser(user);
         });
         return unsubscribe;
     })

     function login(email,password)
     {
         return auth.signInWithEmailAndPassword(email,password);
     }

     function logout()
     {
         return auth.signOut();
     }
     function updateEmail(email)
     {
         return currentUser.updateEmail(email);
     }
     function updatePassword(password)
     {
         return currentUser.updatePassword(password);
     }
     function resetPassword(email)
     {
         return auth.sendPasswordResetEmail(email);
     }

        const value={
             currentUser,
             signup,
             login,
             logout,
             updateEmail,
             updatePassword,
             resetPassword,
    };
 return(
     <AuthContext.Provider value={value}>
         {children}
    </AuthContext.Provider>
    )
}