import React from 'react';
import { View, Text, Image, StyleSheet, DimensionValue } from 'react-native';

// Use require with a relative path for static images in React Native
const NoDataImg = require('../assets/no-data.png');

type TProps = {
    imageWidth?: number | string;
    imageHeight?: number | string;
    textNodata?: string;
};

// Define styles outside the component
const styles = StyleSheet.create({
    container: {
        flex: 1, // Use flex: 1 to take available height if parent allows
        width: '100%', // Take full width
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10, // Add some padding
    },
    // Image style is defined dynamically below if needed, or kept static if size is fixed
    // Keeping image style separate if it depends on props
    text: {
        marginTop: 16, // Use numerical values for spacing
        textAlign: 'center', // Center the text
        // Text wrapping is default in React Native Text component
        fontSize: 16, // Example font size
        color: '#666', // Example text color
    },
});

const NoData = (props: TProps) => {
    // ** Hook

    //Props
    const {
        imageWidth = 100, // Default width
        imageHeight = 100, // Default height
        textNodata = 'Không có dữ liệu',
    } = props;

    // Create dynamic image style based on props
    // Ensure the values are valid DimensionValue (number or '%')
    const imageStyle = StyleSheet.create({
        dynamicImage: {
            width: imageWidth as DimensionValue,
            height: imageHeight as DimensionValue,
            resizeMode: 'contain',
            maxWidth: '100%',
        }
    });

    return (
        <View style={styles.container}>
            <Image
                source={NoDataImg} // Use require for local static images
                style={imageStyle.dynamicImage} // Use dynamically created style
                alt={"no-data"} // alt is not a standard prop, consider accessibilityLabel
                accessibilityLabel={"No data illustration"} // Add accessibility label
            />
            <Text style={styles.text}>{textNodata}</Text>
        </View>
    );
};

export default NoData;
