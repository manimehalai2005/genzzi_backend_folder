import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config'; 
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { PrismaModule } from './prisma/prisma.module.js';
import { CountryModule } from './micro-services/country/country.module.js';
import { StateModule } from './micro-services/state/state.module.js';
import { CityModule } from './micro-services/city/city.module.js';
import { LanguageModule } from './micro-services/language/language.module.js';
import { CurrencyModule } from './micro-services/currency/currency.module.js';
import { SkillModule } from './micro-services/skills/skills.module.js';
import { TimezoneModule } from './micro-services/timezone/timezone.module.js';
import { IndustryModule } from './micro-services/industry/industry.module.js';
import { DegreeModule } from './micro-services/degree/degree.module.js';
import { UniversityModule } from './micro-services/university/university.module.js';
import { CertificationProviderModule } from './micro-services/certificate-provider/certificate-provider.module.js';
import { SocialPlatformModule } from './micro-services/socialplatform/socialplatform.module.js';
import { CollegeModule } from './micro-services/college/college.module.js';
import { DepartmentModule } from './micro-services/department/department.module.js';
import { CollegeDepartmentModule } from './micro-services/collegedepartment/collegedepartment.module.js';
import { FileTypeModule } from './micro-services/filetype/filetype.module.js';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    PrismaModule,
    CountryModule,
    StateModule,
    CityModule,
    LanguageModule,
    CurrencyModule,
    SkillModule,
    TimezoneModule,
    IndustryModule,
    DegreeModule,
    UniversityModule,
    CertificationProviderModule,
    SocialPlatformModule,
    CollegeModule,
    DepartmentModule,
    CollegeDepartmentModule,
    FileTypeModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}