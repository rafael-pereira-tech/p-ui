# Field

Combine labels, controls, and help text to compose accessible form fields and grouped inputs. From shadcn/ui (new-york-v4), exported as `PUI.Field`.

## Parts
`FieldSet` › `FieldLegend`, `FieldDescription`, `FieldGroup` › `Field orientation` (`vertical` | `horizontal` | `responsive`) › `FieldLabel`, control, `FieldDescription`, `FieldError`; `FieldContent`, `FieldTitle`, `FieldSeparator`.

## Consumer provides
The control (Input, Select, Checkbox…), `data-invalid` on `Field` and `aria-invalid` on the control for errors, `FieldError` text or `errors` array.

## Rules
Build every form with Field: it sets label/description spacing, error colour (`destructive`) and horizontal layouts for Checkbox/Switch rows. `orientation="responsive"` stacks on narrow containers and goes side-by-side on wide ones.
