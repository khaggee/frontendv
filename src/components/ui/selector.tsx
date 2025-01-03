interface SelectorProps {
  options: string[]
  selected: string
  onChange: (value: string) => void
  placeholder: string
}
export const Selector: React.FC<SelectorProps> = ({
  options,
  selected,
  onChange,
  placeholder,
}) => {
  return (
    <div
      style={{
        padding: '0.5rem 1rem',
        border: '1px solid var(--border)',
        borderRadius: '8px',
        backgroundColor: 'var(--background)',
        color: 'var(--text)',
      }}
    >
      <button
        value=""
        disabled
      >
        {placeholder}
      </button>
      {options.map((option) => (
        <button
          key={option}
          value={option}
        >
          {option}
        </button>
      ))}
    </div>
  )
}
