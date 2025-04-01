import { getAllPaymentMethods } from "@/src/services/payment-method";
import { Text, View } from "react-native";
import { useEffect, useState } from "react";
export default function Index() {
  const [paymentMethods, setPaymentMethods] = useState([])
  const paymentMethod = async () => {
    try {
      const res = await getAllPaymentMethods({
        params: {
          take: -1,
          skip: 0,
          paging: false,
          orderBy: "name",
          dir: "asc",
          keywords: "''",
          filters: ""
        }
      })
      console.log(res)
      setPaymentMethods(res?.result?.subset)
    } catch (error) {
      console.error('Payment method fetch error:', error)
      // Handle error appropriately, maybe set an error state
    }
  }
  useEffect(() => {
    paymentMethod()
  }, [])

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>Edit app/index.tsx to edit this screen.</Text>
      {paymentMethods?.map((item: any) => (
        <Text key={item.id}>{item.name}</Text>
      ))}
    </View>
  );
}
