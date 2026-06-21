import * as z from "zod";

// Better Auth users only carry name/email/role/status — phone and a split
// last name are optional remnants of the table's original mock shape.
export const userSchema = z.object({
  first_name: z.string().min(1, "Name is required"),
  last_name: z.string(),
  email: z.string().email("Please enter a valid email"),
  phone: z.string(),
  role: z.string().min(1, "Please select a role"),
  status: z.string().min(1, "Please select a status"),
});

export type UserFormValues = z.infer<typeof userSchema>;
