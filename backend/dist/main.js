"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const Sentry = require("@sentry/node");
const swagger_1 = require("@nestjs/swagger");
require('dotenv').config();
async function bootstrap() {
    Sentry.init({
        dsn: 'https://835bf7291bfd40a4a000013b6fa27ee0@o4505504810139648.ingest.sentry.io/4505504865714176'
    });
    try {
        const app = await core_1.NestFactory.create(app_module_1.AppModule);
        const port = 3004;
        const corsOptions = {
            origin: ['https://jobs-jobs.vercel.app/', '*'],
            methods: ['GET', 'POST', 'PUT', 'DELETE'],
            credentials: true,
            optionsSuccessStatus: 200,
            allowedHeaders: ['Content-Type', 'Authorization', 'baggage', 'sentry-trace', 'Origin', 'Accept'],
        };
        app.enableCors(corsOptions);
        const config = new swagger_1.DocumentBuilder()
            .setTitle('Jobs')
            .setDescription('Jobs search')
            .setVersion('1.0')
            .addTag('')
            .build();
        const document = swagger_1.SwaggerModule.createDocument(app, config);
        swagger_1.SwaggerModule.setup('api', app, document);
        await app.listen(port);
        console.log("---->>-->>", port);
    }
    catch (error) {
        Sentry.captureException(error);
    }
}
bootstrap();
//# sourceMappingURL=main.js.map