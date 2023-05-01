import { useField, ErrorMessage } from 'formik'

import './../../css/input.css'

const Input = ({className, icon, ...props }) => {
  const [field, meta] = useField(props)
  return (
    <div className={`user-input-wrp ${className ? className : ''}`}>
      <br />
      {icon}
      <input
        type={field.type}
        name={field.name}
        {...field}
        {...props}
        className="inputText"
      />
      {meta.touched && meta.error && (
        <span className="error_form">
          {meta.touched && meta.error && <ErrorMessage name={field.name} />}
        </span>
      )}
      <span className="floating-label">{field.name}</span>
    </div>
  )
}

export default Input