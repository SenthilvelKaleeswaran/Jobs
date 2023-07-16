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
exports.JobController = void 0;
const common_1 = require("@nestjs/common");
const job_service_1 = require("./job.service");
const common_2 = require("@nestjs/common");
const sentry_interceptor_1 = require("../sentry.interceptor");
let JobController = exports.JobController = class JobController {
    constructor(jobService) {
        this.jobService = jobService;
    }
    getAllJobs(query) {
        return this.jobService.getAllJobs(query);
    }
    searchJobs(query) {
        return this.jobService.getAllJobs(query);
    }
    filterJobs(filterValues) {
        return this.jobService.filterJobs(filterValues);
    }
    async filter() {
        return this.jobService.filter();
    }
    async sortJobs(sortData, query) {
        console.log("-------", sortData);
        return this.jobService.sortJobs(sortData);
    }
};
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], JobController.prototype, "getAllJobs", null);
__decorate([
    (0, common_1.Get)('/search'),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], JobController.prototype, "searchJobs", null);
__decorate([
    (0, common_1.Post)('/filter'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], JobController.prototype, "filterJobs", null);
__decorate([
    (0, common_1.Get)('/filter'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], JobController.prototype, "filter", null);
__decorate([
    (0, common_1.Post)('/sort'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], JobController.prototype, "sortJobs", null);
exports.JobController = JobController = __decorate([
    (0, common_2.UseInterceptors)(sentry_interceptor_1.SentryInterceptor),
    (0, common_1.Controller)('job'),
    __metadata("design:paramtypes", [job_service_1.JobService])
], JobController);
//# sourceMappingURL=job.controller.js.map