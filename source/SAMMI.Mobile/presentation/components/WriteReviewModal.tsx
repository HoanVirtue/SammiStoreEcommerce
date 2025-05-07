import { useEffect, useState } from "react"
import { View, Text, TouchableOpacity, StyleSheet, Modal, Image, TextInput, Platform } from "react-native"
import { Rating } from 'react-native-ratings'
import { useForm, Controller } from "react-hook-form"
import * as yup from 'yup'
import { yupResolver } from "@hookform/resolvers/yup"
import { Picker } from '@react-native-picker/picker'
import * as ImagePicker from 'expo-image-picker'
import { TOrderDetail } from "@/types/order"
import { AppDispatch, RootState } from "@/stores"
import { useDispatch, useSelector } from "react-redux"
import { convertBase64 } from "@/utils"
import { createReviewAsync } from "@/stores/review/action"
import { Resolver } from "react-hook-form"
import Toast from "react-native-toast-message"

interface TWriteReviewModal {
    open: boolean
    onClose: () => void
    orderId: number
    orderDetails: TOrderDetail[]
}

type TDefaultValues = {
    comment?: string,
    rating: number,
    productId: number
}

const WriteReviewModal = (props: TWriteReviewModal) => {
    const [imageFile, setImageFile] = useState<File | null>(null)
    const [imagePreview, setImagePreview] = useState<string | null>(null)

    const { open, onClose, orderId, orderDetails } = props
    const dispatch: AppDispatch = useDispatch()
    const { isSuccessCreate } = useSelector((state: RootState) => state.review)

    const schema = yup.object().shape({
        comment: yup.string().optional(),
        rating: yup.number().required('Số sao không được để trống'),
        productId: yup.number().required('Sản phẩm không được để trống'),
    })

    const defaultValues: TDefaultValues = {
        comment: undefined,
        rating: 0,
        productId: orderDetails[0]?.productId || 0
    }

    const { handleSubmit, control, formState: { errors }, reset } = useForm<TDefaultValues>({
        defaultValues,
        mode: 'onChange',
        resolver: yupResolver(schema) as Resolver<TDefaultValues>
    })

    const handleImageUpload = async () => {
        try {
            const result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsEditing: true,
                aspect: [4, 3],
                quality: 1,
            })

            if (!result.canceled) {
                const base64WithPrefix = await convertBase64(result.assets[0] as unknown as File)
                const base64 = base64WithPrefix.split(",")[1]
                setImageFile(result.assets[0] as any)
                setImagePreview(result.assets[0].uri)
            }
        } catch (error) {
            console.error('Error uploading image:', error)
        }
    }


    const onSubmit = (data: TDefaultValues) => {
        if (!Object.keys(errors)?.length) {
            const formData = {
                productId: data.productId,
                orderId: orderId,
                rating: data?.rating,
                comment: data?.comment ?? "",
            }



            if (imageFile) {
                const imageCommand = {
                    imageUrl: "",
                    imageBase64: imagePreview?.split(",")[1] || "",
                    publicId: "''",
                    typeImage: "image/jpeg",
                    value: "main"
                }
                dispatch(createReviewAsync({
                    ...formData,
                    imageCommand
                }))
                .then((res) => {
                    if (res?.payload?.isSuccess) {
                        Toast.show({
                            type: 'success',
                            text1: 'Đánh giá sản phẩm thành công',
                            text2: ''
                        })
                        onClose()
                    }
                })
            } else {
                dispatch(createReviewAsync(formData))
                .then((res) => {
                    if (res?.payload?.isSuccess) {
                        Toast.show({
                            type: 'success',
                            text1: 'Đánh giá sản phẩm thành công',
                            text2: ''
                        })
                        onClose()
                    }
                })
            }
        }
    }

    useEffect(() => {
        if (!open) {
            reset({ ...defaultValues })
            setImageFile(null)
            setImagePreview(null)
        }
    }, [open])

    return (
        <Modal
            visible={open}
            animationType="slide"
            transparent={true}
            onRequestClose={onClose}
        >
            <View style={styles.modalOverlay}>
                <View style={styles.modalContent}>
                    <View style={styles.header}>
                        <Text style={styles.title}>Đánh giá sản phẩm</Text>
                        <TouchableOpacity onPress={onClose}>
                            <Text style={styles.closeButton}>✕</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.form}>
                        <View style={styles.formGroup}>
                            <Text style={styles.label}>Chọn sản phẩm</Text>
                            <Controller
                                control={control}
                                name="productId"
                                render={({ field: { onChange, value } }) => (
                                    <View style={styles.pickerContainer}>
                                        <Picker
                                            selectedValue={value}
                                            onValueChange={onChange}
                                            style={styles.picker}
                                        >
                                            {orderDetails.map((item) => (
                                                <Picker.Item 
                                                    key={item.productId} 
                                                    label={item.productName} 
                                                    value={item.productId}
                                                />
                                            ))}
                                        </Picker>
                                    </View>
                                )}
                            />
                            {errors.productId && (
                                <Text style={styles.errorText}>{errors.productId.message}</Text>
                            )}
                        </View>

                        <View style={styles.formGroup}>
                            <Text style={styles.label}>Đánh giá</Text>
                            <Controller
                                control={control}
                                name="rating"
                                render={({ field: { onChange, value } }) => (
                                    <Rating
                                        type="star"
                                        ratingCount={5}
                                        imageSize={30}
                                        onFinishRating={onChange}
                                        style={styles.rating}
                                        startingValue={value}
                                    />
                                )}
                            />
                            {errors.rating && (
                                <Text style={styles.errorText}>{errors.rating.message}</Text>
                            )}
                        </View>

                        <View style={styles.formGroup}>
                            <Text style={styles.label}>Nội dung đánh giá</Text>
                            <Controller
                                control={control}
                                name="comment"
                                render={({ field: { onChange, value } }) => (
                                    <TextInput
                                        style={styles.textInput}
                                        multiline
                                        numberOfLines={4}
                                        onChangeText={onChange}
                                        value={value}
                                        placeholder="Nhập nội dung đánh giá"
                                    />
                                )}
                            />
                            {errors.comment && (
                                <Text style={styles.errorText}>{errors.comment.message}</Text>
                            )}
                        </View>

                        <View style={styles.formGroup}>
                            <Text style={styles.label}>Tải ảnh</Text>
                            <TouchableOpacity 
                                style={styles.imageUploadButton}
                                onPress={handleImageUpload}
                            >
                                {imagePreview ? (
                                    <Image 
                                        source={{ uri: imagePreview }}
                                        style={styles.previewImage}
                                    />
                                ) : (
                                    <Text style={styles.uploadText}>Kéo thả ảnh</Text>
                                )}
                            </TouchableOpacity>
                        </View>

                        <View style={styles.buttonContainer}>
                            <TouchableOpacity 
                                style={[styles.button, styles.cancelButton]}
                                onPress={onClose}
                            >
                                <Text style={styles.buttonText}>Hủy</Text>
                            </TouchableOpacity>
                            <TouchableOpacity 
                                style={[styles.button, styles.submitButton]}
                                onPress={handleSubmit(onSubmit)}
                            >
                                <Text style={[styles.buttonText, styles.submitButtonText]}>
                                    Gửi
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </View>
        </Modal>
    )
}

const styles = StyleSheet.create({
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContent: {
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 20,
        width: '90%',
        maxHeight: '80%',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 15,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#333',
    },
    closeButton: {
        fontSize: 24,
        color: '#666',
    },
    form: {
        flexGrow: 0,
    },
    formGroup: {
        marginBottom: 15,
    },
    label: {
        fontSize: 16,
        fontWeight: '600',
        color: '#333',
        marginBottom: 5,
    },
    pickerContainer: {
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 8,
        backgroundColor: '#f9f9f9',
    },
    picker: {
        height: Platform.OS === 'ios' ? 150 : 50,
        color: '#333',
    },
    rating: {
        alignSelf: 'flex-start',
        marginVertical: 5,
    },
    textInput: {
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 8,
        padding: 10,
        height: 100,
        textAlignVertical: 'top',
        backgroundColor: '#f9f9f9',
        fontSize: 16,
        color: '#333',
    },
    imageUploadButton: {
        borderWidth: 2,
        borderColor: '#ddd',
        borderStyle: 'dashed',
        borderRadius: 8,
        padding: 15,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#f9f9f9',
        height: 120,
    },
    previewImage: {
        width: '100%',
        height: '100%',
        borderRadius: 8,
        resizeMode: 'cover',
    },
    uploadText: {
        color: '#999',
        fontSize: 16,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        gap: 10,
        marginTop: 20,
    },
    button: {
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 20,
        alignItems: 'center',
        minWidth: 100,
    },
    cancelButton: {
        borderWidth: 1,
        borderColor: '#ff69b4',
        backgroundColor: 'white',
    },
    submitButton: {
        backgroundColor: '#ff69b4',
    },
    buttonText: {
        fontSize: 16,
        fontWeight: '600',
        color: '#ff69b4',
    },
    submitButtonText: {
        color: 'white',
    },
    errorText: {
        color: 'red',
        fontSize: 12,
        marginTop: 5,
    },
})

export default WriteReviewModal