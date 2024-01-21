export function FadeInText({ text }: { text: string }) {
  let chars = []
  for (let c of text.split(" ")) {
    chars.push(c)
  }

  return <p>
    {chars.map((c, i) => (
      <span key={i}  style={{
        fontWeight: "500",
        // fontVariationSettings: "wght 500",
        animation: 'fadein 100ms ease-in-out forwards',
        opacity: 0,
        animationDelay: `${i*50}ms`,
        display: "inline-block"
      }}>{c === ' '? '\u00a0' : c + '\u00a0'}</span>
    ))}
  </p>
}