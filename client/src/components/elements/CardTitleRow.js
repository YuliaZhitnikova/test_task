import RoundButton from '../ui/RoundButton';
import './CardTitleRow.css';

const CardTitleRow = ({index, onIndexChange, fixed, onFixedChange, children}) => {
    return (
        <div className="card-row">
            <div className="flex-row">
                <RoundButton onClick={() => onIndexChange( index - 1)}>{'<'}</RoundButton>
                <div className='child-wrapper'>
                    {children}
                </div>
                <RoundButton onClick={() => onIndexChange( index + 1)}>{'>'}</RoundButton>
            </div>
            <label className='container'>
            зафиксировать
            <input 
                type="checkbox"
                checked={fixed} 
                onChange={(event) => onFixedChange( event.target.value)} 
            />
            <span class="checkmark"></span>
            </label>
        </div>
    )

}

export default CardTitleRow;