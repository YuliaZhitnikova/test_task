import './MainButton.css';

const MainButton = ({children, onClick}) => {
    return <button onClick={onClick} className="button-main">
        {children}
    </button>

}

export default MainButton;