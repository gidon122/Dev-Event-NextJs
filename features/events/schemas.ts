import { z } from "zod";
import {
  DEFAULT_PAGE_SIZE,
  EVENT_CATEGORY_VALUES,
  EVENT_SORT_VALUES,
} from "./data";

/**
 * Every field has its own fallback (.catch), so one bad URL parameter
 * (?page=abc) never throws and never throws away the valid ones.
 */
export const eventQuerySchema = z.object({
  q: z.string().trim().max(100).optional().catch(undefined),
  category: z.enum(EVENT_CATEGORY_VALUES).optional().catch(undefined),
  /** YYYY-MM-DD, interpreted in Africa/Lagos by the service. */
  from: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/)
    .optional()
    .catch(undefined),
  sort: z.enum(EVENT_SORT_VALUES).catch("soonest"),
  page: z.coerce.number().int().min(1).catch(1),
  limit: z.coerce.number().int().min(1).max(50).catch(DEFAULT_PAGE_SIZE),
});

export type EventQuery = z.infer<typeof eventQuerySchema>;

export function parseEventQuery(
  raw: Record<string, string | string[] | undefined>,
): EventQuery {
  const flat: Record<string, string | undefined> = {};
  for (const [key, value] of Object.entries(raw)) {
    flat[key] = Array.isArray(value) ? value[0] : value;
  }
  return eventQuerySchema.parse(flat);
}
