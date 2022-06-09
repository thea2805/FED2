import './style.css'

const LabelInput = ({type, name, value, placeholderText, onChange, labelFor, labelText}) => {
    return (
        <div >
            <label htmlFor={labelFor}>{labelText}</label>
            <input className='labelInputSet' type={type} name={name} value={value} placeholder={placeholderText} onChange={onChange}></input>
        </div>
    )
}

export default LabelInput;