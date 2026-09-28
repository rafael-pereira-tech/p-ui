# Input

A text input component for forms and user data entry with built-in styling and accessibility features. From shadcn/ui (base-nova), exported as `PUI.Input`.

## Consumer provides
Native input props (`type`, `placeholder`, `value`/`defaultValue`, `onChange`, `disabled`), an `id` matched by a `Label htmlFor`, and `aria-invalid` for error state.

## Rules
- h-9, `radius-md`, `input` border, `shadow-xs`; in dark themes a translucent `input/30` fill. Focus shows `ring`; `aria-invalid` turns border and ring `destructive`.
- Always pair with a visible Label; put helper/error text below in `muted-foreground` / `destructive` at `body` size.
