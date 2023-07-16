"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.JobService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const job_schema_1 = require("./schema/job.schema");
const mongoose = require("mongoose");
let JobService = exports.JobService = class JobService {
    constructor(jobModel) {
        this.jobModel = jobModel;
    }
    async getAllJobs(query) {
        const { page, limit, search } = query;
        let globalSearchFilter = {};
        if (search) {
            globalSearchFilter = { $text: { $search: search } };
        }
        console.log();
        const skip = (page - 1) * limit;
        const count = await this.jobModel.countDocuments(globalSearchFilter);
        const jobs = await this.jobModel
            .find(globalSearchFilter);
        const totalPages = Math.ceil(count / limit);
        const result = {
            jobs,
            page,
            count,
            totalPages,
        };
        console.log("oooo-------->", page, limit, search, jobs, "search");
        return result;
    }
    async searchJobs(query) {
        const { page, limit, search } = query;
        let globalSearchFilter = { $text: { $search: search } };
        const skip = (page - 1) * limit;
        const count = await this.jobModel.countDocuments({ $text: { $search: search } });
        const jobs = await this.jobModel
            .find(globalSearchFilter);
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
    async getSingleJob(id) {
        const job = await this.jobModel.findById(id);
        if (!job)
            throw new common_1.NotFoundException('Job not found');
        return job;
    }
    async sortJobs(sortData) {
        const job = sortData['jobs'];
        const sortBy = sortData['sortBy'];
        console.log('job000000', job);
        const sortConfigure = {
            "Latest": { "field": "date", "order": -1 },
            "A-Z": { "field": "role", "order": 1 },
            "Z-A": { "field": "role", "order": -1 },
            "Oldest": { "field": "date", "order": 1 },
            "Salary l-h": { "field": "salary", "order": 1 },
            "Salary h-l": { "field": "salary", "order": -1 },
            "Applicants l-h": { "field": "noOfApplicants", "order": 1 },
            "Applicants h-l": { "field": "noOfApplicants", "order": -1 },
        };
        const sortField = sortConfigure[sortBy].field;
        const sortOrder = sortConfigure[sortBy].order;
        const jobs = await this.jobModel.find({ _id: { $in: job } }).sort({ [sortField]: sortOrder });
        console.log("1111", jobs);
        return jobs;
    }
    async filterJobs(filterValues) {
        let query = {};
        Object.keys(filterValues).forEach((key) => {
            if (filterValues[key].length) {
                if (key === 'experience') {
                    let carryQuery = [];
                    const configureExperience = () => {
                        filterValues['experience'].forEach((exp) => {
                            let subQuery = {};
                            if (exp === '0-2 years') {
                                subQuery['experienceFrom'] = { $gte: 0 };
                                subQuery['experienceTo'] = { $lte: 2 };
                            }
                            else if (exp === '3-5 years') {
                                subQuery['experienceFrom'] = { $gte: 3 };
                                subQuery['experienceTo'] = { $lte: 5 };
                            }
                            else if (exp === '6-8 years') {
                                subQuery['experienceFrom'] = { $gte: 6 };
                                subQuery['experienceTo'] = { $lte: 8 };
                            }
                            else if (exp === 'Above 8') {
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
                else if (key === 'salary') {
                    let min = 0, max = 0;
                    const salary = filterValues['salary'];
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
                    console.log("--->>>", min, max);
                    query[key] = { ...(min && { $lt: min }), ...(max && { $gte: max }) };
                }
                else if (key === 'date') {
                    const today = new Date();
                    let checkFrom = new Date();
                    const date = filterValues['date'];
                    if (date.includes('Last 14 days'))
                        checkFrom.setDate(today.getDate() - 14);
                    else if (date.includes('Last 7 days'))
                        checkFrom.setDate(today.getDate() - 7);
                    else if (date.includes('Last 48 hours'))
                        checkFrom.setDate(today.getDate() - 2);
                    else if (date.includes('Last 24 hours'))
                        checkFrom.setDate(today.getDate() - 1);
                    query[key] = { $gte: checkFrom.toISOString(), $lte: today.toISOString() };
                }
                else {
                    query[key] = { $in: filterValues[key] };
                }
            }
        });
        console.log("0000", query);
        const jobs = await this.jobModel.find(query);
        console.log("1111", jobs);
        return jobs;
    }
    async filter() {
        const jobs = await this.jobModel.find({}, { area: 1, skills: 1, company: 1 });
        const res = {
            area: [],
            skills: [],
            company: []
        };
        console.log("<_____>", jobs);
        jobs.map((job) => {
            if (!res['area'].includes(job.area))
                res['area'].push(job.area);
            res['skills'].push(job.skills);
            res['company'].push(job.company);
        });
        res['skills'] = res['skills'].flat();
        res['company'] = res['company'].flat();
        const uniqueSkills = new Set(res['skills']);
        res['skills'] = [...uniqueSkills];
        const uniqueCompany = new Set(res['company']);
        res['company'] = [...uniqueCompany];
        console.log("0000000000000", res);
        return res;
    }
};
exports.JobService = JobService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(job_schema_1.Job.name)),
    __metadata("design:paramtypes", [mongoose.Model])
], JobService);
//# sourceMappingURL=job.service.js.map