import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TextInput, 
  TouchableOpacity, 
  Alert 
} from 'react-native';
import { CreditCard, Smartphone, Apple } from 'lucide-react-native';

interface PaymentFormProps {
  onPaymentSubmit: (paymentData: any) => void;
  amount: number;
}

export default function PaymentForm({ onPaymentSubmit, amount }: PaymentFormProps) {
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'apple_pay' | 'google_pay'>('card');
  const [cardData, setCardData] = useState({
    number: '',
    expiry: '',
    cvv: '',
    name: '',
  });
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');

  const handleCardInputChange = (field: string, value: string) => {
    let formattedValue = value;
    
    if (field === 'number') {
      // Format card number with spaces
      formattedValue = value.replace(/\s/g, '').replace(/(.{4})/g, '$1 ').trim();
      if (formattedValue.length > 19) return;
    } else if (field === 'expiry') {
      // Format expiry as MM/YY
      formattedValue = value.replace(/\D/g, '').replace(/(\d{2})(\d)/, '$1/$2');
      if (formattedValue.length > 5) return;
    } else if (field === 'cvv') {
      // Only allow numbers for CVV
      formattedValue = value.replace(/\D/g, '');
      if (formattedValue.length > 4) return;
    }
    
    setCardData(prev => ({ ...prev, [field]: formattedValue }));
  };

  const handleSubmit = () => {
    if (!fullName.trim() || !email.trim() || !password.trim()) {
      Alert.alert('Missing Information', 'Please fill in your account details.');
      return;
    }

    if (paymentMethod === 'card') {
      if (!cardData.number || !cardData.expiry || !cardData.cvv || !cardData.name) {
        Alert.alert('Missing Information', 'Please fill in all card details.');
        return;
      }
    }

    const paymentData = {
      method: paymentMethod,
      amount,
      accountDetails: {
        fullName,
        email,
        password,
      },
      ...(paymentMethod === 'card' && { cardData }),
    };

    onPaymentSubmit(paymentData);
  };

  return (
    <View style={styles.container}>
      {/* Account Creation */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Create Your Account</Text>
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Full Name</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your full name"
            placeholderTextColor="#94A3B8"
            value={fullName}
            onChangeText={setFullName}
            autoCapitalize="words"
          />
        </View>
        
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Email Address</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your email address"
            placeholderTextColor="#94A3B8"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />
        </View>
        
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Password</Text>
          <TextInput
            style={styles.input}
            placeholder="Create a secure password"
            placeholderTextColor="#94A3B8"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />
        </View>
      </View>

      {/* Payment Method Selection */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Payment Method</Text>
        
        <View style={styles.paymentMethods}>
          <TouchableOpacity
            style={[
              styles.paymentMethod,
              paymentMethod === 'card' && styles.paymentMethodSelected
            ]}
            onPress={() => setPaymentMethod('card')}
          >
            <CreditCard color={paymentMethod === 'card' ? '#00D4AA' : '#64748B'} size={20} />
            <Text style={[
              styles.paymentMethodText,
              paymentMethod === 'card' && styles.paymentMethodTextSelected
            ]}>
              Credit/Debit Card
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.paymentMethod,
              paymentMethod === 'apple_pay' && styles.paymentMethodSelected
            ]}
            onPress={() => setPaymentMethod('apple_pay')}
          >
            <Apple color={paymentMethod === 'apple_pay' ? '#00D4AA' : '#64748B'} size={20} />
            <Text style={[
              styles.paymentMethodText,
              paymentMethod === 'apple_pay' && styles.paymentMethodTextSelected
            ]}>
              Apple Pay
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.paymentMethod,
              paymentMethod === 'google_pay' && styles.paymentMethodSelected
            ]}
            onPress={() => setPaymentMethod('google_pay')}
          >
            <Smartphone color={paymentMethod === 'google_pay' ? '#00D4AA' : '#64748B'} size={20} />
            <Text style={[
              styles.paymentMethodText,
              paymentMethod === 'google_pay' && styles.paymentMethodTextSelected
            ]}>
              Google Pay
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Card Details (if card payment selected) */}
      {paymentMethod === 'card' && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Card Details</Text>
          
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Cardholder Name</Text>
            <TextInput
              style={styles.input}
              placeholder="Name as it appears on card"
              placeholderTextColor="#94A3B8"
              value={cardData.name}
              onChangeText={(value) => handleCardInputChange('name', value)}
              autoCapitalize="words"
            />
          </View>
          
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Card Number</Text>
            <TextInput
              style={styles.input}
              placeholder="1234 5678 9012 3456"
              placeholderTextColor="#94A3B8"
              value={cardData.number}
              onChangeText={(value) => handleCardInputChange('number', value)}
              keyboardType="numeric"
            />
          </View>
          
          <View style={styles.inputRow}>
            <View style={[styles.inputGroup, { flex: 1 }]}>
              <Text style={styles.label}>Expiry Date</Text>
              <TextInput
                style={styles.input}
                placeholder="MM/YY"
                placeholderTextColor="#94A3B8"
                value={cardData.expiry}
                onChangeText={(value) => handleCardInputChange('expiry', value)}
                keyboardType="numeric"
              />
            </View>
            <View style={[styles.inputGroup, { flex: 1 }]}>
              <Text style={styles.label}>CVV</Text>
              <TextInput
                style={styles.input}
                placeholder="123"
                placeholderTextColor="#94A3B8"
                value={cardData.cvv}
                onChangeText={(value) => handleCardInputChange('cvv', value)}
                keyboardType="numeric"
              />
            </View>
          </View>
        </View>
      )}

      <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
        <Text style={styles.submitButtonText}>
          Complete Payment - ${amount}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 24,
  },
  section: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 24,
    borderWidth: 1,
    borderColor: 'rgba(139, 157, 195, 0.2)',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.04,
    shadowRadius: 8,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 19,
    fontFamily: 'Nunito-Bold',
    color: '#0F172A',
    marginBottom: 20,
    letterSpacing: -0.4,
  },
  inputGroup: {
    marginBottom: 20,
  },
  inputRow: {
    flexDirection: 'row',
    gap: 16,
  },
  label: {
    fontSize: 15,
    fontFamily: 'Nunito-SemiBold',
    color: '#334155',
    marginBottom: 8,
    letterSpacing: -0.2,
  },
  input: {
    borderWidth: 1,
    borderColor: 'rgba(139, 157, 195, 0.3)',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 16,
    fontFamily: 'Nunito-Regular',
    backgroundColor: '#FFFFFF',
    color: '#0F172A',
  },
  paymentMethods: {
    gap: 12,
  },
  paymentMethod: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 18,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(139, 157, 195, 0.2)',
    backgroundColor: 'rgba(139, 157, 195, 0.05)',
    gap: 12,
  },
  paymentMethodSelected: {
    borderColor: '#00D4AA',
    backgroundColor: 'rgba(0, 212, 170, 0.05)',
  },
  paymentMethodText: {
    fontSize: 16,
    fontFamily: 'Nunito-SemiBold',
    color: '#64748B',
    letterSpacing: -0.2,
  },
  paymentMethodTextSelected: {
    color: '#065F46',
  },
  submitButton: {
    backgroundColor: '#00D4AA',
    paddingVertical: 18,
    borderRadius: 16,
    alignItems: 'center',
    marginTop: 8,
    shadowColor: '#00D4AA',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  submitButtonText: {
    fontSize: 18,
    fontFamily: 'Nunito-Bold',
    color: '#FFFFFF',
    letterSpacing: -0.3,
  },
});