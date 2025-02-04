import { useTranslation } from "react-i18next"

export const OBJECT_PRODUCT_STATUS = () => {
    const {t} = useTranslation()
    return {
        "0": {
            label: t("private"),
            value: "0",
        },
        "1": {
            label: t("public"),
            value: "1",
        },
    }
}