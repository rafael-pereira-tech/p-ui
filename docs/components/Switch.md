# Switch

A control that allows the user to toggle between checked and not checked. From shadcn/ui (base-nova), exported as `PUI.Switch`.

## When to use
Settings that apply immediately (on/off). For choices submitted with a form, prefer Checkbox.

## Consumer provides
`checked`/`defaultChecked`, `onCheckedChange`, `id` for a Label, `disabled`; `size`: `default | sm`.

## Rules
On = `primary` track (follows `data-accent`); off = `input` track. Thumb is `background` (dark themes: `foreground` when off, `primary-foreground` when on).
