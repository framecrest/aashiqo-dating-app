import React, { useState, useEffect, useContext, useRef } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, FlatList, KeyboardAvoidingView, Platform } from 'react-native';
import { Send } from 'lucide-react-native';
import { COLORS, SPACING } from '../utils/theme';
import { AuthContext } from '../context/AuthContext';
import api from '../services/api';
import io from 'socket.io-client';
import { SOCKET_URL } from '../utils/constants';

const ChatScreen = ({ route, navigation }) => {
    const { matchId, otherUser } = route.params;
    const { user } = useContext(AuthContext);
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');
    const socket = useRef(null);
    const flatListRef = useRef(null);

    useEffect(() => {
        navigation.setOptions({ title: otherUser.name });
        fetchMessages();

        socket.current = io(SOCKET_URL);
        socket.current.emit('join_chat', matchId);

        socket.current.on('receive_message', (message) => {
            setMessages((prev) => [...prev, message]);
        });

        return () => {
            socket.current.disconnect();
        };
    }, []);

    const fetchMessages = async () => {
        try {
            const { data } = await api.get(`/chat/${matchId}`);
            setMessages(data);
        } catch (error) {
            console.error(error);
        }
    };

    const sendMessage = () => {
        if (!input.trim()) return;

        const messageData = {
            matchId,
            sender: user._id,
            receiver: otherUser._id,
            text: input,
        };

        socket.current.emit('send_message', messageData);
        setInput('');
    };

    const renderMessageItem = ({ item }) => {
        const isMine = item.sender === user._id;
        return (
            <View style={[styles.messageBubble, isMine ? styles.myMessage : styles.theirMessage]}>
                <Text style={[styles.messageText, isMine ? styles.myMessageText : styles.theirMessageText]}>
                    {item.text}
                </Text>
            </View>
        );
    };

    return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior={Platform.OS === 'ios' ? 'padding' : undefined}
            keyboardVerticalOffset={90}
        >
            <FlatList
                ref={flatListRef}
                data={messages}
                keyExtractor={(item) => item._id || Math.random().toString()}
                renderItem={renderMessageItem}
                contentContainerStyle={styles.messageList}
                onContentSizeChange={() => flatListRef.current?.scrollToEnd()}
            />

            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    placeholder="Type a message..."
                    value={input}
                    onChangeText={setInput}
                    multiline
                />
                <TouchableOpacity style={styles.sendButton} onPress={sendMessage}>
                    <Send color={COLORS.white} size={20} />
                </TouchableOpacity>
            </View>
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.background,
    },
    messageList: {
        padding: SPACING.md,
    },
    messageBubble: {
        maxWidth: '80%',
        padding: SPACING.md,
        borderRadius: 20,
        marginBottom: SPACING.sm,
    },
    myMessage: {
        alignSelf: 'flex-end',
        backgroundColor: COLORS.primary,
        borderBottomRightRadius: 4,
    },
    theirMessage: {
        alignSelf: 'flex-start',
        backgroundColor: COLORS.surfaceVariant,
        borderBottomLeftRadius: 4,
        borderWidth: 1,
        borderColor: COLORS.border,
    },
    messageText: {
        fontSize: 16,
    },
    myMessageText: {
        color: COLORS.white,
    },
    theirMessageText: {
        color: COLORS.textPrimary,
    },
    inputContainer: {
        flexDirection: 'row',
        padding: SPACING.md,
        backgroundColor: COLORS.background,
        alignItems: 'center',
        borderTopWidth: 1,
        borderTopColor: COLORS.border,
    },
    input: {
        flex: 1,
        backgroundColor: COLORS.surfaceVariant,
        borderRadius: 25,
        paddingHorizontal: SPACING.lg,
        paddingVertical: SPACING.sm,
        maxHeight: 100,
        fontSize: 16,
        color: COLORS.textPrimary,
    },
    sendButton: {
        width: 45,
        height: 45,
        borderRadius: 22.5,
        backgroundColor: COLORS.primary,
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: SPACING.sm,
    },
});

export default ChatScreen;
