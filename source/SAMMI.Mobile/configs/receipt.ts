
export const RECEIPT_STATUS = () => {
    return {
        "0": {
            label: "Bản nháp",
            value: "0",
        },
        "1": {
            label: "Chờ xử lý",
            value: "1",
        },
        "2": {
            label: "Đã duyệt",
            value: "2",
        },
        "3": {
            label: "Đang xử lý",
            value: "3",
        },
        "4": {
            label: "Đã hoàn thành",
            value: "4",
        },
        "5": {
            label: "Đã hủy",
            value: "5",
        },
    }
}

export const getReceiptStatusLabel = (status: string) => {
    const statusMap: { [key: string]: string } = {
        "Draft": "0",
        "PendingApproval": "1",
        "Approved": "2",
        "Processing": "3",
        "Completed": "4",
        "Canceled": "5"
    };
    const statusOptions = RECEIPT_STATUS();
    const mappedValue = statusMap[status];
    return mappedValue ? statusOptions[mappedValue as keyof typeof statusOptions]?.label : status;
} 