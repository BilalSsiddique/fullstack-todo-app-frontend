import React from 'react'
import { useDispatch } from 'react-redux'


const Search = ({search,searchHandler}) => {
  return (
    <div className="flex justify-center mb-20 mt-10">
      <input
      placeholder='Search for todos...'
        className="shadow-inner rounded-md outline-none border border-slate-500 p-1 px-4"
        type="search"
        value={search}
        onChange={searchHandler}
      />
    </div>
  );
}

export default Search