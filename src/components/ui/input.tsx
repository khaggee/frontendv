interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  containerstyle?: React.CSSProperties
  icon?: React.ReactNode
}
export const Input: React.FC<InputProps> = ({ label, style, ...props }) => (
  <div
    style={{
      display: 'flex',
      flexDirection: 'column',
      gap: '0.25rem',
      ...props.containerstyle,
    }}
  >
    {label && (
      <label
        style={{
          display: 'flex',
          flexDirection: 'column',
          fontSize: '14px',
        }}
      >
        {label}
      </label>
    )}
    <div
      style={{
        position: 'relative',
      }}
    >
      <div
        style={{
          display: props.icon ? 'flex' : 'none',
          position: 'absolute',
          top: '50%',
          left: '1rem',
          transform: 'translateY(-50%)',
        }}
      >
        {props.icon}
      </div>
      <input
        className="input"
        style={{
          ...style,
          ...(props.icon ? { paddingLeft: '3rem' } : {}),
        }}
        {...props}
      />
    </div>
  </div>
)
