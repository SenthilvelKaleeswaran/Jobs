import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next';

function Filter({filterItems,tempFilterData,setTempFilterData,handleApplyFilter}) {

    const { t } = useTranslation();
    const [check,setCheck] = useState(tempFilterData)
 
    const [filtersApplied, setFiltersApplied] = useState(0)

    useEffect(()=>{
        let count = 0
         Object.keys(check).forEach((key)=>{
            if(check[key].length)
            count = count+ 1 
        })
        setFiltersApplied(count)
    },[check])

    const handleClearAll =() => {
        setCheck({
            company: [],
            area: [],
            date: [],
            salary: [],
            skills: [],
            experience: [],
            education: []
        })
        handleApplyFilter({})
    }


    const applyFilter = async()=>{

        await setTempFilterData(check)

        // Object.keys(check).forEach((key) => {
        //     if(!check[key].length)
        //         delete check[key]   
        // })

        handleApplyFilter(check)
    }

    const handleCheckBoxChange= (event,category,option) => {

        let previous = check?.[category]?.includes(option)
        const obj = check?.[category]
        previous = !previous
            
        if(previous)
        {
            setCheck({
                ...check,
                [category]: [...obj,option]
            })
        }
        else if(!previous && obj?.includes(option))
        {
            setCheck({
                ...check,
                [category]: obj?.filter(item => item!== option)
            })            
        }

    }

  const filterSpace = filterItems?.map((items,index)=>(
    <div key={index} className=''>

         <div className='pt-3'>
            <div className='h-px '>
            </div>
        </div>

        <p className='text-blue-100 text-sm p-3'>{items.title}</p>
        {
            items?.options?.map((option,subindex)=>(

                <div key={subindex} className='p-1 px-4'>
                    <input 
                        key={index}
                        className='text-blue-100 text-sm accent-gray-900'
                        type='checkbox'
                        name={option}
                        onChange={(event)=>handleCheckBoxChange(event,items.title,option)}
                        checked={check?.[items.title]?.includes(option)}
                    />
                    <label htmlFor={option} className="ml-4 text-xs text-blue-200">
                        {option}
                    </label>
                </div>            
            ))
        }
    </div>

  ))



  return (
    <div className='rounded-lg w-1/4'>

        <div className=' flex flex-col border-2 border-gray-950 bg-[#171C28] rounded-lg w-full h-full'>

            <div className='flex items-center justify-around p-4'>
                <p className=' text-sm text-white'>{t('filter.FILTER_BY')}</p>

                <div className='flex'>
                <p className='text-white text-xs'>{t('filter.FILTERS_APPLIED', {count : filtersApplied})}</p>
                <p  onClick={handleClearAll} className='text-white text-xs hover:cursor-pointer ml-2'>{t('filter.CLEAR_ALL')}</p>
                </div>
            </div>
            <div className='w-full overflow-scroll'>
                {filterSpace}
            </div>
            <div className='p-3 w-full'>
                <button onClick={applyFilter} className='border p-2 text-white w-full rounded-full'>{t('filter.APPLY_FILTERS')}</button>
            </div>

        </div>


    </div>
  )
}

export default Filter