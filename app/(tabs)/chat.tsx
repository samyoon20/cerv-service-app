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
                placeholderTextColor={CervColors.tertiaryLabel}
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
                        <Wrench color={CervColors.tertiaryLabel} size={16} />
                      ) : (
                        <MessageCircle color={CervColors.tertiaryLabel} size={16} />
                      )}
                    </View>
                  </View>
                </TouchableOpacity>
              ))}
            </View>

            {MOCK_CONVERSATIONS.length === 0 && (
              <View style={styles.emptyState}>
                <MessageCircle color={CervColors.tertiaryLabel} size={48} />
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
    paddingHorizontal: CervSpacing.xxl,
    paddingVertical: CervSpacing.xl,
    borderBottomWidth: 1,
    borderBottomColor: CervColors.separator,
  },
  headerTitle: {
    ...CervTypography.title2,
    color: CervColors.label,
  },
  content: {
    flex: 1,
    paddingHorizontal: CervSpacing.xxl,
    paddingTop: CervSpacing.xl,
  },
  conversationsList: {
    gap: CervSpacing.md,
    marginBottom: CervSpacing.xxxl,
  },
  conversationCard: {
    borderRadius: CervBorderRadius.large,
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
    backgroundColor: CervColors.secondarySystemFill,
    borderRadius: 24,
  },
  unreadIndicator: {
    position: 'absolute',
    top: -2,
    right: -2,
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: CervColors.systemRed,
    borderWidth: 2,
    borderColor: CervColors.background,
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
    ...CervTypography.headline,
    color: CervColors.label,
  },
  conversationTimestamp: {
    ...CervTypography.caption1,
    color: CervColors.tertiaryLabel,
  },
  conversationService: {
    ...CervTypography.caption1,
    fontWeight: '600',
    color: CervColors.systemGreen,
    marginBottom: 6,
  },
  lastMessage: {
    ...CervTypography.subheadline,
    color: CervColors.secondaryLabel,
  },
  unreadMessage: {
    fontWeight: '600',
    color: CervColors.label,
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
    ...CervTypography.title3,
    color: CervColors.label,
    marginTop: CervSpacing.lg,
    marginBottom: CervSpacing.sm,
  },
  emptyStateText: {
    ...CervTypography.body,
    color: CervColors.secondaryLabel,
    textAlign: 'center',
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
    ...CervTypography.headline,
    color: CervColors.label,
    marginBottom: CervSpacing.sm,
  },
  helpText: {
    ...CervTypography.subheadline,
    color: CervColors.secondaryLabel,
    marginBottom: CervSpacing.lg,
  },
  contactSupportButton: {
    borderRadius: CervBorderRadius.medium,
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
    fontWeight: '600',
    color: CervColors.systemBlue,
  },
  chatHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: CervSpacing.xxl,
    paddingVertical: CervSpacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: CervColors.separator,
    gap: CervSpacing.lg,
  },
  backButton: {
    paddingVertical: CervSpacing.sm,
    paddingHorizontal: CervSpacing.md,
  },
  backButtonText: {
    ...CervTypography.headline,
    color: CervColors.systemGreen,
  },
  chatHeaderInfo: {
    flex: 1,
  },
  chatHeaderName: {
    ...CervTypography.headline,
    color: CervColors.label,
  },
  chatHeaderService: {
    ...CervTypography.subheadline,
    color: CervColors.secondaryLabel,
  },
  callButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: CervColors.systemGreenLight,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: CervColors.systemGreen,
  },
  messagesContainer: {
    flex: 1,
    paddingHorizontal: CervSpacing.xxl,
    paddingVertical: CervSpacing.lg,
  },
  messageWrapper: {
    marginBottom: CervSpacing.lg,
  },
  userMessageWrapper: {
    alignItems: 'flex-end',
  },
  techMessageWrapper: {
    alignItems: 'flex-start',
  },
  messageBubble: {
    maxWidth: '80%',
    paddingHorizontal: CervSpacing.lg,
    paddingVertical: CervSpacing.md,
    borderRadius: CervBorderRadius.large,
    marginBottom: 4,
  },
  userMessage: {
    backgroundColor: CervColors.systemBlue,
    borderBottomRightRadius: 4,
  },
  techMessage: {
    backgroundColor: CervColors.cardBackground,
    borderWidth: 1,
    borderColor: CervColors.separator,
    borderBottomLeftRadius: 4,
  },
  messageText: {
    ...CervTypography.subheadline,
  },
  userMessageText: {
    color: CervColors.white,
  },
  techMessageText: {
    color: CervColors.label,
  },
  messageTimestamp: {
    ...CervTypography.caption1,
    color: CervColors.tertiaryLabel,
  },
  messageInput: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    paddingHorizontal: CervSpacing.xxl,
    paddingVertical: CervSpacing.lg,
    borderTopWidth: 1,
    borderTopColor: CervColors.separator,
    gap: CervSpacing.md,
  },
  textInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: CervColors.separator,
    borderRadius: 20,
    paddingHorizontal: CervSpacing.lg,
    paddingVertical: CervSpacing.md,
    ...CervTypography.body,
    maxHeight: 100,
    backgroundColor: CervColors.cardBackground,
    color: CervColors.label,
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
    backgroundColor: CervColors.systemGray4,
  },
  bottomSpacing: {
    height: CervSpacing.xl,
  },
});