"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAppForm } from "@/components/ui/tanstack-form";
import { authClient } from "@vend1k/auth/client";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { toast } from "sonner";
import * as z from "zod";

const signInSchema = z.object({
  name: z.string(),
  email: z.string().email({ message: "Enter a valid email address" }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters" }),
});

const signUpSchema = signInSchema.extend({
  name: z.string().min(1, { message: "Enter your name" }),
});

export default function UserAuthForm({
  mode = "sign-in",
  redirectTo = "/dashboard/overview",
}: {
  mode?: "sign-in" | "sign-up";
  redirectTo?: string;
}) {
  const router = useRouter();
  const [loading, startTransition] = useTransition();
  const isSignUp = mode === "sign-up";

  const form = useAppForm({
    defaultValues: { name: "", email: "", password: "" },
    validators: {
      onSubmit: isSignUp ? signUpSchema : signInSchema,
    },
    onSubmit: async ({ value }) => {
      const result = isSignUp
        ? await authClient.signUp.email({
            name: value.name,
            email: value.email,
            password: value.password,
          })
        : await authClient.signIn.email({
            email: value.email,
            password: value.password,
          });

      if (result.error) {
        toast.error(result.error.message ?? "Authentication failed");
        return;
      }

      toast.success(isSignUp ? "Account created" : "Signed in");
      startTransition(() => {
        router.push(redirectTo);
        router.refresh();
      });
    },
  });

  return (
    <form.AppForm>
      <form.Form className="flex w-full flex-col gap-4">
        {isSignUp && (
          <form.AppField
            name="name"
            children={(field) => (
              <field.FieldSet>
                <field.Field>
                  <field.FieldLabel htmlFor={field.name}>Name</field.FieldLabel>
                  <Input
                    id={field.name}
                    name={field.name}
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                    placeholder="Jane Doe"
                    disabled={loading}
                    aria-invalid={
                      field.state.meta.isTouched && !field.state.meta.isValid
                    }
                  />
                </field.Field>
                <field.FieldError />
              </field.FieldSet>
            )}
          />
        )}
        <form.AppField
          name="email"
          children={(field) => (
            <field.FieldSet>
              <field.Field>
                <field.FieldLabel htmlFor={field.name}>Email</field.FieldLabel>
                <Input
                  id={field.name}
                  name={field.name}
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                  placeholder="you@example.com"
                  disabled={loading}
                  aria-invalid={
                    field.state.meta.isTouched && !field.state.meta.isValid
                  }
                />
              </field.Field>
              <field.FieldError />
            </field.FieldSet>
          )}
        />
        <form.AppField
          name="password"
          children={(field) => (
            <field.FieldSet>
              <field.Field>
                <field.FieldLabel htmlFor={field.name}>
                  Password
                </field.FieldLabel>
                <Input
                  id={field.name}
                  name={field.name}
                  type="password"
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                  placeholder="••••••••"
                  disabled={loading}
                  aria-invalid={
                    field.state.meta.isTouched && !field.state.meta.isValid
                  }
                />
              </field.Field>
              <field.FieldError />
            </field.FieldSet>
          )}
        />
        <Button disabled={loading} className="w-full" type="submit">
          {isSignUp ? "Create account" : "Continue with email"}
        </Button>
      </form.Form>
    </form.AppForm>
  );
}
