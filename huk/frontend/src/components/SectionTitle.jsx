function SectionTitle({ eyebrow, title, children }) {
  return (
    <div className="mx-auto mb-8 max-w-3xl px-1 text-center sm:mb-10">
      <p className="mb-2 wrap-break-word text-xs font-black uppercase tracking-[0.16em] text-brand-red sm:text-sm sm:tracking-[0.24em]">
        {eyebrow}
      </p>
      <h2 className="text-balance wrap-break-word font-serif text-3xl font-black leading-tight text-brand-dark-red sm:text-4xl">
        {title}
      </h2>
      {children ? <p className="mx-auto mt-3 max-w-2xl wrap-break-word text-base leading-7 text-stone-700 sm:text-lg">{children}</p> : null}
    </div>
  )
}

export default SectionTitle
