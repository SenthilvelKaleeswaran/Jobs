import React from 'react'
import Jobscard from './Jobscard'

function Jobs({jobs,page,setPage,limit,setLimit,paginationData}) {

  let buttonArray = []
  for(let i=0;i<paginationData?.totalPages; i++)
    buttonArray.push(
      <button className={'p-4 w-10 mx-2  overflow-auto text-white border-2 border-gray-500 rounded-lg'} onClick={()=> setPage(i+1)}>{i+1}</button>
    )


  return (
    <div className='flex flex-col items-center h-full'>

        <div className='flex flex-col overflow-auto h-5/6  bg-[#1D2331] w-full rounded-md p-8 '>
            <div className='flex items-center bg-gradient-to-r from-gray-500  to-gray-800 rounded-l-full  mx-3 mb-3 p-0.5'> 
                <div className='  px-6 bg-[#1D2331] w-full rounded-l-full py-3 text-white items-center flex'>Jobs</div>
            </div>
              {
                jobs?.map((job)=>(
                    <Jobscard  job={job}/>
                ))
              }     
        </div>
        <div className='flex justify-center p-6 bottom-0 w-full'>
          <div className='flex w-4/5 align-center justify-center items-center overflow-auto'>
              {buttonArray.map((x, index) => (
                    x
              ))}
          </div>
          <div className=''>
            <input 
              type='text' 
              value={limit} 
              onChange={(event)=>setLimit(event.target.value)}
              className='w-16 p-4 bg-gray-900 text-white border-white border rounded-full text-center'
            />

          </div>
              
        </div>
    </div>
  )
}

export default Jobs