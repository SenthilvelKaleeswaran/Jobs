import { Job } from './schema/job.schema';
import * as mongoose from 'mongoose';
export declare class JobService {
    private jobModel;
    constructor(jobModel: mongoose.Model<Job>);
    getAllJobs(query: any): Promise<object>;
    searchJobs(query: any): Promise<object>;
    getSingleJob(id: string): Promise<Job | null>;
    sortJobs(sortData: object): Promise<Job[] | Job>;
    filterJobs(filterValues: object): Promise<Job[] | Job>;
    filter(): Promise<object | null>;
}
