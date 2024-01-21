export function FadeInText({ text }: { text: string }) {
  let chars = []
  for (let c of text) {
    chars.push(c)
  }

  return <p>
    {chars.map((c, i) => (
      <span key={i} className='animate-bounce' style={{
        animationDelay: `${i*150}ms`,
      }}>{c}</span>
    ))}
  </p>
}