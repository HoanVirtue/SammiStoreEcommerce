import { useEffect, useState } from "react";

// Generic type để hỗ trợ cả giá trị đơn và mảng
const useDebounce = <T>(value: T, delay: number): T => {
    const [debouncedValue, setDebouncedValue] = useState<T>(value);

    useEffect(() => {
        const timerRef = setTimeout(() => {
            setDebouncedValue(value);
        }, delay);

        return () => {
            clearTimeout(timerRef);
        };
    }, [value, delay]);

    return debouncedValue;
};

export { useDebounce };