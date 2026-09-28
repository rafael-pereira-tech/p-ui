# Tabs

A set of layered sections of content—known as tab panels—that are displayed one at a time. From shadcn/ui (base-nova), exported as `PUI.Tabs`.

## Parts
`Tabs defaultValue` › `TabsList` (`TabsTrigger value`) › `TabsContent value`.

## Consumer provides
Matching `value`s, `defaultValue` or controlled `value`/`onValueChange`; `TabsList variant`: `default` (muted track) or `line` (underline); `orientation`: `horizontal | vertical`.

## Rules
Active trigger sits on `background` with `shadow-sm` inside a `muted` track. Keep labels to one or two words; 2–5 tabs.
