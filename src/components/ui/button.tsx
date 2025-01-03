// interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
//     label?: string
//   }
//   export const Input = ({ label, ...props }: InputProps) => (
//     <div
//       style={{
//         display: 'flex',
//         flexDirection: 'column',
//         margin: '1rem',
//         gap: '1rem',
//       }}
//     >
//       {label && (
//         <label
//           style={{
//             display: 'flex',
//             flexDirection: 'column',
//           }}
//         >
//           {label}
//         </label>
//       )}
//       <input
//         className="input"
//         {...props}
//       />
//     </div>
//   )

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {}
export const Button: React.FC<ButtonProps> = ({
  children,
  style,
  ...props
}) => {
  return (
    <button
      className="button"
      style={{
        ...style,
      }}
      {...props}
    >
      {children}
    </button>
  )
}
