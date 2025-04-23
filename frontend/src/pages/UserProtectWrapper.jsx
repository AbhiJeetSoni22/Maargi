
import { useEffect,useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { UserDataContext } from '../context/UserContext'
import axios from 'axios'
// eslint-disable-next-line react/prop-types
const UserProtectWrapper = ({children}) => {
// eslint-disable-next-line no-unused-vars
const { user, setUser} = useContext(UserDataContext)
const [isLoading,setIsLoading] = useState(true)
const navigate = useNavigate()
const token = localStorage.getItem('token')


useEffect(() => {
  
  
  const fetchUserProfile = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/users/profile`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.status === 200) {
        setUser(response.data);
        setIsLoading(false);
      }
    // eslint-disable-next-line no-unused-vars
    } catch (error) {
      navigate('/login');
      localStorage.removeItem('token');
    } 
  };
  if (!token) {
      navigate('/login')
  }
  else{
    fetchUserProfile();
  }
  
}, [navigate, token])
 
if(isLoading){
  return( <h1 className='text-center'>Loading...</h1>  )// Loading state while fetching data  // eslint-disable-next-line react/jsx-one-expression-per-line  // eslint-disable-next-line react/display-name
}

  return (
    <>
      
      {children}
    
    </>
  )
}

export default UserProtectWrapper
