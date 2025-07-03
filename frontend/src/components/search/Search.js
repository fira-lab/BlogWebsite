import React from 'react'
import { BiSearchAlt } from "react-icons/bi";
const Search = ({value, onChange}) => {
    
  return (
    <div>
        <div className="search">
            <BiSearchAlt size={18} className='icon'/>
            <input 
            type='text'
            placeholder='Search users'
            value={value} onChange={onChange}/>


            
        </div>
      
    </div>
  )
}

export default Search
