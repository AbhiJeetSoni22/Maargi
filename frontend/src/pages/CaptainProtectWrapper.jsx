
import { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { CaptainDataContext } from '../context/CaptainContext'
import axios from 'axios'
// eslint-disable-next-line react/prop-types
const CaptainProtectWrapper = ({children}) => {
// eslint-disable-next-line no-unused-vars
const {captain,setCaptain}= useContext(CaptainDataContext)
const [isLoading,setIsLoading] = useState(true)
const navigate = useNavigate()
const token = localStorage.getItem('token')
useEffect(() => {
    if (!token) {
        navigate('/captain-login')
      }
    
      const fetchCaptainProfile = async () => {
        try {
          const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/captains/profile`, {
            headers: { Authorization: `Bearer ${token}` },
          });
      
          if (response.status === 200) {
            setCaptain(response.data); // Make sure response.data contains the captain object
            setIsLoading(false);
          }
        // eslint-disable-next-line no-unused-vars
        } catch (error) {
          navigate('/captain-login');
          localStorage.removeItem('token');
        }
      };
    fetchCaptainProfile();
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

export default CaptainProtectWrapper
