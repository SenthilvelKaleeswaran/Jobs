"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const job_controller_1 = require("./job/job.controller");
const job_service_1 = require("./job/job.service");
const job_module_1 = require("./job/job.module");
const mongoose_1 = require("@nestjs/mongoose");
const config_1 = require("@nestjs/config");
const job_schema_1 = require("./job/schema/job.schema");
const path = require("path");
const nestjs_i18n_1 = require("nestjs-i18n");
let AppModule = exports.AppModule = class AppModule {
};
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                envFilePath: '.env',
                isGlobal: true,
            }),
            mongoose_1.MongooseModule.forRoot('mongodb+srv://senthilvel_svk:Qwerty654321%40@cluster0.6eqp768.mongodb.net/JOBS'),
            mongoose_1.MongooseModule.forFeature([{ name: 'Job', schema: job_schema_1.JobSchema }]),
            nestjs_i18n_1.I18nModule.forRoot({
                fallbackLanguage: 'en',
                fallbacks: {
                    en: 'en',
                    es: 'es',
                },
                loaderOptions: {
                    path: path.join(__dirname, '/i18n/'),
                    watch: true,
                },
                resolvers: [
                    { use: nestjs_i18n_1.QueryResolver, options: ['lang'] },
                    nestjs_i18n_1.AcceptLanguageResolver,
                ],
            }),
            job_module_1.JobModule,
        ],
        controllers: [app_controller_1.AppController, job_controller_1.JobController],
        providers: [app_service_1.AppService, job_service_1.JobService],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map