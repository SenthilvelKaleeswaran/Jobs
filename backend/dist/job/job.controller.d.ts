import { JobService } from './job.service';
import { Job } from './schema/job.schema';
export declare class JobController {
    private jobService;
    constructor(jobService: JobService);
    getAllJobs(query: any): Promise<object>;
    searchJobs(query: any): Promise<object>;
    filterJobs(filterValues: object): Promise<Job[] | Job>;
    filter(): Promise<object | null>;
    sortJobs(sortData: object, query: any): Promise<Job[] | Job>;
}
