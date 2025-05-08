import { AlertCircleIcon } from 'lucide-react-native';
import React from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet } from 'react-native';


interface TConfirmDialog {
    open: boolean;
    onClose: () => void;
    title: string;
    description: string;
    handleConfirm: () => void;
    handleCancel: () => void;
}

const ConfirmDialog = (props: TConfirmDialog) => {
    const { open, onClose, title, description, handleConfirm, handleCancel } = props;


    return (
        <Modal
            visible={open}
            transparent
            animationType="fade"
            onRequestClose={onClose}
        >
            <View style={styles.overlay}>
                <View style={styles.modalContainer}>
                    <View style={styles.iconContainer}>
                        <AlertCircleIcon size={80} color="#FFA000" />
                    </View>
                    
                    <Text style={styles.title}>{title}</Text>
                    
                    <Text style={styles.description}>{description}</Text>
                    
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity 
                            style={[styles.button, styles.cancelButton]} 
                            onPress={handleCancel}
                        >
                            <Text style={styles.cancelButtonText}>Hủy</Text>
                        </TouchableOpacity>
                        
                        <TouchableOpacity 
                            style={[styles.button, styles.confirmButton]} 
                            onPress={handleConfirm}
                        >
                            <Text style={styles.confirmButtonText}>Xác nhận</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContainer: {
        backgroundColor: 'white',
        borderRadius: 8,
        padding: 20,
        width: '90%',
        maxWidth: 400,
        alignItems: 'center',
    },
    iconContainer: {
        marginBottom: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: '600',
        textAlign: 'center',
        marginBottom: 10,
    },
    description: {
        fontSize: 16,
        textAlign: 'center',
        marginBottom: 20,
        color: '#666',
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        marginTop: 10,
    },
    button: {
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 4,
        minWidth: 100,
        alignItems: 'center',
    },
    cancelButton: {
        borderWidth: 1,
        borderColor: '#f44336',
    },
    confirmButton: {
        backgroundColor: '#1976d2',
    },
    cancelButtonText: {
        color: '#f44336',
        fontSize: 16,
    },
    confirmButtonText: {
        color: 'white',
        fontSize: 16,
    },
});

export default ConfirmDialog;