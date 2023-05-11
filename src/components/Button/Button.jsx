import css from './Button.module.css'

const Button = function ({ text, onClick }) {
    return <button className={css.button} type="button" onClick={onClick}>{text}</button>
}

export default Button;