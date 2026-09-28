# Slider

An input where the user selects a value from within a given range. From shadcn/ui (new-york-v4), exported as `PereiraUI.Slider`.

## Consumer provides
`defaultValue`/`value` as an array (`[50]`, or two values for a range), `min`, `max`, `step`, `onValueChange`, an accessible label.

## Rules
`primary` range on a `muted` track; thumbs are white with a `primary` border in every theme (source: `bg-white`). Show the numeric value next to it when precision matters.
