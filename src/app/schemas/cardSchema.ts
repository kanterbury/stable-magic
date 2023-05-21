import { z } from "zod";

const cardSchema = z.object({
  id: z.string(),
  name: z.string(),
});

export default cardSchema;
