import React from 'react'
import { FaSearch } from "react-icons/fa";

const SearchInput = () => {
  return (
    <>
    <form className='flex items-center gap-2'>
        <input type='text' className='input input-bordered rounded-full' placeholder='Search' />
        <button className='btn btn-circle bg-blue-500'><FaSearch className='h-6 w-6'/></button>

        {/* Add a dropdown menu for filter options */}

    </form>
    </>
  
  )
}

export default SearchInput
