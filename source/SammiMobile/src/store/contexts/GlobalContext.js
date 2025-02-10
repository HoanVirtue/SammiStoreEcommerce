import { createContext, useContext, useState } from "react";
import store from "..";
import authApi from "../../api/authApi";
import userApi from "../../api/userApi";
import cateApi from "../../api/cateApi";
import connectSocketIo from "../../socket";
import { useRef } from "react";
import { useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const GlobalContext = createContext();

function GlobalContextProvider({ children }) {
  //dataTest
  const [state, setState] = useState({
    isLogin: false,
    account: {},

    token: null,
  });

  const [categories, setCategories] = useState([]);
  const [isShowQr, setIsShowQr] = useState(false);
  let socket = useRef(null);

  const [loadingModalState, setLoadingModalState] = useState({
    visible: false,
    label: "Đang tải...",
  });

  useEffect(() => {
    if (state.isLogin) {
      socket.current = connectSocketIo();
    } else {
      socket.current = null;
    }
    return () => {};
  }, [state.isLogin]);

  // function
  const globalFunc = {
    setIsShowQr: (is) => {
      setIsShowQr(is);
    },
    // login by phone
    login: async (phone) => {
      setLoadingModalState({
        visible: true,
        label: "Đang đăng nhập...",
      });

      let res = await userApi.getOrCreateByPhone(phone);

      if (res.isSuccess) {
        await AsyncStorage.setItem("phone", phone);
        setState({
          isLogin: true,
          account: res.customer,
        });
      } else {
        console.log("cos loi xay ra");
      }
      setLoadingModalState({
        visible: false,
      });
    },

    logOut: () => {
      AsyncStorage.removeItem("phone");
      setState({
        isLogin: false,
        account: null,
        token: null,
      });
    },
    refresh: async () => {},

    setLoadingModalState(visible, title) {
      setLoadingModalState({
        visible: visible,
        title: title || loadingModalState.title,
      });
    },
  };

  async function refreshAccount() {
    let res = await userApi.getOrCreateByPhone(state.account.phonenumber);

    if (res.isSuccess) {
      setState({
        ...state,
        account: res.customer,
      });
    } else {
      console.log("cos loi xay ra");
    }
  }

  const GlobalContextData = {
    isLogin: state.isLogin,
    account: state.account,
    token: state.token,
    loadingModalState,
    globalFunc,
    categories,
    isShowQr,
    socket: socket.current,
    refreshAccount,
  };

  return (
    <GlobalContext.Provider value={GlobalContextData}>
      {children}
    </GlobalContext.Provider>
  );
}

export default GlobalContextProvider;
export function useGlobalContext() {
  return useContext(GlobalContext);
}
