function SectionTitle({ eyebrow, title, children }) {
  return (
    <div className="mx-auto mb-8 max-w-3xl text-center">
      <p className="mb-2 text-sm font-black uppercase tracking-[0.24em] text-red-700">{eyebrow}</p>
      <h2 className="text-3xl font-black text-stone-950 sm:text-4xl">{title}</h2>
      {children ? <p className="mt-3 text-stone-700">{children}</p> : null}
    </div>
  )
}

export default SectionTitle
