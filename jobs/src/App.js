import './App.css';
import Navbar from './components/Navbar';
import Filter from './components/Filter';
import Sort from './components/Sort';
import Jobs from './components/Jobs';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { changeLanguage } from 'i18next';


function App() {

  const [jobs,setJobs] = useState()
  const [language,setLanguage] = useState('')
  const [sort,setSort] = useState('')
  const [tempFilterData,setTempFilterData] = useState({
    company: [],
    area: [],
    date: [],
    salary: [],
    skills: [],
    experience: [],
    education: []
  })
  const [filterData, setFilterData]  = useState('')
  const [page,setPage] = useState(1)
  const [limit, setLimit] = useState(3)
  const [paginationData,setPaginationData] = useState()
  const [globalSearch,setGlobalSearch] = useState('')
  // const userLocale =
  // navigator.languages && navigator.languages.length
  // ? navigator.languages[0]
  // : navigator.language;

  console.log(filterData.company)
  
  changeLanguage(language || 'en')

  useEffect(()=> {

    // let url = `/job?&page=${page}&limit=${limit}`

    // if(globalSearch)
    // {

    //     axios.get(`/job?search=${globalSearch}&page=${page}&limit=${limit}`)
    //     .then(response=>{
    //       setJobs(response.data.jobs)
    //       setPaginationData(response.data)
    //     })
    // }
    // else
    // {
        axios.get(`http://localhost:3004/job?page=${page}&limit=${limit}`)
      .then(response=>{
        setJobs(response.data.jobs)
        setPaginationData(response.data)
      })
      .catch((error) => console.log("eeeee",error));

    // }


    // console.log(url)


    axios.get(`https://job-jobs-api.vercel.app/job/filter`)
    .then(response=>{
      setFilterData(response.data)
    })
    .catch((error) => console.log("eeeee",error));
  },[page,limit,globalSearch])

   const filterItems = [
    {
        title : "company",
        options : filterData?.company
    },
    {
        title : "area",
        options : filterData?.area 
    },
    {
        title : "date",
        options : ["Last 24 hours", "Last 48 hours", "Last 7 days", "Last 14 days"]
    },
    {
        title : "salary",
        options : ["Below 3 lakh","3 lakh +", "6 lakh +", "9 lakh +", "15 lakh +", "25 lakh +"]
    },
    {
        title : "skills",
        options : filterData?.skills
    },
    {
        title:"education",
        options : ["Bachelor", "Masters", "Phd", "Diploma"]
    }
  ]

  // ["Mumbai", "Chandigarh", "Chennai", "Bangalore"] 

  const handleLanguageChange = (event) => {
    setLanguage(event.target.value)
  }

  const handleSortByChange = (event)=> {
    setSort(event.target.value)
    console.log(">>>>>>>",sort)

    if(event.target.value){
      axios.post(`/job/sort?page=${page}&limit=${limit}`,{jobs,"sortBy":event.target.value})
      .then(response=>{
        console.log("sorted ------>",response.data)
        setJobs(response.data)
      })
      .catch(error=>console.log(error))
    }
  }

  const handleApplyFilter = (filterdValues) => {
    axios.post('/job/filter',filterdValues)
    .then(response=>{
      setJobs(response.data)
    })
    .catch((error) => console.log("eeeee",error));
  }

  return (
    <div className="flex flex-col h-screen">

      

      <Navbar 
        globalSearch={globalSearch}
        setGlobalSearch={setGlobalSearch}
        handleLanguageChange ={handleLanguageChange} 
      />
      <div className='flex bg-[#171C28] h-full p-8'>


          <Filter 
            filterItems={filterItems} 
            tempFilterData={tempFilterData} 
            setTempFilterData={setTempFilterData} 
            handleApplyFilter={handleApplyFilter} 
          />

        <div className='flex flex-col w-full pt-0 p-8'>
          <Sort 
            results={jobs?.length}
            sort={sort}
            handleSortByChange={handleSortByChange}

          />
           <Jobs 
            jobs={jobs}
            page={page}
            setPage={setPage}
            limit={limit}
            setLimit={setLimit}
            paginationData={paginationData}
           />
         
        </div>
      </div>
      
    </div>
  );
}

export default App;
