import { Body, Controller, Get, InternalServerErrorException, Param, Post, Query } from '@nestjs/common';
import { JobService } from './job.service';
import { UseInterceptors } from '@nestjs/common';
import { SentryInterceptor } from '../sentry.interceptor';
import { Job } from './schema/job.schema';

@UseInterceptors(SentryInterceptor)
@Controller('job')
export class JobController {

    constructor(private jobService: JobService) { }

    @Get()
    getAllJobs(@Query() query: any): Promise<object> {
        return this.jobService.getAllJobs(query);
    }

    @Get('/search')
    searchJobs(@Query() query: any): Promise<object> {
        return this.jobService.getAllJobs(query);
    }

    @Post('/filter')
    filterJobs(@Body() filterValues: object): Promise<Job[] | Job> {
        return this.jobService.filterJobs(filterValues)
    }
    
    @Get('/filter')
    async filter(): Promise<object | null>{
        return this.jobService.filter();
    }

    @Post('/sort')
    async sortJobs(@Body() sortData: object, @Query() query: any): Promise<Job[] | Job> {
        console.log("-------",sortData)
        return this.jobService.sortJobs(sortData);
    }

    // @Get(':id')
    // getSingleJob(@Param('id') id: string): Promise<Job> {
    //     console.log("-----> id", id)
    //     return this.jobService.getSingleJob(id);
    // }
}
