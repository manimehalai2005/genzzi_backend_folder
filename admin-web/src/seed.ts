import 'dotenv/config';

import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '../src/generated/prisma/client';

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL!,
});

const prisma = new PrismaClient({
  adapter,
});

async function main() {
  console.log('🌱 Seeding master data...');

  // ─── Currencies ───
  const currencies = [
    { code: 'USD', name: 'US Dollar', symbol: '$' },
    { code: 'EUR', name: 'Euro', symbol: '€' },
    { code: 'GBP', name: 'British Pound', symbol: '£' },
    { code: 'INR', name: 'Indian Rupee', symbol: '₹' },
    { code: 'JPY', name: 'Japanese Yen', symbol: '¥' },
    { code: 'CNY', name: 'Chinese Yuan', symbol: '¥' },
    { code: 'AUD', name: 'Australian Dollar', symbol: 'A$' },
    { code: 'CAD', name: 'Canadian Dollar', symbol: 'C$' },
    { code: 'CHF', name: 'Swiss Franc', symbol: 'Fr' },
    { code: 'SGD', name: 'Singapore Dollar', symbol: 'S$' },
  ];

  for (const c of currencies) {
    await prisma.currency.upsert({
      where: { code: c.code },
      update: {},
      create: c,
    });
  }
  console.log('✅ Currencies seeded');

  // ─── Languages ───
  const languages = [
    { code: 'en', name: 'English', nativeName: 'English' },
    { code: 'es', name: 'Spanish', nativeName: 'Español' },
    { code: 'fr', name: 'French', nativeName: 'Français' },
    { code: 'de', name: 'German', nativeName: 'Deutsch' },
    { code: 'zh', name: 'Chinese', nativeName: '中文' },
    { code: 'ja', name: 'Japanese', nativeName: '日本語' },
    { code: 'hi', name: 'Hindi', nativeName: 'हिन्दी' },
    { code: 'ar', name: 'Arabic', nativeName: 'العربية' },
    { code: 'pt', name: 'Portuguese', nativeName: 'Português' },
    { code: 'ru', name: 'Russian', nativeName: 'Русский' },
  ];

  for (const l of languages) {
    await prisma.language.upsert({
      where: { code: l.code },
      update: {},
      create: l,
    });
  }
  console.log('✅ Languages seeded');

  // ─── Timezones ───
  const timezones = [
    { name: 'UTC', utcOffset: '+00:00' },
    { name: 'America/New_York', utcOffset: '-05:00' },
    { name: 'America/Los_Angeles', utcOffset: '-08:00' },
    { name: 'Europe/London', utcOffset: '+00:00' },
    { name: 'Europe/Paris', utcOffset: '+01:00' },
    { name: 'Asia/Tokyo', utcOffset: '+09:00' },
    { name: 'Asia/Shanghai', utcOffset: '+08:00' },
    { name: 'Asia/Dubai', utcOffset: '+04:00' },
    { name: 'Asia/Kolkata', utcOffset: '+05:30' },
    { name: 'Australia/Sydney', utcOffset: '+11:00' },
  ];

  for (const t of timezones) {
    await prisma.timezone.upsert({
      where: { name: t.name },
      update: {},
      create: t,
    });
  }
  console.log('✅ Timezones seeded');

  // ─── Skills ───
  const skills = [
    { name: 'JavaScript', category: 'Programming' },
    { name: 'Python', category: 'Programming' },
    { name: 'Java', category: 'Programming' },
    { name: 'Go', category: 'Programming' },
    { name: 'Rust', category: 'Programming' },
    { name: 'React', category: 'Frontend' },
    { name: 'Vue.js', category: 'Frontend' },
    { name: 'Angular', category: 'Frontend' },
    { name: 'Node.js', category: 'Backend' },
    { name: 'NestJS', category: 'Backend' },
    { name: 'Docker', category: 'DevOps' },
    { name: 'Kubernetes', category: 'DevOps' },
    { name: 'AWS', category: 'Cloud' },
    { name: 'Azure', category: 'Cloud' },
    { name: 'GCP', category: 'Cloud' },
    { name: 'PostgreSQL', category: 'Database' },
    { name: 'MongoDB', category: 'Database' },
    { name: 'Redis', category: 'Database' },
    { name: 'Machine Learning', category: 'AI/ML' },
    { name: 'Data Science', category: 'AI/ML' },
  ];

  for (const s of skills) {
    await prisma.skill.upsert({
      where: { name: s.name },
      update: {},
      create: s,
    });
  }
  console.log('✅ Skills seeded');

  // ─── Industries ───
  const industries = [
    {
      name: 'Information Technology',
      description: 'Software, hardware, and IT services',
    },
    { name: 'Healthcare', description: 'Medical and health services' },
    {
      name: 'Finance',
      description: 'Banking, insurance, and financial services',
    },
    { name: 'Education', description: 'Schools, universities, and training' },
    { name: 'Manufacturing', description: 'Production and manufacturing' },
    { name: 'Retail', description: 'Consumer goods and retail' },
    { name: 'Energy', description: 'Oil, gas, and renewable energy' },
    { name: 'Transportation', description: 'Logistics and transport' },
    { name: 'Real Estate', description: 'Property and construction' },
    {
      name: 'Media & Entertainment',
      description: 'Publishing, broadcasting, and entertainment',
    },
  ];

  for (const i of industries) {
    await prisma.industry.upsert({
      where: { name: i.name },
      update: {},
      create: i,
    });
  }
  console.log('✅ Industries seeded');

  // ─── Degrees ───
  const degrees = [
    { name: 'Bachelor of Science', level: 'Undergraduate' },
    { name: 'Bachelor of Arts', level: 'Undergraduate' },
    { name: 'Bachelor of Technology', level: 'Undergraduate' },
    { name: 'Bachelor of Engineering', level: 'Undergraduate' },
    { name: 'Master of Science', level: 'Postgraduate' },
    { name: 'Master of Arts', level: 'Postgraduate' },
    { name: 'Master of Technology', level: 'Postgraduate' },
    { name: 'Master of Business Administration', level: 'Postgraduate' },
    { name: 'Doctor of Philosophy', level: 'Doctorate' },
    { name: 'Doctor of Medicine', level: 'Doctorate' },
  ];

  for (const d of degrees) {
    await prisma.degree.upsert({
      where: { name: d.name },
      update: {},
      create: d,
    });
  }
  console.log('✅ Degrees seeded');

  // ─── File Types ───
  const fileTypes = [
    { extension: 'pdf', mimeType: 'application/pdf', category: 'Document' },
    {
      extension: 'docx',
      mimeType:
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      category: 'Document',
    },
    {
      extension: 'xlsx',
      mimeType:
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      category: 'Spreadsheet',
    },
    {
      extension: 'pptx',
      mimeType:
        'application/vnd.openxmlformats-officedocument.presentationml.presentation',
      category: 'Presentation',
    },
    { extension: 'jpg', mimeType: 'image/jpeg', category: 'Image' },
    { extension: 'png', mimeType: 'image/png', category: 'Image' },
    { extension: 'mp4', mimeType: 'video/mp4', category: 'Video' },
    { extension: 'mp3', mimeType: 'audio/mpeg', category: 'Audio' },
    { extension: 'zip', mimeType: 'application/zip', category: 'Archive' },
    { extension: 'json', mimeType: 'application/json', category: 'Data' },
  ];

  for (const ft of fileTypes) {
    await prisma.fileType.upsert({
      where: { extension: ft.extension },
      update: {},
      create: ft,
    });
  }
  console.log('✅ File Types seeded');

  // ─── Social Platforms ───
  const socialPlatforms = [
    { name: 'LinkedIn', website: 'https://linkedin.com', icon: 'linkedin' },
    { name: 'GitHub', website: 'https://github.com', icon: 'github' },
    { name: 'Twitter', website: 'https://twitter.com', icon: 'twitter' },
    { name: 'Facebook', website: 'https://facebook.com', icon: 'facebook' },
    { name: 'Instagram', website: 'https://instagram.com', icon: 'instagram' },
    { name: 'YouTube', website: 'https://youtube.com', icon: 'youtube' },
    { name: 'Discord', website: 'https://discord.com', icon: 'discord' },
    { name: 'Telegram', website: 'https://telegram.org', icon: 'telegram' },
    { name: 'WhatsApp', website: 'https://whatsapp.com', icon: 'whatsapp' },
    { name: 'Slack', website: 'https://slack.com', icon: 'slack' },
  ];

  for (const sp of socialPlatforms) {
    await prisma.socialPlatform.upsert({
      where: { name: sp.name },
      update: {},
      create: sp,
    });
  }
  console.log('✅ Social Platforms seeded');

  // ─── Certification Providers ───
  const certProviders = [
    { name: 'AWS', website: 'https://aws.amazon.com/certification' },
    { name: 'Google Cloud', website: 'https://cloud.google.com/certification' },
    {
      name: 'Microsoft',
      website: 'https://docs.microsoft.com/learn/certifications',
    },
    { name: 'Oracle', website: 'https://education.oracle.com' },
    {
      name: 'Cisco',
      website:
        'https://www.cisco.com/c/en/us/training-events/training-certifications.html',
    },
    { name: 'CompTIA', website: 'https://www.comptia.org/certifications' },
    { name: 'PMI', website: 'https://www.pmi.org/certifications' },
    { name: 'Scrum Alliance', website: 'https://www.scrumalliance.org' },
    {
      name: 'Linux Foundation',
      website: 'https://www.linuxfoundation.org/certification',
    },
    { name: 'HashiCorp', website: 'https://www.hashicorp.com/certification' },
  ];

  for (const cp of certProviders) {
    await prisma.certificationProvider.upsert({
      where: { name: cp.name },
      update: {},
      create: cp,
    });
  }
  console.log('✅ Certification Providers seeded');

  // ─── Countries, States, Cities (sample) ───
  const countriesData = [
    {
      iso2: 'US',
      iso3: 'USA',
      name: 'United States',
      phoneCode: '+1',
      currencyCode: 'USD',
      emoji: '🇺🇸',
      states: [
        {
          name: 'California',
          code: 'CA',
          cities: ['Los Angeles', 'San Francisco', 'San Diego', 'San Jose'],
        },
        {
          name: 'New York',
          code: 'NY',
          cities: ['New York City', 'Buffalo', 'Rochester', 'Albany'],
        },
        {
          name: 'Texas',
          code: 'TX',
          cities: ['Houston', 'Dallas', 'Austin', 'San Antonio'],
        },
      ],
    },
    {
      iso2: 'IN',
      iso3: 'IND',
      name: 'India',
      phoneCode: '+91',
      currencyCode: 'INR',
      emoji: '🇮🇳',
      states: [
        {
          name: 'Maharashtra',
          code: 'MH',
          cities: ['Mumbai', 'Pune', 'Nagpur', 'Nashik'],
        },
        {
          name: 'Karnataka',
          code: 'KA',
          cities: ['Bangalore', 'Mysore', 'Hubli', 'Mangalore'],
        },
        {
          name: 'Tamil Nadu',
          code: 'TN',
          cities: ['Chennai', 'Coimbatore', 'Madurai', 'Salem'],
        },
      ],
    },
    {
      iso2: 'GB',
      iso3: 'GBR',
      name: 'United Kingdom',
      phoneCode: '+44',
      currencyCode: 'GBP',
      emoji: '🇬🇧',
      states: [
        {
          name: 'England',
          code: 'ENG',
          cities: ['London', 'Manchester', 'Birmingham', 'Liverpool'],
        },
        {
          name: 'Scotland',
          code: 'SCT',
          cities: ['Edinburgh', 'Glasgow', 'Aberdeen', 'Dundee'],
        },
      ],
    },
    {
      iso2: 'DE',
      iso3: 'DEU',
      name: 'Germany',
      phoneCode: '+49',
      currencyCode: 'EUR',
      emoji: '🇩🇪',
      states: [
        {
          name: 'Bavaria',
          code: 'BY',
          cities: ['Munich', 'Nuremberg', 'Augsburg', 'Würzburg'],
        },
        { name: 'Berlin', code: 'BE', cities: ['Berlin'] },
      ],
    },
    {
      iso2: 'JP',
      iso3: 'JPN',
      name: 'Japan',
      phoneCode: '+81',
      currencyCode: 'JPY',
      emoji: '🇯🇵',
      states: [
        {
          name: 'Tokyo',
          code: '13',
          cities: ['Tokyo', 'Shinjuku', 'Shibuya', 'Minato'],
        },
        {
          name: 'Osaka',
          code: '27',
          cities: ['Osaka', 'Sakai', 'Higashiosaka', 'Takatsuki'],
        },
      ],
    },
  ];

  for (const countryData of countriesData) {
    const country = await prisma.country.upsert({
      where: { iso2: countryData.iso2 },
      update: {},
      create: {
        iso2: countryData.iso2,
        iso3: countryData.iso3,
        name: countryData.name,
        phoneCode: countryData.phoneCode,
        currencyCode: countryData.currencyCode,
        emoji: countryData.emoji,
      },
    });

    for (const stateData of countryData.states) {
      const state = await prisma.state.upsert({
        where: {
          countryId_name: { countryId: country.id, name: stateData.name },
        },
        update: {},
        create: {
          countryId: country.id,
          name: stateData.name,
          code: stateData.code,
        },
      });

      for (const cityName of stateData.cities) {
        await prisma.city.upsert({
          where: { stateId_name: { stateId: state.id, name: cityName } },
          update: {},
          create: { stateId: state.id, name: cityName },
        });
      }
    }
  }
  console.log('✅ Countries, States & Cities seeded');

  // ─── Departments ───
  const departments = [
    { name: 'Computer Science', code: 'CS' },
    { name: 'Electrical Engineering', code: 'EE' },
    { name: 'Mechanical Engineering', code: 'ME' },
    { name: 'Civil Engineering', code: 'CE' },
    { name: 'Business Administration', code: 'BA' },
    { name: 'Mathematics', code: 'MATH' },
    { name: 'Physics', code: 'PHY' },
    { name: 'Chemistry', code: 'CHEM' },
    { name: 'Biology', code: 'BIO' },
    { name: 'Medicine', code: 'MED' },
  ];

  for (const dept of departments) {
    await prisma.department.upsert({
      where: { name: dept.name },
      update: {},
      create: dept,
    });
  }
  console.log('✅ Departments seeded');

  // ─── Universities (sample) ───
  const universities = [
    {
      name: 'Stanford University',
      country: 'US',
      state: 'California',
      city: 'Stanford',
    },
    { name: 'MIT', country: 'US', state: 'Massachusetts', city: 'Cambridge' },
    { name: 'IIT Bombay', country: 'IN', state: 'Maharashtra', city: 'Mumbai' },
    { name: 'IIT Delhi', country: 'IN', state: 'Delhi', city: 'New Delhi' },
    {
      name: 'University of Oxford',
      country: 'GB',
      state: 'England',
      city: 'Oxford',
    },
    {
      name: 'University of Cambridge',
      country: 'GB',
      state: 'England',
      city: 'Cambridge',
    },
    { name: 'TU Munich', country: 'DE', state: 'Bavaria', city: 'Munich' },
    {
      name: 'University of Tokyo',
      country: 'JP',
      state: 'Tokyo',
      city: 'Tokyo',
    },
  ];

  for (const uni of universities) {
    const country = await prisma.country.findUnique({
      where: { iso2: uni.country },
    });
    if (!country) continue;
    const state = await prisma.state.findFirst({
      where: { countryId: country.id, name: uni.state },
    });
    const city = state
      ? await prisma.city.findFirst({
          where: { stateId: state.id, name: uni.city },
        })
      : null;

    await prisma.university.upsert({
      where: { name_countryId: { name: uni.name, countryId: country.id } },
      update: {},
      create: {
        name: uni.name,
        countryId: country.id,
        stateId: state?.id ?? null,
        cityId: city?.id ?? null,
      },
    });
  }
  console.log('✅ Universities seeded');

  // ─── Colleges (sample) ───
  const colleges = [
    {
      name: 'Harvard College',
      country: 'US',
      state: 'Massachusetts',
      city: 'Cambridge',
    },
    {
      name: 'Imperial College London',
      country: 'GB',
      state: 'England',
      city: 'London',
    },
    {
      name: 'IIT Kharagpur',
      country: 'IN',
      state: 'West Bengal',
      city: 'Kharagpur',
    },
  ];

  for (const col of colleges) {
    const country = await prisma.country.findUnique({
      where: { iso2: col.country },
    });
    if (!country) continue;
    const state = await prisma.state.findFirst({
      where: { countryId: country.id, name: col.state },
    });
    const city = state
      ? await prisma.city.findFirst({
          where: { stateId: state.id, name: col.city },
        })
      : null;

    await prisma.college.upsert({
      where: { name_cityId: { name: col.name, cityId: city?.id ?? 'dummy' } },
      update: {},
      create: {
        name: col.name,
        countryId: country.id,
        stateId: state?.id ?? null,
        cityId: city?.id ?? null,
      },
    });
  }
  console.log('✅ Colleges seeded');

  console.log('\n🎉 Master data seeding completed!');
}

main()
  .catch((e) => {
    console.error('❌ Seed failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
