import React, { useCallback, useState, useMemo, useEffect } from "react";
import "./App.css";

import { useQuery } from "@apollo/client";

import { ANTIFILTER_INFO } from "./Queries/antifilter_Info";
import { TARIFF_IN_ANTI_FILTER } from "./Queries/tariffIn_Anti_Filter";

import Button from "./components/ui/RoundButton";
import Checkbox from "./components/ui/Checkbox";
import SectionTitle from "./components/elements/SectionTitle";
import Card from "./components/blocks/Card";

const regionUrl = "moskva";

function App() {
  const [providerId, setProviderId] = useState(null);
  const [fixProvider, setFixProvider] = useState(false);
  const [priceTariff, setPriceTariff] = useState(null);
  const [fixPrice, setFixPrice] = useState(false);
  const [callsTariff, setCallsTariff] = useState(null);
  const [fixCalls, setFixCalls] = useState(false);
  const [internetTariff, setInternetTariff] = useState(null);
  const [fixInternet, setFixInternet] = useState(false);
  const [switchTariff, setSwitchTariff] = useState(null);

  const getFix = () => {
    let arrFixName = ["provider", "internet", "calls", "price"];
    let objFixState = {
      provider: fixProvider,
      internet: fixInternet,
      calls: fixCalls,
      price: fixPrice,
    };
    let result = "";
    arrFixName.forEach((state) => {
      if (objFixState[state] === true) {
        if (result.length > 0) {
          result += `&${state}`;
        } else {
          result += state;
        }
      }
    });
    return result;
  };

  const fix = getFix();

  const {
    loading,
    error,
    data: InfoData,
  } = useQuery(ANTIFILTER_INFO, {
    variables: {
      type: "antifilter",
    },
    skip: false,
  });

  const {
    loading: loadTariff,
    error: errorTariff,
    data: tariffData,
    previousData: tariffPreviousData,
  } = useQuery(TARIFF_IN_ANTI_FILTER, {
    variables: {
      region: regionUrl,
      providerJoin: true,
      with_aggregate: true,
      providerId: providerId,
      internet: internetTariff,
      fix: fix,
      price: priceTariff,
      switch: switchTariff,
      calls: callsTariff,
    },
    skip: false,
  });

  // console.log("InfoData", InfoData);
   console.log("tariffData", tariffData);

  const [tariffIndex, setTariffIndex] = useState(0);

  const tariffIds = useMemo(() => {
    const a = tariffData?.tariffInAntiFilter.aggregationTariffs.providers || [];
    return a.map(p => p.id);
  }, [tariffData]);

  const selectedTariffId = useMemo(() => tariffIds[tariffIndex], [tariffIndex, tariffIds]);

  console.log(selectedTariffId, tariffIndex);

  const [ internetIndex, setInternetIndex] = useState(0);
  const [ callsIndex, setCallsIndex] = useState(0);
  const [ priceIndex, setPriceIndex] = useState(0);

  useEffect(() => {
    console.log('new tariff id', selectedTariffId);
    if (selectedTariffId) {
      setProviderId(selectedTariffId);
    }
    // setProviderId(selectedTariffId); // todo: check range
  }, [selectedTariffId]);

  return (
    <div className="App">
      <SectionTitle text='выберите свой тариф'/>
      <div dangerouslySetInnerHTML={{__html: InfoData?.infoText.text}}>
      </div>
      <Card
        providerFixed={fixProvider}
        onFixProviderChange={setFixProvider}
        tariffData={tariffData}
        providerIndex={tariffIndex}
        onProviderIndexChange={setTariffIndex}
        internetIndex={internetIndex}
        onInternetIndexChange={setInternetIndex}
        internetFixed={fixInternet}
        onFixInternetChange={setFixInternet}
        callsIndex={callsIndex}
        onCallsIndexChange={setCallsIndex}
        callsFixed={fixCalls}
        onFixCallsChange={setFixCalls}
        priceIndex={priceIndex}
        onPriceIndexChange={setPriceIndex}
        priceFixed={fixPrice}
        onFixPriceChange={setFixPrice}
      />
    </div>
  );
}

export default App;
