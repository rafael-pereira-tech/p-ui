# Avatar

An image element with a fallback for representing the user. From shadcn/ui (new-york-v4), exported as `PereiraUI.Avatar`.

## Parts
`Avatar size` › `AvatarImage src alt` › `AvatarFallback` (initials); also `AvatarBadge`, `AvatarGroup`, `AvatarGroupCount`.

## Consumer provides
`src` + `alt`, two-letter initials as fallback; `size`: `sm (24px) | default (32px) | lg (40px)`.

## Rules
Circle; fallback on `muted` with `muted-foreground` initials.
