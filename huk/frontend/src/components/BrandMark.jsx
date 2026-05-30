function BrandMark({ compact = false }) {
  return (
    <div className={`brand-mark ${compact ? 'brand-mark-compact' : ''}`} aria-label="Hukmilane Lanecha Raja">
      <div className="brand-turban" />
      <div className="brand-tripund" />
      <div className="brand-text">
        <span>हुकमिले लेनचा</span>
        <strong>राजा</strong>
      </div>
      <div className="brand-flower" />
    </div>
  )
}

export default BrandMark
