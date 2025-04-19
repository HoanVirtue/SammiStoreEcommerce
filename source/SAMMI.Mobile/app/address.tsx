import React, { useEffect, useMemo, useState } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    ScrollView,
    ActivityIndicator,
    StyleSheet,
    Modal,
    TextInput,
    Switch,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../stores';
import { resetInitialState } from '../stores/address';
import {
    createAddressAsync,
    getAllAddressesAsync,
    updateAddressAsync,
    deleteAddressAsync,
} from '../stores/address/action';
import { getAllProvinces } from '../services/province';
import { getAllDistricts } from '../services/district';
import { getAllWards } from '../services/ward';
import { useAuth } from '../hooks/useAuth';
import Toast from 'react-native-toast-message';
import { colors } from '@/constants/colors';

interface Address {
    id: number;
    streetAddress: string;
    wardId: number;
    customerId: number;
    wardName: string;
    districtName: string;
    provinceName: string;
    isDefault: boolean;
    isActive: boolean;
    isDelete: boolean;
}

interface AutocompleteOption {
    label: string;
    value: string | number;
}

interface AddressModalProps {
    open: boolean;
    onClose: () => void;
}

const AddressModal: React.FC<AddressModalProps> = ({ open, onClose }) => {
    const [loading, setLoading] = useState(false);
    const [activeTab, setActiveTab] = useState(1);
    const [isEdit, setIsEdit] = useState({ isEdit: false, index: 0 });
    const [wardOptions, setWardOptions] = useState<AutocompleteOption[]>([]);
    const [provinceOptions, setProvinceOptions] = useState<AutocompleteOption[]>([]);
    const [districtOptions, setDistrictOptions] = useState<AutocompleteOption[]>([]);
    const [selectedProvince, setSelectedProvince] = useState<AutocompleteOption | null>(null);
    const [selectedDistrict, setSelectedDistrict] = useState<AutocompleteOption | null>(null);
    const [addresses, setAddresses] = useState<Address[]>([]);
    const [selectedAddressId, setSelectedAddressId] = useState<number | null>(null);
    const [formData, setFormData] = useState({
        streetAddress: '',
        wardId: 0,
        wardName: '',
        districtName: '',
        provinceName: '',
        isDefault: false,
    });
    const [showProvinceSelect, setShowProvinceSelect] = useState(false);
    const [showDistrictSelect, setShowDistrictSelect] = useState(false);
    const [showWardSelect, setShowWardSelect] = useState(false);

    const { user } = useAuth();
    const dispatch: AppDispatch = useDispatch();
    const {
        isLoading,
        isSuccessCreate,
        isErrorCreate,
        errorMessageCreate,
        isSuccessUpdate,
        isErrorUpdate,
        errorMessageUpdate,
        isSuccessDelete,
        isErrorDelete,
        errorMessageDelete,
    } = useSelector((state: RootState) => state.address);

    const fetchAllProvinces = async () => {
        try {
            setLoading(true);
            const res = await getAllProvinces({
                params: { take: -1, skip: 0, paging: false, orderBy: 'name', dir: 'asc', keywords: "''", filters: '' },
            });
            const data = res?.result?.subset;
            if (data) {
                setProvinceOptions(
                    data.map((item: { name: string; id: string }) => ({
                        label: item.name,
                        value: item.id,
                    }))
                );
            }
        } catch (error) {
            Toast.show({
                type: 'error',
                text1: 'Lỗi',
                text2: 'Không thể tải danh sách tỉnh/thành phố',
            });
        } finally {
            setLoading(false);
        }
    };

    const fetchDistrictsByProvince = async (provinceId: string) => {
        try {
            setLoading(true);
            const res = await getAllDistricts({
                params: {
                    take: -1,
                    skip: 0,
                    paging: false,
                    orderBy: 'name',
                    dir: 'asc',
                    keywords: "''",
                    filters: `provinceId::${provinceId}::eq`,
                },
            });
            const data = res?.result?.subset;
            if (data) {
                setDistrictOptions(
                    data.map((item: { name: string; id: string }) => ({
                        label: item.name,
                        value: item.id,
                    }))
                );
            }
        } catch (error) {
            Toast.show({
                type: 'error',
                text1: 'Lỗi',
                text2: 'Không thể tải danh sách quận/huyện',
            });
        } finally {
            setLoading(false);
        }
    };

    const fetchWardsByDistrict = async (districtId: string) => {
        try {
            setLoading(true);
            const res = await getAllWards({
                params: {
                    take: -1,
                    skip: 0,
                    paging: false,
                    orderBy: 'name',
                    dir: 'asc',
                    keywords: "''",
                    filters: `districtId::${districtId}::eq`,
                },
            });
            const data = res?.result?.subset;
            if (data) {
                setWardOptions(
                    data.map((item: { name: string; id: string }) => ({
                        label: item.name,
                        value: item.id,
                    }))
                );
            }
        } catch (error) {
            Toast.show({
                type: 'error',
                text1: 'Lỗi',
                text2: 'Không thể tải danh sách phường/xã',
            });
        } finally {
            setLoading(false);
        }
    };

    const handleConfirmDefaultAddress = async () => {
        if (selectedAddressId === null) return;

        const currentDefaultAddress = addresses.find((addr) => addr.isDefault);
        if (currentDefaultAddress?.id === selectedAddressId) {
            onClose();
            return;
        }

        const addressToUpdate = addresses.find((addr) => addr.id === selectedAddressId);
        if (!addressToUpdate) return;

        try {
            await dispatch(
                updateAddressAsync({
                    ...addressToUpdate,
                    isDefault: true,
                })
            ).unwrap();

            setAddresses((prev) =>
                prev.map((addr) => ({
                    ...addr,
                    isDefault: addr.id === selectedAddressId,
                }))
            );
            onClose();
        } catch (error) {
            Toast.show({
                type: 'error',
                text1: 'Lỗi',
                text2: 'Không thể cập nhật địa chỉ mặc định',
            });
        }
    };

    const handleDeleteAddress = async (addressId: number) => {
        try {
            await dispatch(deleteAddressAsync(addressId)).unwrap();
            await refreshAddresses();
        } catch (error) {
            Toast.show({
                type: 'error',
                text1: 'Lỗi',
                text2: 'Không thể xóa địa chỉ',
            });
        }
    };

    const handleSubmit = async () => {
        try {
            const payload = {
                streetAddress: formData.streetAddress,
                wardId: formData.wardId,
                customerId: user?.id || 0,
                isDefault: formData.isDefault,
                isActive: true,
                isDelete: false,
            };

            if (isEdit.isEdit) {
                const address = addresses[isEdit.index];
                await dispatch(
                    updateAddressAsync({
                        ...payload,
                        id: address.id,
                    })
                ).unwrap();
            } else {
                await dispatch(
                    createAddressAsync({
                        ...payload,
                        id: 0,
                    })
                ).unwrap();
            }

            await refreshAddresses();
            resetForm();
        } catch (error) {
            Toast.show({
                type: 'error',
                text1: 'Lỗi',
                text2: 'Không thể lưu địa chỉ',
            });
        }
    };

    const refreshAddresses = async () => {
        const response = await dispatch(getAllAddressesAsync()).unwrap();
        if (response?.result) {
            setAddresses(response.result);
            const defaultAddr = response.result.find((addr: Address) => addr.isDefault);
            setSelectedAddressId(defaultAddr?.id || null);
        }
    };


    const resetForm = () => {
        setIsEdit({ isEdit: false, index: 0 });
        setActiveTab(1);
        setFormData({
            streetAddress: '',
            wardId: 0,
            wardName: '',
            districtName: '',
            provinceName: '',
            isDefault: false,
        });
        setSelectedProvince(null);
        setSelectedDistrict(null);
        setWardOptions([]);
    };

    useEffect(() => {
        if (open) {
            refreshAddresses();
            fetchAllProvinces();
        } else {
            resetForm();
            setProvinceOptions([]);
            setDistrictOptions([]);
            setWardOptions([]);
            setSelectedAddressId(null);
        }
    }, [open]);

    useEffect(() => {
        if (selectedProvince) {
            fetchDistrictsByProvince(selectedProvince.value.toString());
            setDistrictOptions([]);
            setWardOptions([]);
            setSelectedDistrict(null);
            setFormData((prev) => ({
                ...prev,
                wardId: 0,
                wardName: '',
            }));
        }
    }, [selectedProvince]);

    useEffect(() => {
        if (selectedDistrict) {
            fetchWardsByDistrict(selectedDistrict.value.toString());
            setWardOptions([]);
            setFormData((prev) => ({
                ...prev,
                wardId: 0,
                wardName: '',
            }));
        }
    }, [selectedDistrict]);

    useEffect(() => {
        if (activeTab === 2 && isEdit.isEdit && addresses[isEdit.index]) {
            const address = addresses[isEdit.index];
            setFormData({
                provinceName: address.provinceName,
                districtName: address.districtName,
                wardName: address.wardName,
                streetAddress: address.streetAddress,
                wardId: address.wardId,
                isDefault: address.isDefault,
            });

            const province = provinceOptions.find((opt) => opt.label === address.provinceName);
            if (province) {
                setSelectedProvince(province);
                fetchDistrictsByProvince(province.value.toString()).then(() => {
                    const district = districtOptions.find((opt) => opt.label === address.districtName);
                    if (district) {
                        setSelectedDistrict(district);
                        fetchWardsByDistrict(district.value.toString());
                    }
                });
            }
        }
    }, [activeTab, isEdit, addresses]);

    useEffect(() => {
        if (isSuccessCreate) {
            Toast.show({
                type: 'success',
                text1: 'Thành công',
                text2: 'Thêm địa chỉ thành công',
            });
            refreshAddresses();
            dispatch(resetInitialState());
        } else if (isErrorCreate && errorMessageCreate) {
            Toast.show({
                type: 'error',
                text1: 'Lỗi',
                text2: errorMessageCreate,
            });
            dispatch(resetInitialState());
        }
    }, [isSuccessCreate, isErrorCreate, errorMessageCreate]);

    useEffect(() => {
        if (isSuccessUpdate) {
            Toast.show({
                type: 'success',
                text1: 'Thành công',
                text2: 'Cập nhật địa chỉ thành công',
            });
            refreshAddresses();
            dispatch(resetInitialState());
        } else if (isErrorUpdate && errorMessageUpdate) {
            Toast.show({
                type: 'error',
                text1: 'Lỗi',
                text2: errorMessageUpdate,
            });
            dispatch(resetInitialState());
        }
    }, [isSuccessUpdate, isErrorUpdate, errorMessageUpdate]);

    useEffect(() => {
        if (isSuccessDelete) {
            Toast.show({
                type: 'success',
                text1: 'Thành công',
                text2: 'Xóa địa chỉ thành công',
            });
            refreshAddresses();
            dispatch(resetInitialState());
        } else if (isErrorDelete && errorMessageDelete) {
            Toast.show({
                type: 'error',
                text1: 'Lỗi',
                text2: errorMessageDelete,
            });
            dispatch(resetInitialState());
        }
    }, [isSuccessDelete, isErrorDelete, errorMessageDelete]);


    return (
        <Modal visible={open} animationType="slide" transparent>
            <View style={styles.modalContainer}>
                <View style={styles.modalContent}>
                    {(isLoading || loading) && (
                        <View style={styles.loadingContainer}>
                            <ActivityIndicator size="large" color={colors.primary} />
                        </View>
                    )}

                    <View style={styles.header}>
                        <Text style={styles.headerTitle}>
                            {activeTab === 1 ? 'Địa chỉ giao hàng' : isEdit.isEdit ? 'Cập nhật địa chỉ' : 'Thêm địa chỉ'}
                        </Text>
                        <TouchableOpacity onPress={onClose} style={styles.closeButton}>
                            <Text style={styles.closeButtonText}>×</Text>
                        </TouchableOpacity>
                    </View>

                    <ScrollView style={styles.content}>
                        {activeTab === 1 ? (
                            <View>
                                {addresses.length > 0 ? (
                                    <View>
                                        <Text style={styles.sectionTitle}>Địa chỉ</Text>
                                        {addresses.map((address) => (
                                            <View key={address.id} style={styles.addressItem}>
                                                <TouchableOpacity
                                                    style={styles.radioButton}
                                                    onPress={() => setSelectedAddressId(address.id)}
                                                >
                                                    <View
                                                        style={[
                                                            styles.radioCircle,
                                                            selectedAddressId === address.id && styles.radioCircleSelected,
                                                        ]}
                                                    />
                                                    <View style={styles.addressInfo}>
                                                        <Text style={styles.addressText}>
                                                            {`${address.streetAddress}, ${address.wardName}, ${address.districtName}, ${address.provinceName}`}
                                                        </Text>
                                                        {address.isDefault && (
                                                            <View style={styles.defaultBadge}>
                                                                <Text style={styles.defaultBadgeText}>Mặc định</Text>
                                                            </View>
                                                        )}
                                                    </View>
                                                </TouchableOpacity>
                                                <View style={styles.addressActions}>
                                                    <TouchableOpacity
                                                        style={[styles.actionButton, styles.updateButton]}
                                                        onPress={() => {
                                                            setActiveTab(2);
                                                            setIsEdit({ isEdit: true, index: addresses.findIndex((addr) => addr.id === address.id) });
                                                        }}
                                                    >
                                                        <Text style={styles.actionButtonText}>Cập nhật</Text>
                                                    </TouchableOpacity>
                                                    <TouchableOpacity
                                                        style={[styles.actionButton, styles.deleteButton, addresses.length === 1 && styles.disabledButton]}
                                                        onPress={() => handleDeleteAddress(address.id)}
                                                        disabled={addresses.length === 1}
                                                    >
                                                        <Text style={[styles.actionButtonText, styles.deleteButtonText]}>Xóa</Text>
                                                    </TouchableOpacity>
                                                </View>
                                            </View>
                                        ))}
                                    </View>
                                ) : (
                                    <View style={styles.noDataContainer}>
                                        <Text style={styles.noDataText}>Không có địa chỉ giao hàng</Text>
                                    </View>
                                )}
                                <TouchableOpacity
                                    style={[styles.addButton, addresses.length >= 3 && styles.disabledButton]}
                                    disabled={addresses.length >= 3}
                                    onPress={() => {
                                        setActiveTab(2);
                                        setIsEdit({ isEdit: false, index: 0 });
                                    }}
                                >
                                    <Text style={styles.addButtonText}>Thêm địa chỉ</Text>
                                </TouchableOpacity>
                            </View>
                        ) : (
                            <View style={styles.formContainer}>
                                <View style={styles.formGroup}>
                                    <Text style={styles.label}>Tỉnh/Thành phố</Text>
                                    <View style={styles.selectWrapper}>
                                        <TouchableOpacity
                                            style={styles.select}
                                            onPress={() => {
                                                setShowProvinceSelect(true);
                                            }}
                                        >
                                            <Text style={[styles.selectText, !selectedProvince && styles.placeholderText]}>
                                                {selectedProvince ? selectedProvince.label : 'Chọn tỉnh/thành phố'}
                                            </Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>

                                <View style={styles.formGroup}>
                                    <Text style={styles.label}>Quận/Huyện</Text>
                                    <View style={styles.selectWrapper}>
                                        <TouchableOpacity
                                            style={[styles.select, !selectedProvince && styles.disabledSelect]}
                                            disabled={!selectedProvince}
                                            onPress={() => {
                                                setShowDistrictSelect(true);
                                            }}
                                        >
                                            <Text style={[styles.selectText, !selectedDistrict && styles.placeholderText]}>
                                                {selectedDistrict ? selectedDistrict.label : 'Chọn quận/huyện'}
                                            </Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>

                                <View style={styles.formGroup}>
                                    <Text style={styles.label}>Phường/Xã</Text>
                                    <View style={styles.selectWrapper}>
                                        <TouchableOpacity
                                            style={[styles.select, !selectedDistrict && styles.disabledSelect]}
                                            disabled={!selectedDistrict}
                                            onPress={() => {
                                                setShowWardSelect(true);
                                            }}
                                        >
                                            <Text style={[styles.selectText, !formData.wardId && styles.placeholderText]}>
                                                {formData.wardName || 'Chọn phường/xã'}
                                            </Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>

                                <View style={styles.formGroup}>
                                    <Text style={styles.label}>Địa chỉ cụ thể</Text>
                                    <TextInput
                                        style={styles.input}
                                        value={formData.streetAddress}
                                        onChangeText={(text) =>
                                            setFormData((prev) => ({
                                                ...prev,
                                                streetAddress: text,
                                            }))
                                        }
                                        placeholder="Nhập địa chỉ cụ thể"
                                    />
                                </View>

                                <View style={styles.formGroup}>
                                    <View style={styles.switchContainer}>
                                        <Text style={styles.label}>Đặt làm địa chỉ mặc định</Text>
                                        <Switch
                                            value={formData.isDefault}
                                            onValueChange={(value) =>
                                                setFormData((prev) => ({
                                                    ...prev,
                                                    isDefault: value,
                                                }))
                                            }
                                        />
                                    </View>
                                </View>
                            </View>
                        )}
                    </ScrollView>

                    <View style={styles.footer}>
                        {activeTab === 2 && (
                            <TouchableOpacity style={styles.cancelButton} onPress={resetForm}>
                                <Text style={styles.cancelButtonText}>Hủy</Text>
                            </TouchableOpacity>
                        )}
                        <TouchableOpacity
                            style={styles.confirmButton}
                            onPress={() => (activeTab === 2 ? handleSubmit() : handleConfirmDefaultAddress())}
                        >
                            <Text style={styles.confirmButtonText}>
                                {activeTab === 2 ? (isEdit.isEdit ? 'Lưu' : 'Thêm') : 'Xác nhận'}
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>

            <Modal visible={showProvinceSelect} transparent animationType="slide">
                <View style={styles.selectionModal}>
                    <View style={styles.selectionContent}>
                        <View style={styles.selectionHeader}>
                            <Text style={styles.selectionTitle}>Chọn tỉnh/thành phố</Text>
                            <TouchableOpacity onPress={() => setShowProvinceSelect(false)}>
                                <Text style={styles.closeText}>Đóng</Text>
                            </TouchableOpacity>
                        </View>
                        <ScrollView>
                            {provinceOptions.map((option) => (
                                <TouchableOpacity
                                    key={option.value}
                                    style={styles.selectionItem}
                                    onPress={() => {
                                        setSelectedProvince(option);
                                        setFormData((prev) => ({
                                            ...prev,
                                            provinceName: option.label,
                                        }));
                                        setShowProvinceSelect(false);
                                    }}
                                >
                                    <Text style={styles.selectionItemText}>{option.label}</Text>
                                </TouchableOpacity>
                            ))}
                        </ScrollView>
                    </View>
                </View>
            </Modal>

            <Modal visible={showDistrictSelect} transparent animationType="slide">
                <View style={styles.selectionModal}>
                    <View style={styles.selectionContent}>
                        <View style={styles.selectionHeader}>
                            <Text style={styles.selectionTitle}>Chọn quận/huyện</Text>
                            <TouchableOpacity onPress={() => setShowDistrictSelect(false)}>
                                <Text style={styles.closeText}>Đóng</Text>
                            </TouchableOpacity>
                        </View>
                        <ScrollView>
                            {districtOptions.map((option) => (
                                <TouchableOpacity
                                    key={option.value}
                                    style={styles.selectionItem}
                                    onPress={() => {
                                        setSelectedDistrict(option);
                                        setFormData((prev) => ({
                                            ...prev,
                                            districtName: option.label,
                                        }));
                                        setShowDistrictSelect(false);
                                    }}
                                >
                                    <Text style={styles.selectionItemText}>{option.label}</Text>
                                </TouchableOpacity>
                            ))}
                        </ScrollView>
                    </View>
                </View>
            </Modal>

            <Modal visible={showWardSelect} transparent animationType="slide">
                <View style={styles.selectionModal}>
                    <View style={styles.selectionContent}>
                        <View style={styles.selectionHeader}>
                            <Text style={styles.selectionTitle}>Chọn phường/xã</Text>
                            <TouchableOpacity onPress={() => setShowWardSelect(false)}>
                                <Text style={styles.closeText}>Đóng</Text>
                            </TouchableOpacity>
                        </View>
                        <ScrollView>
                            {wardOptions.map((option) => (
                                <TouchableOpacity
                                    key={option.value}
                                    style={styles.selectionItem}
                                    onPress={() => {
                                        setFormData((prev) => ({
                                            ...prev,
                                            wardId: Number(option.value),
                                            wardName: option.label,
                                        }));
                                        setShowWardSelect(false);
                                    }}
                                >
                                    <Text style={styles.selectionItemText}>{option.label}</Text>
                                </TouchableOpacity>
                            ))}
                        </ScrollView>
                    </View>
                </View>
            </Modal>
        </Modal>
    );
};

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContent: {
        backgroundColor: '#fff',
        borderRadius: 15,
        width: '90%',
        maxHeight: '80%',
        padding: 20,
    },
    loadingContainer: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(255, 255, 255, 0.7)',
        zIndex: 1,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
        position: 'relative',
    },
    headerTitle: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    closeButton: {
        position: 'absolute',
        right: -10,
        top: -10,
        width: 30,
        height: 30,
        borderRadius: 15,
        backgroundColor: '#f0f0f0',
        justifyContent: 'center',
        alignItems: 'center',
    },
    closeButtonText: {
        fontSize: 24,
        color: '#666',
    },
    content: {
        // flex: 1,
    },
    sectionTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 10,
        color: '#333',
    },
    addressItem: {
        marginBottom: 15,
        borderWidth: 1,
        borderColor: '#fff',
        borderRadius: 8,
        padding: 10,
    },
    radioButton: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    radioCircle: {
        width: 20,
        height: 20,
        borderRadius: 10,
        borderWidth: 2,
        borderColor: colors.primary,
        marginRight: 10,
    },
    radioCircleSelected: {
        backgroundColor: colors.primary,
        borderColor: colors.primary,
    },
    addressInfo: {
        flex: 1,
    },
    addressText: {
        fontSize: 14,
        color: '#333',
    },
    defaultBadge: {
        backgroundColor: colors.primary,
        paddingHorizontal: 8,
        paddingVertical: 2,
        borderRadius: 4,
        alignSelf: 'flex-start',
        marginTop: 5,
    },
    defaultBadgeText: {
        color: '#fff',
        fontSize: 12,
    },
    addressActions: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        marginTop: 10,
    },
    actionButton: {
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 4,
        backgroundColor: '#f0f0f0',
        marginLeft: 10,
    },
    actionButtonText: {
        color: '#333',
    },
    deleteButton: {
        backgroundColor: '#ff3b30',
    },
    deleteButtonText: {
        color: '#fff',
    },
    updateButton: {
        backgroundColor: '#ffd6e7',
    },
    noDataContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    noDataText: {
        fontSize: 16,
        color: '#666',
    },
    addButton: {
        backgroundColor: colors.primary,
        padding: 8,
        borderRadius: 8,
        alignItems: 'center',
        width: 120,
        marginTop: 20,
    },
    addButtonText: {
        color: '#fff',
        fontSize: 14,
        fontWeight: 'bold',
    },
    disabledButton: {
        backgroundColor: '#ccc',
    },
    formContainer: {
        padding: 10,
    },
    formGroup: {
        marginBottom: 15,
    },
    label: {
        fontSize: 14,
        fontWeight: 'bold',
        marginBottom: 5,
        color: '#333',
    },
    selectWrapper: {
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 4,
        marginBottom: 5,
    },
    select: {
        padding: 12,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    selectText: {
        fontSize: 14,
        color: '#333',
    },
    placeholderText: {
        color: '#999',
    },
    disabledSelect: {
        backgroundColor: '#f5f5f5',
    },
    selectionModal: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'flex-end',
    },
    selectionContent: {
        backgroundColor: '#fff',
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
        maxHeight: '80%',
    },
    selectionHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
    selectionTitle: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    closeText: {
        color: colors.primary,
        fontSize: 16,
    },
    selectionItem: {
        padding: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
    selectionItemText: {
        fontSize: 14,
        color: '#333',
    },
    switchContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
        gap: 10,
        marginTop: 20,
    },
    cancelButton: {
        padding: 12,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#ddd',
    },
    cancelButtonText: {
        color: '#333',
        fontSize: 16,
    },
    confirmButton: {
        backgroundColor: colors.primary,
        padding: 12,
        borderRadius: 8,
    },
    confirmButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    input: {
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 4,
        padding: 10,
        fontSize: 14,
    },
});

export default AddressModal;