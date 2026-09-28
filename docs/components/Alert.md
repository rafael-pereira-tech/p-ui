# Alert

Displays a callout for user attention. From shadcn/ui (base-nova), exported as `PUI.Alert`.

## Parts
`Alert variant` › optional lucide icon › `AlertTitle` › `AlertDescription`.

## Consumer provides
`variant`: `default | destructive`; title (one line) and description.

## Rules
`card` fill, `border`, `radius-lg`. `destructive` colours the text and icon `destructive`, never the fill. Put an icon or a clear title with it so meaning isn't carried by colour alone.
