import "dotenv/config";

import { PrismaClient } from "../src/generated/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { MasterStatus } from "../src/generated/enums";

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL!,
});

const prisma = new PrismaClient({
  adapter,
});

async function main() {
  console.log("🌱 Starting database seed...");

  // =========================================================
  // 1. COUNTRIES
  // =========================================================

  const countries = await Promise.all([
    prisma.country.upsert({
      where: { iso2: "IN" },
      update: {},
      create: {
        iso2: "IN",
        iso3: "IND",
        name: "India",
        phoneCode: "+91",
        currencyCode: "INR",
        emoji: "🇮🇳",
        status: MasterStatus.ACTIVE,
      },
    }),

    prisma.country.upsert({
      where: { iso2: "US" },
      update: {},
      create: {
        iso2: "US",
        iso3: "USA",
        name: "United States",
        phoneCode: "+1",
        currencyCode: "USD",
        emoji: "🇺🇸",
        status: MasterStatus.ACTIVE,
      },
    }),

    prisma.country.upsert({
      where: { iso2: "GB" },
      update: {},
      create: {
        iso2: "GB",
        iso3: "GBR",
        name: "United Kingdom",
        phoneCode: "+44",
        currencyCode: "GBP",
        emoji: "🇬🇧",
        status: MasterStatus.ACTIVE,
      },
    }),
  ]);

  const india = countries.find((c) => c.iso2 === "IN")!;
  const usa = countries.find((c) => c.iso2 === "US")!;
  const uk = countries.find((c) => c.iso2 === "GB")!;

  // =========================================================
  // 2. STATES
  // =========================================================

  const tamilNadu = await prisma.state.upsert({
    where: {
      countryId_name: {
        countryId: india.id,
        name: "Tamil Nadu",
      },
    },
    update: {},
    create: {
      countryId: india.id,
      name: "Tamil Nadu",
      code: "TN",
    },
  });

  const kerala = await prisma.state.upsert({
    where: {
      countryId_name: {
        countryId: india.id,
        name: "Kerala",
      },
    },
    update: {},
    create: {
      countryId: india.id,
      name: "Kerala",
      code: "KL",
    },
  });

  const karnataka = await prisma.state.upsert({
    where: {
      countryId_name: {
        countryId: india.id,
        name: "Karnataka",
      },
    },
    update: {},
    create: {
      countryId: india.id,
      name: "Karnataka",
      code: "KA",
    },
  });

  const california = await prisma.state.upsert({
    where: {
      countryId_name: {
        countryId: usa.id,
        name: "California",
      },
    },
    update: {},
    create: {
      countryId: usa.id,
      name: "California",
      code: "CA",
    },
  });

  const texas = await prisma.state.upsert({
    where: {
      countryId_name: {
        countryId: usa.id,
        name: "Texas",
      },
    },
    update: {},
    create: {
      countryId: usa.id,
      name: "Texas",
      code: "TX",
    },
  });

  const england = await prisma.state.upsert({
    where: {
      countryId_name: {
        countryId: uk.id,
        name: "England",
      },
    },
    update: {},
    create: {
      countryId: uk.id,
      name: "England",
      code: "ENG",
    },
  });

  // =========================================================
  // 3. CITIES
  // =========================================================

  const coimbatore = await prisma.city.upsert({
    where: {
      stateId_name: {
        stateId: tamilNadu.id,
        name: "Coimbatore",
      },
    },
    update: {},
    create: {
      stateId: tamilNadu.id,
      name: "Coimbatore",
    },
  });

  const chennai = await prisma.city.upsert({
    where: {
      stateId_name: {
        stateId: tamilNadu.id,
        name: "Chennai",
      },
    },
    update: {},
    create: {
      stateId: tamilNadu.id,
      name: "Chennai",
    },
  });

  const madurai = await prisma.city.upsert({
    where: {
      stateId_name: {
        stateId: tamilNadu.id,
        name: "Madurai",
      },
    },
    update: {},
    create: {
      stateId: tamilNadu.id,
      name: "Madurai",
    },
  });

  const kochi = await prisma.city.upsert({
    where: {
      stateId_name: {
        stateId: kerala.id,
        name: "Kochi",
      },
    },
    update: {},
    create: {
      stateId: kerala.id,
      name: "Kochi",
    },
  });

  const bangalore = await prisma.city.upsert({
    where: {
      stateId_name: {
        stateId: karnataka.id,
        name: "Bangalore",
      },
    },
    update: {},
    create: {
      stateId: karnataka.id,
      name: "Bangalore",
    },
  });

  const losAngeles = await prisma.city.upsert({
    where: {
      stateId_name: {
        stateId: california.id,
        name: "Los Angeles",
      },
    },
    update: {},
    create: {
      stateId: california.id,
      name: "Los Angeles",
    },
  });

  const houston = await prisma.city.upsert({
    where: {
      stateId_name: {
        stateId: texas.id,
        name: "Houston",
      },
    },
    update: {},
    create: {
      stateId: texas.id,
      name: "Houston",
    },
  });

  const london = await prisma.city.upsert({
    where: {
      stateId_name: {
        stateId: england.id,
        name: "London",
      },
    },
    update: {},
    create: {
      stateId: england.id,
      name: "London",
    },
  });

  // =========================================================
  // 4. LANGUAGES
  // =========================================================

  const languages = [
    {
      code: "EN",
      name: "English",
      nativeName: "English",
    },
    {
      code: "TA",
      name: "Tamil",
      nativeName: "தமிழ்",
    },
    {
      code: "HI",
      name: "Hindi",
      nativeName: "हिन्दी",
    },
    {
      code: "ML",
      name: "Malayalam",
      nativeName: "മലയാളം",
    },
    {
      code: "TE",
      name: "Telugu",
      nativeName: "తెలుగు",
    },
    {
      code: "KN",
      name: "Kannada",
      nativeName: "ಕನ್ನಡ",
    },
  ];

  for (const language of languages) {
    await prisma.language.upsert({
      where: { code: language.code },
      update: {},
      create: {
        ...language,
        status: MasterStatus.ACTIVE,
      },
    });
  }

  // =========================================================
  // 5. CURRENCIES
  // =========================================================

  const currencies = [
    {
      code: "INR",
      name: "Indian Rupee",
      symbol: "₹",
    },
    {
      code: "USD",
      name: "United States Dollar",
      symbol: "$",
    },
    {
      code: "EUR",
      name: "Euro",
      symbol: "€",
    },
    {
      code: "GBP",
      name: "British Pound",
      symbol: "£",
    },
    {
      code: "JPY",
      name: "Japanese Yen",
      symbol: "¥",
    },
  ];

  for (const currency of currencies) {
    await prisma.currency.upsert({
      where: { code: currency.code },
      update: {},
      create: currency,
    });
  }

  // =========================================================
  // 6. TIMEZONES
  // =========================================================

  const timezones = [
    {
      name: "Asia/Kolkata",
      utcOffset: "+05:30",
    },
    {
      name: "UTC",
      utcOffset: "+00:00",
    },
    {
      name: "America/New_York",
      utcOffset: "-05:00",
    },
    {
      name: "America/Los_Angeles",
      utcOffset: "-08:00",
    },
    {
      name: "Europe/London",
      utcOffset: "+00:00",
    },
    {
      name: "Asia/Tokyo",
      utcOffset: "+09:00",
    },
  ];

  for (const timezone of timezones) {
    await prisma.timezone.upsert({
      where: { name: timezone.name },
      update: {},
      create: timezone,
    });
  }

  // =========================================================
  // 7. SKILLS
  // =========================================================

  const skills = [
    { name: "JavaScript", category: "Programming" },
    { name: "TypeScript", category: "Programming" },
    { name: "Python", category: "Programming" },
    { name: "Java", category: "Programming" },
    { name: "React.js", category: "Frontend" },
    { name: "Next.js", category: "Frontend" },
    { name: "Node.js", category: "Backend" },
    { name: "NestJS", category: "Backend" },
    { name: "MongoDB", category: "Database" },
    { name: "PostgreSQL", category: "Database" },
    { name: "Prisma", category: "ORM" },
    { name: "Docker", category: "DevOps" },
    { name: "Machine Learning", category: "AI/ML" },
    { name: "Artificial Intelligence", category: "AI/ML" },
  ];

  for (const skill of skills) {
    await prisma.skill.upsert({
      where: { name: skill.name },
      update: {},
      create: {
        ...skill,
        status: MasterStatus.ACTIVE,
      },
    });
  }

  // =========================================================
  // 8. INDUSTRIES
  // =========================================================

  const industries = [
    {
      name: "Information Technology",
      description: "Software and technology services",
    },
    {
      name: "Education",
      description: "Schools, colleges and educational institutions",
    },
    {
      name: "Healthcare",
      description: "Healthcare and medical services",
    },
    {
      name: "Finance",
      description: "Banking, financial and insurance services",
    },
    {
      name: "E-commerce",
      description: "Online shopping and retail",
    },
    {
      name: "Manufacturing",
      description: "Industrial and manufacturing companies",
    },
    {
      name: "Telecommunications",
      description: "Telecommunication and networking services",
    },
    {
      name: "Automotive",
      description: "Automobile industry",
    },
  ];

  for (const industry of industries) {
    await prisma.industry.upsert({
      where: { name: industry.name },
      update: {},
      create: industry,
    });
  }

  // =========================================================
  // 9. DEGREES
  // =========================================================

  const degrees = [
    { name: "Bachelor of Computer Applications", level: "Undergraduate" },
    { name: "Bachelor of Science", level: "Undergraduate" },
    { name: "Bachelor of Engineering", level: "Undergraduate" },
    { name: "Bachelor of Technology", level: "Undergraduate" },
    { name: "Master of Computer Applications", level: "Postgraduate" },
    { name: "Master of Science", level: "Postgraduate" },
    { name: "Master of Technology", level: "Postgraduate" },
    { name: "Master of Business Administration", level: "Postgraduate" },
    { name: "Doctor of Philosophy", level: "Doctorate" },
  ];

  for (const degree of degrees) {
    await prisma.degree.upsert({
      where: { name: degree.name },
      update: {},
      create: degree,
    });
  }

  // =========================================================
  // 10. UNIVERSITIES
  // =========================================================

  const universities = [
    {
      name: "Anna University",
      countryId: india.id,
      stateId: tamilNadu.id,
      cityId: chennai.id,
      website: "https://www.annauniv.edu",
    },
    {
      name: "Bharathiar University",
      countryId: india.id,
      stateId: tamilNadu.id,
      cityId: coimbatore.id,
      website: "https://b-u.ac.in",
    },
    {
      name: "University of Madras",
      countryId: india.id,
      stateId: tamilNadu.id,
      cityId: chennai.id,
      website: "https://www.unom.ac.in",
    },
    {
      name: "University of Kerala",
      countryId: india.id,
      stateId: kerala.id,
      cityId: kochi.id,
      website: "https://www.keralauniversity.ac.in",
    },
    {
      name: "University of California",
      countryId: usa.id,
      stateId: california.id,
      cityId: losAngeles.id,
      website: "https://www.universityofcalifornia.edu",
    },
  ];

  for (const university of universities) {
    await prisma.university.upsert({
      where: {
        name_countryId: {
          name: university.name,
          countryId: university.countryId,
        },
      },
      update: {},
      create: university,
    });
  }

  // =========================================================
  // 11. CERTIFICATION PROVIDERS
  // =========================================================

  const certificationProviders = [
    {
      name: "Microsoft",
      website: "https://learn.microsoft.com",
    },
    {
      name: "Google",
      website: "https://grow.google",
    },
    {
      name: "Amazon Web Services",
      website: "https://aws.amazon.com",
    },
    {
      name: "Cisco",
      website: "https://www.cisco.com",
    },
    {
      name: "Oracle",
      website: "https://www.oracle.com",
    },
    {
      name: "IBM",
      website: "https://www.ibm.com",
    },
    {
      name: "Meta",
      website: "https://www.meta.com",
    },
  ];

  for (const provider of certificationProviders) {
    await prisma.certificationProvider.upsert({
      where: { name: provider.name },
      update: {},
      create: provider,
    });
  }

  // =========================================================
  // 12. FILE TYPES
  // =========================================================

  // =========================================================
  // 13. SOCIAL PLATFORMS
  // =========================================================

  const socialPlatforms = [
    {
      name: "LinkedIn",
      website: "https://www.linkedin.com",
      icon: "linkedin",
    },
    {
      name: "Facebook",
      website: "https://www.facebook.com",
      icon: "facebook",
    },
    {
      name: "Instagram",
      website: "https://www.instagram.com",
      icon: "instagram",
    },
    {
      name: "Twitter",
      website: "https://twitter.com",
      icon: "twitter",
    },
    {
      name: "YouTube",
      website: "https://www.youtube.com",
      icon: "youtube",
    },
    {
      name: "GitHub",
      website: "https://github.com",
      icon: "github",
    },
  ];

  for (const platform of socialPlatforms) {
    await prisma.socialPlatform.upsert({
      where: { name: platform.name },
      update: {},
      create: platform,
    });
  }

  // =========================================================
  // 14. DEPARTMENTS
  // =========================================================

  const departments = [
    {
      code: "CSE",
      name: "Computer Science and Engineering",
    },
    {
      code: "IT",
      name: "Information Technology",
    },
    {
      code: "ECE",
      name: "Electronics and Communication Engineering",
    },
    {
      code: "EEE",
      name: "Electrical and Electronics Engineering",
    },
    {
      code: "MECH",
      name: "Mechanical Engineering",
    },
    {
      code: "CIVIL",
      name: "Civil Engineering",
    },
    {
      code: "BCA",
      name: "Computer Applications",
    },
    {
      code: "MBA",
      name: "Business Administration",
    },
  ];

  const departmentMap: Record<string, string> = {};

  for (const department of departments) {
    const result = await prisma.department.upsert({
      where: { name: department.name },
      update: {},
      create: department,
    });

    departmentMap[department.code] = result.id;
  }

  // =========================================================
  // 15. COLLEGES
  // =========================================================

  const colleges = [
    {
      code: "PSG",
      name: "PSG College of Technology",
      shortName: "PSG Tech",
      website: "https://www.psgtech.edu",
      countryId: india.id,
      stateId: tamilNadu.id,
      cityId: coimbatore.id,
    },
    {
      code: "GCT",
      name: "Government College of Technology",
      shortName: "GCT",
      website: "https://www.gct.ac.in",
      countryId: india.id,
      stateId: tamilNadu.id,
      cityId: coimbatore.id,
    },
    {
      code: "CIT",
      name: "Coimbatore Institute of Technology",
      shortName: "CIT",
      website: "https://www.cit.edu.in",
      countryId: india.id,
      stateId: tamilNadu.id,
      cityId: coimbatore.id,
    },
    {
      code: "SSVM",
      name: "Sri Ramakrishna Engineering College",
      shortName: "SREC",
      website: "https://www.srec.ac.in",
      countryId: india.id,
      stateId: tamilNadu.id,
      cityId: coimbatore.id,
    },
    {
      code: "KCT",
      name: "Kumaraguru College of Technology",
      shortName: "KCT",
      website: "https://www.kct.ac.in",
      countryId: india.id,
      stateId: tamilNadu.id,
      cityId: coimbatore.id,
    },
  ];

  const collegeMap: Record<string, string> = {};

  for (const college of colleges) {
    const result = await prisma.college.upsert({
      where: {
        name_cityId: {
          name: college.name,
          cityId: college.cityId,
        },
      },
      update: {},
      create: college,
    });

    collegeMap[college.code] = result.id;
  }

  // =========================================================
  // 16. COLLEGE DEPARTMENTS
  // =========================================================

  const collegeDepartments = [
    {
      collegeId: collegeMap["PSG"],
      departmentId: departmentMap["CSE"],
    },
    {
      collegeId: collegeMap["PSG"],
      departmentId: departmentMap["IT"],
    },
    {
      collegeId: collegeMap["PSG"],
      departmentId: departmentMap["ECE"],
    },

    {
      collegeId: collegeMap["GCT"],
      departmentId: departmentMap["CSE"],
    },
    {
      collegeId: collegeMap["GCT"],
      departmentId: departmentMap["ECE"],
    },
    {
      collegeId: collegeMap["GCT"],
      departmentId: departmentMap["MECH"],
    },

    {
      collegeId: collegeMap["CIT"],
      departmentId: departmentMap["CSE"],
    },
    {
      collegeId: collegeMap["CIT"],
      departmentId: departmentMap["IT"],
    },
    {
      collegeId: collegeMap["CIT"],
      departmentId: departmentMap["EEE"],
    },

    {
      collegeId: collegeMap["SSVM"],
      departmentId: departmentMap["CSE"],
    },
    {
      collegeId: collegeMap["SSVM"],
      departmentId: departmentMap["ECE"],
    },

    {
      collegeId: collegeMap["KCT"],
      departmentId: departmentMap["CSE"],
    },
    {
      collegeId: collegeMap["KCT"],
      departmentId: departmentMap["IT"],
    },
    {
      collegeId: collegeMap["KCT"],
      departmentId: departmentMap["MBA"],
    },
  ];

  for (const item of collegeDepartments) {
    await prisma.collegeDepartment.upsert({
      where: {
        collegeId_departmentId: {
          collegeId: item.collegeId,
          departmentId: item.departmentId,
        },
      },
      update: {},
      create: item,
    });
  }

  // =========================================================
  // DONE
  // =========================================================

  console.log("✅ Seed completed successfully!");
  console.log("");
  console.log("Seeded models:");
  console.log("1.  Country");
  console.log("2.  State");
  console.log("3.  City");
  console.log("4.  Language");
  console.log("5.  Currency");
  console.log("6.  Timezone");
  console.log("7.  Skill");
  console.log("8.  Industry");
  console.log("9.  Degree");
  console.log("10. University");
  console.log("11. CertificationProvider");
  console.log("12. FileType");
  console.log("13. SocialPlatform");
  console.log("14. Department");
  console.log("15. College");
  console.log("16. CollegeDepartment");
}

main()
  .catch((error) => {
    console.error("❌ Seed failed:", error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
