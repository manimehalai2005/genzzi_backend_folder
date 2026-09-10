import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { ConfigModule } from '@nestjs/config'; 
import { CertificationProviderModule } from './master-service/model/certificate-provider/certificate-provider.module';

import { PrismaModule } from './prisma/prisma.module';
import { CountryController } from './master-service/model/country/country.controller';
import { CountryService } from './master-service/model/country/country.service';
import { CountryModule } from './master-service/model/country/country.module';
import { StateModule } from './master-service/model/state/state.module';
import { StateController } from './master-service/model/state/state.controller';
import { StateService } from './master-service/model/state/state.service';
import { CityModule } from './master-service/model/city/city.module';
import { CityController } from './master-service/model/city/city.controller';
import { CityService } from './master-service/model/city/city.service';
import { LanguageModule } from './master-service/model/language/language.module';
import { LanguageService } from './master-service/model/language/language.service';
import { LanguageController } from './master-service/model/language/language.controller';
import { CurrencyModule } from './master-service/model/currency/currency.module';
import { CurrencyService } from './master-service/model/currency/currency.service';
import { CurrencyController } from './master-service/model/currency/currency.controller';
import { TimezoneModule } from './master-service/model/timezone/timezone.module';

import { SkillController } from './master-service/model/skills/skills.controller';
import { SkillService } from './master-service/model/skills/skills.service';
import { SkillModule } from './master-service/model/skills/skills.module';
import { IndustryModule } from './master-service/model/industry/industry.module';
import { IndustryController } from './master-service/model/industry/industry.controller';
import { IndustryService } from './master-service/model/industry/industry.service';
import { DegreeModule } from './master-service/model/degree/degree.module';
import { DegreeService } from './master-service/model/degree/degree.service';
import { DegreeController } from './master-service/model/degree/degree.controller';
import { UniversityModule } from './master-service/model/university/university.module';
import { UniversityService } from './master-service/model/university/university.service';
import { UniversityController } from './master-service/model/university/university.controller';
import { FileTypeModule } from './master-service/model/filetype/filetype.module';
import { SocialPlatformModule } from './master-service/model/socialplatform/socialplatform.module';
import { CollegeModule } from './master-service/model/college/college.module';
import { DepartmentModule } from './master-service/model/department/department.module';
import { CollegeDepartmentModule } from './master-service/model/collegedepartment/collegedepartment.module';
import { FileTypeController } from './master-service/model/filetype/filetype.controller';
import { SocialPlatformController } from './master-service/model/socialplatform/socialplatform.controller';
import { CollegeController } from './master-service/model/college/college.controller';
import { DepartmentController } from './master-service/model/department/department.controller';
import { CollegeDepartmentController } from './master-service/model/collegedepartment/collegedepartment.controller';
import { FileTypeService } from './master-service/model/filetype/filetype.service';
import { SocialPlatformService } from './master-service/model/socialplatform/socialplatform.service';
import { CollegeDepartmentService } from './master-service/model/collegedepartment/collegedepartment.service';
import { CollegeService } from './master-service/model/college/college.service';
import { TimezoneController } from './master-service/model/timezone/timezone.controller';
import { TimezoneService } from './master-service/model/timezone/timezone.service';




@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    PrismaModule,
    CertificationProviderModule,
    CountryModule,
    StateModule,
    CityModule,
    LanguageModule,
    CurrencyModule,
    TimezoneModule,
    SkillModule,
    IndustryModule,
    DegreeModule,
    UniversityModule,
    FileTypeModule,
    SocialPlatformModule,
    CollegeModule,
    DepartmentModule,
    CollegeDepartmentModule
  
  ],
  controllers: [AppController, CountryController, StateController, CityController, LanguageController, CurrencyController, TimezoneController, SkillController, IndustryController, DegreeController, UniversityController, FileTypeController, SocialPlatformController, CollegeController, DepartmentController, CollegeDepartmentController],
  providers: [AppService, CountryService, StateService, CityService, LanguageService, CurrencyService, TimezoneService, SkillService, IndustryService, DegreeService, UniversityService, FileTypeService, SocialPlatformService, CollegeService, CollegeDepartmentService],
})
export class AppModule {}