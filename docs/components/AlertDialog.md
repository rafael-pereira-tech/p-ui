# AlertDialog

A modal dialog that interrupts the user with important content and expects a response. From shadcn/ui (new-york-v4), exported as `PUI.AlertDialog`.

## Parts
`AlertDialog` › `AlertDialogTrigger asChild` › `AlertDialogContent` (`AlertDialogHeader` › `AlertDialogTitle`, `AlertDialogDescription`; `AlertDialogFooter` › `AlertDialogCancel`, `AlertDialogAction`).

## Rules
Only for confirmations of consequential actions. It can't be dismissed by clicking outside. Title as a question, description states the consequence, the action button names the verb ("Delete project"); style it `destructive` via `className={buttonVariants({variant:"destructive"})}` when irreversible.
