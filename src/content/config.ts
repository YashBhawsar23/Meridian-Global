import { defineCollection, z } from 'astro:content';

const products = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    hsCode: z.string(),
    originCountry: z.string(),
    grade: z.string(),
    moq: z.string(),
    incoterms: z.array(z.string()),
    packaging: z.array(z.string()),
    loadingPorts: z.array(z.string()),
    certifications: z.array(z.string()),
    featuredImage: z.string(),
    metaDescription: z.string(),
    category: z.string().optional(),
    harvestSeason: z.string().optional(),
    supplyAbility: z.string().optional(),
    paymentTerms: z.array(z.string()).optional(),
  }),
});

export const collections = {
  products,
};
