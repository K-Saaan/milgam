import React, { createContext, useState } from 'react';

export const RegionContext = createContext();

/*
  * 1. FunctionName: RegionProvider
  * 2. FileName : RegionProvider.js
  * 2. Comment   : region의 상태를 하위 컴포넌트에 제공
  * 3. 작성자    : mijin
  * 4. 작성일    : 2024. 07. 11
*/
export const RegionProvider = ({ children }) => {
  const [selectedRegion, setSelectedRegion] = useState('광화문·덕수궁');

  return (
    <RegionContext.Provider value={{ selectedRegion, setSelectedRegion }}>
      {children}
    </RegionContext.Provider>
  );
};
