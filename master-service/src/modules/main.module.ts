import { CountryModule } from './country/country.module';
import { StateModule } from './state/state.module';
import { CityModule } from './city/city.module';
import { LanguageModule } from './language/language.module';
import { CurrencyModule } from './currency/currency.module';
import { SkillModule } from './skills/skills.module';
import { TimezoneModule } from './timezone/timezone.module';
import { IndustryModule } from './industry/industry.module';
import { DegreeModule } from './degree/degree.module';
import { UniversityModule } from './university/university.module';
import { CertificationProviderModule } from './certificate-provider/certificate-provider.module';
import { SocialPlatformModule } from './socialplatform/socialplatform.module';
import { CollegeModule } from './college/college.module';
import { DepartmentModule } from './department/department.module';
import { CollegeDepartmentModule } from './collegedepartment/collegedepartment.module';
import { FileTypeModule } from './filetype/filetype.module';
import { Module } from '@nestjs/common';

@Module({
   imports: [
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
   ]

})
export class MainModule {}

