import './RoundButton.css';

const RoundButton = ({children, onClick, disabled}) => {

    return <button onClick={onClick} className="button-round" disabled={disabled}>
        {children}
    </button>

}

export default RoundButton;