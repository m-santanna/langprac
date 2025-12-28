import { z } from "zod"

export const characterSchema = z.object({
  character: z.string(),
  romaji: z.string(),
  romajiVaraint: z.string().optional(),
  meaning: z.string().optional(),
  meaningVariant: z.string().optional(),
})
export type Character = z.infer<typeof characterSchema>
