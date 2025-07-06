import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  TouchableOpacity,
  TextInput,
  Alert
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { 
  MessageCircle, 
  Send, 
  Phone, 
  Wrench,
} from 'lucide-react-native';
import { CervColors, CervSpacing, CervTypography, CervBorderRadius } from '@/themes/appleDesignSystem';

const MOCK_CONVERSATIONS = [
  {
    id: '1',
    type: 'technician',
    name: 'Mike Johnson',
    service: 'Pool Maintenance',
    lastMessage: 'I\'ll be there around 10 AM tomorrow for the pool cleaning.',
    timestamp: '2 hours ago',
    unread: false,
    avatar: '🧑‍🔧',
  },
  {
    id: '2',
    type: 'sales',
    name: 'Cerv Support',
    service: 'General Inquiry',
    lastMessage: 'Hi! How can we help you today?',
    timestamp: '1 day ago',
    unread: true,
    avatar: '💬',
  },
  {
    id: '3',
    type: 'technician',
    name: 'Sarah Wilson',
    service: 'Landscaping',
    lastMessage: 'Great! The garden is looking much better now.',
    timestamp: '3 days ago',
    unread: false,
    avatar: '👩‍🌾',
  },
];

const MOCK_MESSAGES = [
  {
    id: '1',
    sender: 'technician',
    message: 'Hi! I\'m Mike, your pool maintenance technician.',
    timestamp: '10:00 AM',
    isUser: false,
  },
  {
    id: '2',
    sender: 'user',
    message: 'Hi Mike! Looking forward to getting the pool cleaned.',
    timestamp: '10:05 AM',
    isUser: true,
  },
  {
    id: '3',
    sender: 'technician',
    message: 'Perfect! I\'ll be there around 10 AM tomorrow. Should take about an hour.',
    timestamp: '10:07 AM',
    isUser: false,
  },
  {
    id: '4',
    sender: 'user',
    message: 'Sounds good! See you then.',
    timestamp: '10:10 AM',
    isUser: true,
  },
];

export default function ChatTab() {
  const [selectedConversation, setSelectedConversation] = useState<string | null>(null);
  const [messageText, setMessageText] = useState('');

  const handleConversationSelect = (conversationId: string) => {
    setSelectedConversation(conversationId);
  };

  const handleBackToList = () => {
    setSelectedConversation(null);
  };

  const handleSendMessage = () => {
    if (!messageText.trim()) return;
    
    Alert.alert('Message Sent', 'Your message has been sent!');
    setMessageText('');
  };

  const handleCallTechnician = () => {
    Alert.alert('Call Technician', 'Calling feature will be available soon.');
  };

  const selectedConv = MOCK_CONVERSATIONS.find(c => c.id === selectedConversation);

  if (selectedConversation && selectedConv) {
    return (
      <View style={styles.container}>
        <View style={styles.backgroundContainer}>
          <SafeAreaView style={styles.safeArea}>
            <View style={styles.chatHeader}>
              <TouchableOpacity style={styles.backButton} onPress={handleBackToList}>
                <Text style={styles.backButtonText}>← Back</Text>
              </TouchableOpacity>
              <View style={styles.chatHeaderInfo}>
                <Text style={styles.chatHeaderName}>{selectedConv.name}</Text>
                <Text style={styles.chatHeaderService}>{selectedConv.service}</Text>
              </View>
              <TouchableOpacity style={styles.callButton} onPress={handleCallTechnician}>
                <Phone color={CervColors.systemGreen} size={20} />
              </TouchableOpacity>
            </View>

            <ScrollView style={styles.messagesContainer} showsVerticalScrollIndicator={false}>
              {MOCK_MESSAGES.map(message => (
                <View
                  key={message.id}
                  style={[
                    styles.messageWrapper,
                    message.isUser ? styles.userMessageWrapper : styles.techMessageWrapper
                  ]}
                >
                  <View
                    style={[
                      styles.messageBubble,
                      message.isUser ? styles.userMessage : styles.techMessage
                    ]}
                  >
                    <Text
                      style={[
                        styles.messageText,
                        message.isUser ? styles.userMessageText : styles.techMessageText
                      ]}
                    >
                      {message.message}
                    </Text>
                  </View>
                  <Text style={styles.messageTimestamp}>{message.timestamp}</Text>
                </View>
              ))}
            </ScrollView>

            <View style={styles.messageInput}>
              <TextInput
                style={styles.textInput}
                placeholder="Type a message..."
                placeholderTextColor="#8B9DC3"
                value={messageText}
                onChangeText={setMessageText}
                multiline
                maxLength={500}
              />
              <TouchableOpacity
                style={[styles.sendButton, !messageText.trim() && styles.sendButtonDisabled]}
                onPress={handleSendMessage}
                disabled={!messageText.trim()}
              >
                <Send color={messageText.trim() ? CervColors.white : CervColors.systemGray} size={18} />
              </TouchableOpacity>
            </View>
          </SafeAreaView>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.backgroundContainer}>
        <SafeAreaView style={styles.safeArea}>
          <View style={styles.header}>
            <Text style={styles.headerTitle}>Messages</Text>
          </View>

          <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
            <View style={styles.conversationsList}>
              {MOCK_CONVERSATIONS.map(conversation => (
                <TouchableOpacity
                  key={conversation.id}
                  style={styles.conversationCard}
                  onPress={() => handleConversationSelect(conversation.id)}
                >
                  <View style={styles.conversationBackground}>
                    <View style={styles.avatarContainer}>
                      <Text style={styles.avatar}>{conversation.avatar}</Text>
                      {conversation.unread && <View style={styles.unreadIndicator} />}
                    </View>

                    <View style={styles.conversationInfo}>
                      <View style={styles.conversationHeader}>
                        <Text style={styles.conversationName}>{conversation.name}</Text>
                        <Text style={styles.conversationTimestamp}>{conversation.timestamp}</Text>
                      </View>
                      
                      <Text style={styles.conversationService}>{conversation.service}</Text>
                      
                      <Text
                        style={[
                          styles.lastMessage,
                          conversation.unread && styles.unreadMessage
                        ]}
                        numberOfLines={2}
                      >
                        {conversation.lastMessage}
                      </Text>
                    </View>

                    <View style={styles.conversationMeta}>
                      {conversation.type === 'technician' ? (
                        <Wrench color="#8B9DC3" size={16} />
                      ) : (
                        <MessageCircle color="#8B9DC3" size={16} />
                      )}
                    </View>
                  </View>
                </TouchableOpacity>
              ))}
            </View>

            {MOCK_CONVERSATIONS.length === 0 && (
              <View style={styles.emptyState}>
                <MessageCircle color="#8B9DC3" size={48} />
                <Text style={styles.emptyStateTitle}>No messages yet</Text>
                <Text style={styles.emptyStateText}>
                  Your conversations with technicians and support will appear here
                </Text>
              </View>
            )}

            <View style={styles.helpSection}>
              <Text style={styles.helpTitle}>Need help?</Text>
              <Text style={styles.helpText}>
                Chat with our support team for questions about services, billing, or scheduling.
              </Text>
              
              <TouchableOpacity style={styles.contactSupportButton}>
                <View style={styles.supportButtonBackground}>
                  <MessageCircle color={CervColors.systemBlue} size={20} />
                  <Text style={styles.contactSupportText}>Contact Support</Text>
                </View>
              </TouchableOpacity>
            </View>

            <View style={styles.bottomSpacing} />
          </ScrollView>
        </SafeAreaView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundContainer: {
    flex: 1,
    backgroundColor: CervColors.background,
  },
  safeArea: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 24,
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(139, 157, 195, 0.1)',
  },
  headerTitle: {
    fontSize: 24,
    fontFamily: 'Nunito-Bold',
    color: '#FFFFFF',
    letterSpacing: -0.5,
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 20,
  },
  conversationsList: {
    gap: 12,
    marginBottom: 32,
  },
  conversationCard: {
    borderRadius: 16,
    overflow: 'hidden',
  },
  conversationBackground: {
    backgroundColor: CervColors.cardBackground,
    flexDirection: 'row',
    alignItems: 'flex-start',
    padding: CervSpacing.lg,
    borderWidth: 0.5,
    borderColor: CervColors.separator,
    gap: CervSpacing.md,
    borderRadius: CervBorderRadius.large,
  },
  avatarContainer: {
    position: 'relative',
  },
  avatar: {
    fontSize: 32,
    width: 48,
    height: 48,
    textAlign: 'center',
    lineHeight: 48,
    backgroundColor: 'rgba(139, 157, 195, 0.1)',
    borderRadius: 24,
  },
  unreadIndicator: {
    position: 'absolute',
    top: -2,
    right: -2,
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: CervColors.systemGreen,
    borderWidth: 2,
    borderColor: '#1E2A3A',
  },
  conversationInfo: {
    flex: 1,
  },
  conversationHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  conversationName: {
    fontSize: 16,
    fontFamily: 'Nunito-Bold',
    color: '#FFFFFF',
    letterSpacing: -0.2,
  },
  conversationTimestamp: {
    fontSize: 12,
    fontFamily: 'Nunito-Regular',
    color: '#8B9DC3',
  },
  conversationService: {
    fontSize: 12,
    fontFamily: 'Nunito-SemiBold',
    color: CervColors.systemGreen,
    marginBottom: 6,
  },
  lastMessage: {
    fontSize: 14,
    fontFamily: 'Nunito-Regular',
    color: '#8B9DC3',
    lineHeight: 18,
  },
  unreadMessage: {
    fontFamily: 'Nunito-SemiBold',
    color: '#FFFFFF',
  },
  conversationMeta: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: 60,
  },
  emptyStateTitle: {
    fontSize: 20,
    fontFamily: 'Nunito-Bold',
    color: '#FFFFFF',
    marginTop: 16,
    marginBottom: 8,
    letterSpacing: -0.3,
  },
  emptyStateText: {
    fontSize: 16,
    fontFamily: 'Nunito-Regular',
    color: '#8B9DC3',
    textAlign: 'center',
    lineHeight: 24,
    maxWidth: 280,
  },
  helpSection: {
    backgroundColor: CervColors.cardBackground,
    borderRadius: CervBorderRadius.large,
    padding: CervSpacing.xl,
    borderWidth: 0.5,
    borderColor: CervColors.separator,
  },
  helpTitle: {
    fontSize: 18,
    fontFamily: 'Nunito-Bold',
    color: '#FFFFFF',
    marginBottom: 8,
    letterSpacing: -0.3,
  },
  helpText: {
    fontSize: 14,
    fontFamily: 'Nunito-Regular',
    color: '#8B9DC3',
    lineHeight: 20,
    marginBottom: 16,
  },
  contactSupportButton: {
    borderRadius: 12,
    overflow: 'hidden',
  },
  supportButtonBackground: {
    backgroundColor: CervColors.systemBlueLight,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: CervSpacing.md,
    paddingHorizontal: CervSpacing.xl,
    borderWidth: 0.5,
    borderColor: CervColors.systemBlue,
    gap: CervSpacing.sm,
    borderRadius: CervBorderRadius.medium,
  },
  contactSupportText: {
    ...CervTypography.subheadline,
    fontFamily: 'Nunito-SemiBold',
    color: CervColors.systemBlue,
  },
  chatHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(139, 157, 195, 0.1)',
    gap: 16,
  },
  backButton: {
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  backButtonText: {
    fontSize: 16,
    fontFamily: 'Nunito-SemiBold',
    color: CervColors.systemGreen,
  },
  chatHeaderInfo: {
    flex: 1,
  },
  chatHeaderName: {
    fontSize: 18,
    fontFamily: 'Nunito-Bold',
    color: '#FFFFFF',
    letterSpacing: -0.3,
  },
  chatHeaderService: {
    fontSize: 14,
    fontFamily: 'Nunito-Regular',
    color: '#8B9DC3',
  },
  callButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0, 212, 170, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(0, 212, 170, 0.2)',
  },
  messagesContainer: {
    flex: 1,
    paddingHorizontal: 24,
    paddingVertical: 16,
  },
  messageWrapper: {
    marginBottom: 16,
  },
  userMessageWrapper: {
    alignItems: 'flex-end',
  },
  techMessageWrapper: {
    alignItems: 'flex-start',
  },
  messageBubble: {
    maxWidth: '80%',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 16,
    marginBottom: 4,
  },
  userMessage: {
    backgroundColor: CervColors.systemGreen,
    borderBottomRightRadius: 4,
  },
  techMessage: {
    backgroundColor: 'rgba(139, 157, 195, 0.1)',
    borderWidth: 1,
    borderColor: 'rgba(139, 157, 195, 0.2)',
    borderBottomLeftRadius: 4,
  },
  messageText: {
    fontSize: 14,
    fontFamily: 'Nunito-Regular',
    lineHeight: 20,
  },
  userMessageText: {
    color: '#0F1629',
  },
  techMessageText: {
    color: '#FFFFFF',
  },
  messageTimestamp: {
    fontSize: 12,
    fontFamily: 'Nunito-Regular',
    color: '#8B9DC3',
  },
  messageInput: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    paddingHorizontal: 24,
    paddingVertical: 16,
    borderTopWidth: 1,
    borderTopColor: 'rgba(139, 157, 195, 0.1)',
    gap: 12,
  },
  textInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: 'rgba(139, 157, 195, 0.2)',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    fontFamily: 'Nunito-Regular',
    maxHeight: 100,
    backgroundColor: 'rgba(139, 157, 195, 0.05)',
    color: '#FFFFFF',
  },
  sendButton: {
    width: 40,
    height: 40,
    borderRadius: CervBorderRadius.round,
    backgroundColor: CervColors.systemBlue,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sendButtonDisabled: {
    backgroundColor: 'rgba(139, 157, 195, 0.2)',
  },
  bottomSpacing: {
    height: 20,
  },
});