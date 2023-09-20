import RoundButton from '../ui/RoundButton';
import './CardRow.css';

const CardRow = ({index, onIndexChange, fixed, onFixedChange, isShowRange, children}) => {

    return (
        <div className="card-row">
            
            {isShowRange && <div className='card__range'>
                <input type="range" min="0" max="3000" value="500" name="range" step="100"/>
            </div>}
            
            {!isShowRange && <div className="flex-row">
                <RoundButton onClick={() => onIndexChange( index - 1)} disabled={true}>{'-'}</RoundButton>
                <div className='child-wrapper'>
                    {children}
                </div>
                <RoundButton onClick={() => onIndexChange( index + 1)}>{'+'}</RoundButton>
            </div>}
            
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

export default CardRow;