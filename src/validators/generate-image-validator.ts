import z from "zod";

export const GenerateImageSchema = z.object({
    prompt: z.string().min(1, { message: 'Prompt is required' }),
    ratio: z.string().min(1, { message: 'Model is required' }),
});