import { Injectable, NotFoundException, Query } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Job } from './schema/job.schema';
import * as mongoose from 'mongoose';
import { Request } from 'express';

@Injectable()
export class JobService {

    constructor(
        @InjectModel(Job.name) private jobModel: mongoose.Model<Job>
    ) {}

    async getAllJobs(query: any): Promise<object> {
        const { page, limit, search } = query;
        let globalSearchFilter = {};

        if (search) {
            globalSearchFilter = { $text: { $search: search } };
        }

        console.log()

        const skip = (page - 1) * limit;
        const count = await this.jobModel.countDocuments(globalSearchFilter);
        const jobs = await this.jobModel
            .find(globalSearchFilter)
            .sort({ date: -1 })
            .skip(skip)
            .limit(limit);
        const totalPages = Math.ceil(count / limit);

        const result = {
            jobs,
            page,
            count,
            totalPages,
        };

        console.log("oooo-------->",  page, limit, search, jobs,"search");
        return result;
    }

    async searchJobs(query: any): Promise<object> {
        const { page, limit, search } = query;
        let globalSearchFilter = { $text: { $search: search } }
        
        const skip = (page - 1) * limit;
        const count = await this.jobModel.countDocuments({ $text: { $search: search } });
        const jobs = await this.jobModel
            .find(globalSearchFilter)
        // .sort({ date: -1 })
        // .skip(skip)
        // .limit(limit);
        const totalPages = Math.ceil(count / limit);

        const result = {
            jobs,
            page,
            count,
            totalPages,
        };

        console.log("oooo-------->", globalSearchFilter, page, limit, search, jobs, "search");
        return result;
    }


    async getSingleJob(id: string): Promise<Job | null> {
        const job = await this.jobModel.findById(id);

        if (!job) 
            throw new NotFoundException('Job not found');

        return job;
    }

    async sortJobs(sortData : object): Promise<Job[] | Job> {
       
        const job = sortData['jobs']
        const sortBy = sortData['sortBy']

        console.log('job000000',job)

        const sortConfigure = {
            "Latest": { "field": "date", "order": -1 },
            "A-Z": { "field": "role", "order": 1 },
            "Z-A": { "field": "role", "order": -1 },
            "Oldest": { "field": "date", "order": 1 },
            "Salary l-h": { "field": "salary", "order": 1 },
            "Salary h-l": { "field": "salary", "order": -1 },
            "Applicants l-h": { "field": "noOfApplicants", "order": 1 },
            "Applicants h-l": { "field": "noOfApplicants", "order": -1 },  
        }

        const sortField = sortConfigure[sortBy].field;
        const sortOrder = sortConfigure[sortBy].order;

        const jobs = await this.jobModel.find({ _id: { $in: job } }).sort({ [sortField]: sortOrder });

        console.log("1111", jobs)
        return jobs;
    }

    async filterJobs(filterValues: object): Promise<Job[] | Job> {

        let query = {}

        Object.keys(filterValues).forEach((key: string) => {

            if(filterValues[key].length)
            {

                if (key === 'experience') {
                    let carryQuery = [];
    
                    const configureExperience = () => {
                        filterValues['experience'].forEach((exp) => {
                            let subQuery = {};
                            if (exp === '0-2 years') {
                                subQuery['experienceFrom'] = { $gte: 0 };
                                subQuery['experienceTo'] = { $lte: 2 };
                            } else if (exp === '3-5 years') {
                                subQuery['experienceFrom'] = { $gte: 3 };
                                subQuery['experienceTo'] = { $lte: 5 };
                            } else if (exp === '6-8 years') {
                                subQuery['experienceFrom'] = { $gte: 6 };
                                subQuery['experienceTo'] = { $lte: 8 };
                            } else if (exp === 'Above 8') {
                                subQuery['experienceFrom'] = { $gte: 8 };
                                subQuery['experienceTo'] = { $lte: 30 };
                            }
                            carryQuery.push(subQuery);
                        });
                    };
    
                    configureExperience();
    
                    if (carryQuery.length > 0) {
                        query['$and'] = carryQuery;
                    }
    
                    console.log(carryQuery);
                }
    
                else if(key === 'salary')
                {
                    let min = 0, max = 0
    
                    const salary = filterValues['salary']
    
                    if (salary.includes('Below 3 lakh'))
                        min = 300000;
                    if (salary.includes('25 lakh +'))
                        max = 2500000;
                    else if (salary.includes('15 lakh +'))
                        max = 1500000;
                    else if (salary.includes('9 lakh +'))
                        max = 900000;
                    else if (salary.includes('6 lakh +'))
                        max = 600000;
                    else if (salary.includes('3 lakh +'))
                        max = 300000;
    
                  
                    console.log("--->>>", min, max)
    
                    query[key] = { ...(min && { $lt: min }), ...(max && { $gte: max }) };
                }
    
    
                else if (key === 'date') {
    
                    const today = new Date()
                    let checkFrom = new Date()
    
    
                    const date = filterValues['date']
    
                    if (date.includes('Last 14 days'))
                        checkFrom.setDate(today.getDate() - 14);
                    else if (date.includes('Last 7 days'))
                        checkFrom.setDate(today.getDate() - 7);    
                    else if (date.includes('Last 48 hours'))
                        checkFrom.setDate(today.getDate() - 2);
                    else if (date.includes('Last 24 hours'))
                        checkFrom.setDate(today.getDate() - 1);
    
                    query[key] =  { $gte: checkFrom.toISOString() , $lte: today.toISOString() }
                }

                else { 
                    query[key] = {$in : filterValues[key] } 
                }
            }

        })

        console.log("0000",query)

        const jobs = await this.jobModel.find(query);
        console.log("1111",jobs)
        return jobs;
    }

    async filter(): Promise<object | null> {


        const jobs = await this.jobModel.find({},{ area: 1, skills: 1, company: 1 })

        const res = {
            area : [],
            skills : [],
            company : []
        }
        console.log("<_____>", jobs)

        jobs.map((job)=>{

            if(!res['area'].includes(job.area))
                res['area'].push(job.area)
            res['skills'].push(job.skills)
            res['company'].push(job.company)

        })

        res['skills'] = res['skills'].flat()
        res['company'] = res['company'].flat()

        const uniqueSkills = new Set(res['skills']);
        res['skills'] = [...uniqueSkills]

        const uniqueCompany = new Set(res['company']);
        res['company'] = [...uniqueCompany]

        console.log("0000000000000",res)


        return res
    }
}
