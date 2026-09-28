import tokens from "@p-ui/react/tokens.json"

type Tok = { name: string; usage?: string }

const colorTokens = (tokens.color.tokens as Tok[]).filter((t) => !/^(blue|orange)-/.test(t.name))
const accentTokens = (tokens.color.tokens as Tok[]).filter((t) => /^(blue|orange)-/.test(t.name))

function Swatch({ t }: { t: Tok }) {
  return (
    <div className="flex items-start gap-3">
      <div className="size-10 shrink-0 rounded-md border" style={{ background: `var(--${t.name})` }} />
      <div className="flex min-w-0 flex-col gap-0.5">
        <code className="font-mono text-sm font-semibold">{t.name}</code>
        {t.usage && <span className="text-xs text-muted-foreground">{t.usage}</span>}
      </div>
    </div>
  )
}

export function TokensPage() {
  return (
    <main className="mx-auto flex max-w-6xl flex-col gap-12 px-6 py-10">
      <div className="flex flex-col gap-2">
        <h1 className="text-4xl font-extrabold tracking-tight">Tokens</h1>
        <p className="text-xl text-muted-foreground">
          Values for the theme and accent selected in the header. Source: <code className="font-mono text-base">packages/react/tokens.json</code>.
        </p>
      </div>
      <section className="flex flex-col gap-4">
        <h2 className="border-b pb-2 text-3xl font-semibold tracking-tight">Colour</h2>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {colorTokens.map((t) => (
            <Swatch key={t.name} t={t} />
          ))}
        </div>
      </section>
      <section className="flex flex-col gap-4">
        <h2 className="border-b pb-2 text-3xl font-semibold tracking-tight">Accents</h2>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {accentTokens.map((t) => (
            <Swatch key={t.name} t={{ name: t.name }} />
          ))}
        </div>
      </section>
      <section className="flex flex-col gap-4">
        <h2 className="border-b pb-2 text-3xl font-semibold tracking-tight">Radius</h2>
        <div className="flex flex-wrap items-end gap-6">
          {tokens.radius.tokens.map((t) => (
            <div key={t.name} className="flex flex-col items-center gap-2">
              <div className="size-16 border-2 border-primary bg-muted" style={{ borderRadius: t.value }} />
              <code className="font-mono text-xs">{t.name}</code>
              <span className="text-xs text-muted-foreground">{t.value}</span>
            </div>
          ))}
        </div>
      </section>
      <section className="flex flex-col gap-4">
        <h2 className="border-b pb-2 text-3xl font-semibold tracking-tight">Type</h2>
        <div className="flex flex-col gap-6">
          {tokens.type.groups.flatMap((g) =>
            g.styles.map((s) => (
              <div key={s.name} className="grid gap-1 sm:grid-cols-[8rem_1fr] sm:items-baseline">
                <code className="font-mono text-xs text-muted-foreground">
                  {s.name} · {s.fontSize}
                </code>
                <span
                  style={{
                    fontFamily: `var(--font-${g.family})`,
                    fontSize: s.fontSize,
                    lineHeight: s.lineHeight,
                    fontWeight: s.fontWeight,
                    letterSpacing: "letterSpacing" in s ? (s.letterSpacing as string) : undefined,
                  }}
                >
                  {s.sample}
                </span>
              </div>
            ))
          )}
        </div>
      </section>
    </main>
  )
}
