import { useQuery } from "@apollo/client";
import { TARIFF_IN_ANTI_FILTER } from "../../Queries/tariffIn_Anti_Filter";
import { useMemo } from "react";
import CardRow from "../elements/CardRow";
import CardTitleRow from "../elements/CardTitleRow";
import MainButton from "../ui/MainButton";
import Unlimited from "../elements/Unlimited";

import './Card.css';

const Card = ({
    providerIndex,
    tariffData, 
    providerFixed, 
    onFixProviderChange, 
    onProviderIndexChange, 
    internetIndex, 
    onInternetIndexChange, 
    internetFixed, 
    onFixInternetChange, 
    callsIndex, 
    onCallsIndexChange, 
    callsFixed, 
    onFixCallsChange,
    priceIndex,
    onPriceIndexChange,
    priceFixed,
    onFixPriceChange,
}) => {
    const internetArray = useMemo(() => tariffData?.tariffInAntiFilter?.aggregationTariffs?.internet, [tariffData]);
    const callsArray = useMemo(() => tariffData?.tariffInAntiFilter?.aggregationTariffs?.calls, [tariffData]);
    const priceArray = useMemo(() => tariffData?.tariffInAntiFilter?.aggregationTariffs?.price, [tariffData]);
    return (
        <div className="card">
            <h3 className="card__title">Свой тариф</h3>
            <CardTitleRow  
                index={providerIndex} 
                onIndexChange={onProviderIndexChange} 
                fixed={providerFixed} 
                onFixedChange={onFixProviderChange}
            >
                <img src={`https://${tariffData?.tariffInAntiFilter?.data?.provider?.logo}`} alt='logo' />
            </CardTitleRow>
            <CardRow 
                index={internetIndex} 
                onIndexChange={onInternetIndexChange} 
                fixed={internetFixed} 
                onFixedChange={onFixInternetChange}
                isShowRange={true}
            >
                {internetArray?.[internetIndex]}
                <span>гб</span>
            </CardRow>
            <CardRow 
                index={callsIndex} 
                onIndexChange={onCallsIndexChange} 
                fixed={callsFixed} 
                onFixedChange={onFixCallsChange}
            >
                {callsArray?.[callsIndex]}
                <span>мин</span>
            </CardRow>
            <CardRow 
                index={priceIndex} 
                onIndexChange={onPriceIndexChange} 
                fixed={priceFixed} 
                onFixedChange={onFixPriceChange}
            >
                {priceArray?.[priceIndex]}
                <span>руб/мес</span>
            </CardRow>
            <Unlimited/>
            <MainButton>Подробнее</MainButton>
            
        </div>
    )

}

export default Card;