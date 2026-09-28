# Card

Displays a card with header, content, and footer. From shadcn/ui (new-york-v4), exported as `PereiraUI.Card`.

## Parts
`Card` › `CardHeader` (`CardTitle`, `CardDescription`, optional `CardAction` pinned top-right) › `CardContent` › `CardFooter`.

## Consumer provides
All content via children; width via `className` (e.g. `w-full max-w-sm`).

## Rules
- `card` fill, `border`, `radius-xl`, `shadow-sm`, `space-6` padding and gap. Don't nest Cards; use Separator or sections inside one.
