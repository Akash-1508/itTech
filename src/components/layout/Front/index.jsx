import React from 'react'
import FrontHeader from '../Front/FrontHeader/FrontHeader'
import FrontFooter from "../Front/FrontFooter/Footer"
import CustomCursor from '../../common/CustomCursor'
import { useLocation } from 'react-router-dom';


const FrontLayout = ({children}) => {
  const location = useLocation();
  return (
    <div className="overflow-x-hidden">
      <CustomCursor />
      <FrontHeader/>

      <main className="">
        {children}
      </main>
      <FrontFooter/>
      
    </div>
  )
}

export default FrontLayout
