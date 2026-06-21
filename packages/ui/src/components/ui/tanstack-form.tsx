/**
 * tanstack-form.tsx — Main entry point for the form system.
 *
 * Provides useAppForm, useFormFields, Form, SubmitButton, StepButton,
 * withForm, and withFieldGroup. See docs/forms.md for full usage guide.
 */

import { createFormHook } from "@tanstack/react-form";
import type { VariantProps } from "class-variance-authority";
import * as React from "react";
import { Button, type buttonVariants } from "./button";
import {
  FieldContent,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSeparator,
  FieldTitle,
} from "./field";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "./input-group";
import { cn } from "../../lib/utils";
import {
  fieldContext,
  formContext,
  useFormContext,
  FormFieldSet,
  FormField,
  FormFieldError,
} from "./form-context";

// ---------------------------------------------------------------------------
// Form-level components (used as form.ComponentName)
// ---------------------------------------------------------------------------

function Form({
  children,
  ...props
}: Omit<React.ComponentPropsWithoutRef<"form">, "onSubmit" | "noValidate"> & {
  children?: React.ReactNode;
}) {
  const form = useFormContext();
  const handleSubmit = React.useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      e.stopPropagation();
      form.handleSubmit();
    },
    [form],
  );
  return (
    <form
      onSubmit={handleSubmit}
      className={cn(
        "mx-auto flex w-full flex-col gap-2 p-2 md:p-5",
        props.className,
      )}
      noValidate
      {...props}
    >
      {children}
    </form>
  );
}

function SubmitButton({
  children,
  className,
  size,
  ...props
}: React.ComponentProps<"button"> & VariantProps<typeof buttonVariants>) {
  const form = useFormContext();
  return (
    <form.Subscribe
      selector={(state) => [state.canSubmit, state.isSubmitting] as const}
    >
      {([canSubmit, isSubmitting]) => (
        <Button
          className={className}
          size={size}
          type="submit"
          disabled={!canSubmit}
          isLoading={isSubmitting}
          {...props}
        >
          {children}
        </Button>
      )}
    </form.Subscribe>
  );
}

function StepButton({
  label,
  handleMovement,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    label: React.ReactNode | string;
    handleMovement: () => void;
  }) {
  return (
    <Button
      size="sm"
      variant="ghost"
      type="button"
      onClick={handleMovement}
      {...props}
    >
      {label}
    </Button>
  );
}

// ---------------------------------------------------------------------------
// Hook creation
// ---------------------------------------------------------------------------

const { useAppForm, withForm, withFieldGroup } = createFormHook({
  fieldContext,
  formContext,
  fieldComponents: {
    // Structural (for custom fields via AppField escape hatch)
    Field: FormField,
    FieldError: FormFieldError,
    FieldSet: FormFieldSet,
    FieldContent,
    FieldDescription,
    FieldGroup,
    FieldLabel,
    FieldLegend,
    FieldSeparator,
    FieldTitle,
    InputGroup,
    InputGroupAddon,
    InputGroupInput,
  },
  formComponents: {
    Form,
    SubmitButton,
    StepButton,
    FieldLegend,
    FieldDescription,
    FieldSeparator,
  },
});


// ---------------------------------------------------------------------------
// Exports
// ---------------------------------------------------------------------------

export { useAppForm, withForm, withFieldGroup };

export type {
  FieldConfig,
  FieldValidatorConfig,
  FieldListenerConfig,
  WithTypedName,
} from "./form-context";

export {
  createFormField,
  typedField,
  revalidateLogic,
  scrollToFirstError,
  useFieldContext,
  useFormContext,
  FormFieldSet,
  FormField,
  FormFieldError,
  FormErrors,
} from "./form-context";
