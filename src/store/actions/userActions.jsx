import axios from '../../api/axiosConfig'
import {toast} from 'react-toastify'
import { loadUser, removeUser } from '../reducers/userSlice'


export const asyncLogoutUser = () => async(dispatch,getState)=>{
    try {

        localStorage.removeItem("user")
        dispatch(removeUser())
        // console.log("User Loggggged Out ")

    } catch (error) {
        console.log(error)

    }
}
 
export const asyncGetUser = () => async(dispatch,getState)=>{
    try {
        const user = JSON.parse(localStorage.getItem("user"))
        if(user){
            dispatch(loadUser(user))
            // console.log("Logged in",user)
            }
        else console.log("User Not Logged Inn")
    } 
    catch (error) {
        console.log(error)
    }
}



export const asyncLoginUser = (user) => async(dispatch,getState)=>{
    try {

        const {data} = await axios.get(`/users?email=${user.email}&password=${user.password}`)
        // console.log(data)
        const loggedUser = data[0]
        if (loggedUser) {
            localStorage.setItem("user",JSON.stringify(loggedUser))
            dispatch(loadUser(loggedUser))
        } else {
            toast.error("Invalid email or password")
        }

    } catch (error) {
        console.log(error)
        toast.error("Sorry, login failed")
    }
}




export const asyncRegisterUser = (user) => async(dispatch,getState) =>{
    try {
        const res = await axios.post('/users',user)
        // console.log(res)
    } catch (error) {
        console.log(error)
    }
}

export const asyncEditUser = (id,user) => async(dispatch,getState) =>{
    try {
        const {data} = await axios.patch(`/users/`+ id, user)
        localStorage.setItem("user",JSON.stringify(data))

        // console.log("Edit User",data)
        dispatch(asyncGetUser())


    } catch (error) {
        console.log(error)
    }
}