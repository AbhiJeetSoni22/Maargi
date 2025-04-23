import { createContext , useState} from "react"
const UserDataContext = createContext();


// eslint-disable-next-line react/prop-types
const UserContext = ({children}) => {
    const [user, setUser] = useState({
        fullName:{
            firstName:'',
            lastName:''
        },
        email:''
    });

  return (
    <div>
        <UserDataContext.Provider value={{user,setUser}}>
          {children}
        </UserDataContext.Provider>
    </div>
  )
}

export default UserContext
export {UserDataContext}