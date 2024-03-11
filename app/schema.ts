import { z } from "zod";

export const resumeSchema = z
  .object({
    firstName: z.string().describe("The first name of the person"),
    middleNames: z.string().describe("The middle names of the person"),
    lastName: z.string().describe("The last name of the person"),
    preferredName: z.string().describe("The preferred name of the person"),
    currentRole: z
      .string()
      .describe(
        "The current role of the person. Must include Level of Seniority + Role, e.g. Senior Full Stack Developer"
      ),
    englishWrittenCommunicationSkills: z
      .enum(["Basic", "Intermediate", "Advanced"])
      .describe("The english written communication skill of the person"),
    englishVerbalCommunicationSkills: z
      .enum(["Basic", "Intermediate", "Advanced"])
      .describe("The english verbal communication skill of the person"),
    city: z.string().describe("The city of the person"),
    country: z.string().describe("The country of the person"),

    languagesFrameworksLibraries: z
      .string()
      .describe("The languages, frameworks, libraries of the person"),
    otherTools: z.string().describe("The other tools of the person"),
    databaseStorage: z.string().describe("The database storage of the person"),
    operatingSystems: z
      .string()
      .describe("The operating systems of the person"),
    cloudPlatforms: z.string().describe("The cloud platforms of the person"),
    blockchain: z.string().describe("The blockchain of the person"),
    machineLearning: z.string().describe("The machine learning of the person"),
    educations: z
      .array(
        z.object({
          university: z.string().describe("The university of the person"),
          degree: z
            .enum(["Diploma", "Bachelor", "Master", "PhD"])
            .describe("The degree of the person"),
          specialization: z
            .string()
            .describe("The specialization of the person"),
        })
      )
      .describe("The educations of the person"),
    certifications: z
      .array(
        z.object({
          certificate_provider: z
            .string()
            .describe("The certificate provider of the person"),
          specialization: z
            .string()
            .describe("The specialization of the person"),
        })
      )
      .describe("The certifications of the person"),
    projectExperiences: z
      .array(
        z.object({
          name: z.string().describe("The project name"),
          startDate: z
            .string()
            .describe(
              "The start date of the project. Must include Month & Year, e.g. January 2023"
            ),
          endDate: z
            .string()
            .describe(
              "The end date of the project. Must include Month & Year or Present"
            ),
          role: z
            .string()
            .describe(
              "The role of the project. Must include Level of Seniority + Role, e.g. Senior Full Stack Developer"
            ),
          description: z.string().describe("The description of the project."),
        })
      )
      .describe("The project experiences of the person"),
  })
  .describe("Information resume of the person.");
