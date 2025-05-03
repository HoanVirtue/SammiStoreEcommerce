import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface TimeLeft {
    hours: number;
    minutes: number;
    seconds: number;
}

interface CountdownTimerProps {
    saleEndTime: string;
}

// Placeholder colors - replace with your actual theme colors
const primaryColor = '#6200EE'; // Example primary color
const errorColor = '#B00020'; // Example error color
const textColor = primaryColor; // Assuming text uses primary color based on original code
const backgroundColor = 'white';

const CountdownTimer: React.FC<CountdownTimerProps> = ({ saleEndTime }) => {
    const calculateTimeLeft = (): TimeLeft => {
        const difference = +new Date(saleEndTime) - +new Date();
        let timeLeft: TimeLeft = { hours: 0, minutes: 0, seconds: 0 };

        if (difference > 0) {
            timeLeft = {
                hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
                minutes: Math.floor((difference / 1000 / 60) % 60),
                seconds: Math.floor((difference / 1000) % 60),
            };
        }

        return timeLeft;
    };

    const [timeLeft, setTimeLeft] = useState<TimeLeft>(calculateTimeLeft());

    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft(calculateTimeLeft());
        }, 1000);

        return () => clearInterval(timer);
    }, [saleEndTime]);

    const { hours, minutes, seconds } = timeLeft;
    const isSaleEnded = hours === 0 && minutes === 0 && seconds === 0 && (+new Date(saleEndTime) - +new Date()) <= 0;

    const formatTime = (time: number): string => {
        return time < 10 ? `0${time}` : `${time}`;
    }


    return (
        <View style={styles.container}>
            {isSaleEnded ? (
                <Text style={styles.saleEndedText}>
                    Sale đã kết thúc!
                </Text>
            ) : (
                <>
                    {/* Vòng tròn giờ */}
                    <View style={styles.circle}>
                        <Text style={styles.timeValue}>
                            {formatTime(hours)}
                        </Text>
                        <Text style={styles.timeUnit}>
                            Giờ
                        </Text>
                    </View>

                    {/* Vòng tròn phút */}
                    <View style={styles.circle}>
                        <Text style={styles.timeValue}>
                            {formatTime(minutes)}
                        </Text>
                        <Text style={styles.timeUnit}>
                            Phút
                        </Text>
                    </View>

                    {/* Vòng tròn giây */}
                    <View style={styles.circle}>
                        <Text style={styles.timeValue}>
                            {formatTime(seconds)}
                        </Text>
                        <Text style={styles.timeUnit}>
                            Giây
                        </Text>
                    </View>
                </>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row', // Equivalent to display: 'flex'
        justifyContent: 'center',
        alignItems: 'center',
        padding: 16, // '1rem' is roughly 16dp/pt
        backgroundColor: backgroundColor,
        gap: 16, // Use gap for spacing between circles
    },
    saleEndedText: {
        fontSize: 18, // Approximating h6
        fontWeight: 'bold', // Common practice for headings
        color: errorColor,
    },
    circle: {
        width: 42,
        height: 42,
        borderRadius: 21, // 50% of width/height
        borderWidth: 2,
        borderColor: primaryColor,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: backgroundColor,
        // Removed position: 'relative' as it's often not needed for simple layouts
    },
    timeValue: {
        color: textColor,
        fontWeight: 'bold',
        fontSize: 16, // Equivalent to '1rem'
    },
    timeUnit: {
        color: textColor,
        fontSize: 9,
    },
});

export default CountdownTimer;