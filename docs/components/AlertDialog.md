# AlertDialog

A modal dialog that interrupts the user with important content and expects a response. From shadcn/ui (base-nova), exported as `PUI.AlertDialog`.

## Parts
`AlertDialog` › `AlertDialogTrigger render={…}` › `AlertDialogContent` (`AlertDialogHeader` › `AlertDialogTitle`, `AlertDialogDescription`; `AlertDialogFooter` › `AlertDialogCancel`, `AlertDialogAction`).

## Rules
Only for confirmations of consequential actions. It can't be dismissed by clicking outside. Title as a question, description states the consequence, the action button names the verb ("Delete project"); style it `destructive` via `className={buttonVariants({variant:"destructive"})}` when irreversible.
