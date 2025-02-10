import { createContext, useContext, useState } from "react";
import promotionApi from "../../api/promotionApi";

const PromotionContext = createContext();

function PromotionContextProvider({ children }) {
  const [PPList, setPPList] = useState([]);
  const [Vlist, setVlist] = useState([]);
  const [MPList, setMPList] = useState([]);

  // function
  const promotionFunc = {
    loadAllPromotion: async () => {
      let res = await promotionApi.getAllOnActive();
    },
  };

  // load tất cả khuyến mãi dang có
  // promotionFunc.loadAllPromotion();

  const PromotionContextData = {};

  return (
    <PromotionContext.Provider value={PromotionContextData}>
      {children}
    </PromotionContext.Provider>
  );
}

export default PromotionContextProvider;
export function usePromotionContext() {
  return useContext(PromotionContext);
}
