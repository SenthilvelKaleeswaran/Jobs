import React from 'react'
import { useTranslation } from 'react-i18next';

function Sort({results,sort,handleSortByChange}) {

  const { t } = useTranslation();

  return (
    <div className='flex flex-row w-full items-center justify-between pb-8' >
        <div>
            <p className='text-blue-200 text-md font-bold'>{t('sort.SEARCH_RESULTS')} /
              <span className='font-light'>{t('sort.JOBS',{count:results})}</span> 
            </p>
        </div>
        <div className='flex items-center w-36 justify-between'>

           <p className='text-blue-200 text-xs justify-between'>{t('sort.SORT_BY')}</p>
           <select value={sort} onChange={(event)=>handleSortByChange(event)} className='rounded-sm p-2 px-2 text-xs outline-none cursor-pointer'>
                <option value="Latest">{t('sort.LATEST')}</option>
                <option value="A-Z">{t('sort.A-Z')}</option>
                <option value="Z-A">{t('sort.Z-A')}</option>
                <option value="Oldest">{t('sort.OLDEST')}</option>
                {/* <option value="Applicants l-h">{t('sort.APPLICATNS_LH')}</option>
                <option value="Applicants h-l">{t('sort.APPLICATNS_HL')}</option>
                <option value="Salary l-h">{t('sort.SALARY_LH')}</option>
                <option value="Salary h-l">{t('sort.SALARY_HL')}</option> */}
            </select>


        </div>

    </div>
  )
}

export default Sort