import React from 'react'
import Logo from '../assets/CompanyLogo.png'
import Save from '../assets/Save.png'
import { useTranslation } from 'react-i18next';

function Jobscard({job}) {

  const { t } = useTranslation();

  const daysLeft =  Math.ceil((new Date() - new Date(job.date)) / (1000 * 60 * 60 * 24));

  const userSkills = ["AI","Machine Language", "Javascript"]
  const requiredSkills = job.skills

  const matchingSkilss = userSkills.filter(x=>requiredSkills.includes(x))

  const skillMatchPercentage = Math.ceil(( matchingSkilss.length / requiredSkills.length )*100)

 
  const circleStyle = {
    background: `conic-gradient(rgba(92, 164, 169, 1) ${skillMatchPercentage}%, rgba(232, 51, 99, 1) 0)`,
  }

  return (
    <div>

        <div className='flex flex-col p-3 h-full'>
            <div className='flex justify-between items-center bg-[#323C52] p-8 rounded-t-lg'>
                <div className='flex  justify-between'>
                    <div className='bg-white rounded-lg items-center p-4 w-16 h-16' >
                        <img src={Logo} alt='logo'/>
                    </div>
                    <div className='ml-8'>
                        <p className='text-blue-100 font-bold'>{job.role}</p>
                        <p className='text-blue-100 text-xs py-1'>{job.company}</p>
                        <p className='text-blue-100 text-xs'>{job.area},{job.state},{job.country}</p>
                    </div>
                </div>

                <div className='flex items-center w-1/4 justify-between'>
                    <p className='text-blue-100 font-sm font-bold'>{t('jobs.SKILLS_MATCH')}</p>
                    <div className="flex items-center justify-center w-20 h-20 rounded-full ">
                        <div className="flex items-center justify-center w-full h-full rounded-full z-0" style={circleStyle}>
                            <div className='flex items-center justify-center w-full h-full z-1'>
                                 <p className='text-white font-bold w-11/12 h-11/12 rounded-full bg-gray-700 p-6'>{skillMatchPercentage}<span className='font-normal'>%</span></p>

                            </div>
                         </div> 
                    </div>
                </div>

            </div>
            <div className='flex  items-center justify-between w-full p-4 bg-[#525D79] rounded-b-lg'>
                <div className='flex items-center justify-between px-4'>
                    <p className='text-blue-100 text-xs mr-2'>{t("jobs.POSTED")} {t('jobs.DAYS', {count: daysLeft})} </p>
                    <span className='bg-white w-1 rounded-full h-1 mr-2'></span>
                    <p className='text-blue-100 text-xs'>{t('jobs.APPLICANTS', {count: job.noOfApplicants})}</p>

                </div>
                <div className='flex justify-around  items-center w-1/4 '>
                    <button 
                        className='text-white text-xs bg-[#5CA4A9] rounded-full py-2 w-32 cursor-pointer '
                    >
                            {t("jobs.APPLY_NOW")}
                    </button>
                    <img  className='h-7 cursor-pointer' src={Save} alt='save' />
                </div>

            </div>
        </div>
    </div>
  )
}

export default Jobscard