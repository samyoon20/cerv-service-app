import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Calendar, Clock, Repeat } from 'lucide-react-native';

interface SchedulingComponentProps {
  onDateTimeSelect: (date: string, time: string, frequency: string) => void;
  selectedDate?: string;
  selectedTime?: string;
  selectedFrequency?: string;
}

const TIME_SLOTS = [
  '8:00 AM', '9:00 AM', '10:00 AM', '11:00 AM',
  '12:00 PM', '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM'
];

const FREQUENCY_OPTIONS = [
  { id: 'weekly', label: 'Weekly', description: 'Every week' },
  { id: 'bi-weekly', label: 'Bi-weekly', description: 'Every 2 weeks' },
  { id: 'monthly', label: 'Monthly', description: 'Every month' },
  { id: 'one-time', label: 'One-time', description: 'Just once' },
];

export default function SchedulingComponent({ 
  onDateTimeSelect, 
  selectedDate, 
  selectedTime, 
  selectedFrequency 
}: SchedulingComponentProps) {
  const [currentDate, setCurrentDate] = useState(selectedDate || '');
  const [currentTime, setCurrentTime] = useState(selectedTime || '');
  const [currentFrequency, setCurrentFrequency] = useState(selectedFrequency || '');

  // Generate next 14 days
  const generateDates = () => {
    const dates = [];
    const today = new Date();
    
    for (let i = 1; i <= 14; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      dates.push({
        date: date.toISOString().split('T')[0],
        display: date.toLocaleDateString('en-US', { 
          weekday: 'short', 
          month: 'short', 
          day: 'numeric' 
        }),
        dayOfWeek: date.toLocaleDateString('en-US', { weekday: 'long' })
      });
    }
    return dates;
  };

  const dates = generateDates();

  const handleSelection = (date?: string, time?: string, frequency?: string) => {
    const newDate = date || currentDate;
    const newTime = time || currentTime;
    const newFrequency = frequency || currentFrequency;

    if (date) setCurrentDate(date);
    if (time) setCurrentTime(time);
    if (frequency) setCurrentFrequency(frequency);

    if (newDate && newTime && newFrequency) {
      onDateTimeSelect(newDate, newTime, newFrequency);
    }
  };

  return (
    <View style={styles.container}>
      {/* Frequency Selection */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Repeat color="#00D4AA" size={20} />
          <Text style={styles.sectionTitle}>How often?</Text>
        </View>
        <View style={styles.frequencyGrid}>
          {FREQUENCY_OPTIONS.map((option) => (
            <TouchableOpacity
              key={option.id}
              style={[
                styles.frequencyOption,
                currentFrequency === option.id && styles.frequencyOptionSelected
              ]}
              onPress={() => handleSelection(undefined, undefined, option.id)}
            >
              <Text style={[
                styles.frequencyLabel,
                currentFrequency === option.id && styles.frequencyLabelSelected
              ]}>
                {option.label}
              </Text>
              <Text style={[
                styles.frequencyDescription,
                currentFrequency === option.id && styles.frequencyDescriptionSelected
              ]}>
                {option.description}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Date Selection */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Calendar color="#00D4AA" size={20} />
          <Text style={styles.sectionTitle}>Choose a date</Text>
        </View>
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          style={styles.dateScroll}
        >
          {dates.map((dateItem) => (
            <TouchableOpacity
              key={dateItem.date}
              style={[
                styles.dateOption,
                currentDate === dateItem.date && styles.dateOptionSelected
              ]}
              onPress={() => handleSelection(dateItem.date)}
            >
              <Text style={[
                styles.dateText,
                currentDate === dateItem.date && styles.dateTextSelected
              ]}>
                {dateItem.display}
              </Text>
              <Text style={[
                styles.dayText,
                currentDate === dateItem.date && styles.dayTextSelected
              ]}>
                {dateItem.dayOfWeek}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Time Selection */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Clock color="#00D4AA" size={20} />
          <Text style={styles.sectionTitle}>Select time</Text>
        </View>
        <View style={styles.timeGrid}>
          {TIME_SLOTS.map((time) => (
            <TouchableOpacity
              key={time}
              style={[
                styles.timeOption,
                currentTime === time && styles.timeOptionSelected
              ]}
              onPress={() => handleSelection(undefined, time)}
            >
              <Text style={[
                styles.timeText,
                currentTime === time && styles.timeTextSelected
              ]}>
                {time}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 24,
  },
  section: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 20,
    borderWidth: 1,
    borderColor: 'rgba(139, 157, 195, 0.2)',
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    gap: 8,
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: 'Nunito-SemiBold',
    color: '#0F172A',
    letterSpacing: -0.3,
  },
  frequencyGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  frequencyOption: {
    flex: 1,
    minWidth: '45%',
    padding: 16,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: 'rgba(139, 157, 195, 0.2)',
    backgroundColor: '#ffffff',
  },
  frequencyOptionSelected: {
    borderColor: '#00D4AA',
    backgroundColor: 'rgba(0, 212, 170, 0.05)',
  },
  frequencyLabel: {
    fontSize: 16,
    fontFamily: 'Nunito-SemiBold',
    color: '#0F172A',
    marginBottom: 4,
    letterSpacing: -0.2,
  },
  frequencyLabelSelected: {
    color: '#065F46',
  },
  frequencyDescription: {
    fontSize: 12,
    fontFamily: 'Nunito-Regular',
    color: '#64748B',
  },
  frequencyDescriptionSelected: {
    color: '#047857',
  },
  dateScroll: {
    marginHorizontal: -20,
    paddingHorizontal: 20,
  },
  dateOption: {
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(139, 157, 195, 0.2)',
    backgroundColor: '#ffffff',
    marginRight: 12,
    minWidth: 120,
    alignItems: 'center',
  },
  dateOptionSelected: {
    borderColor: '#00D4AA',
    backgroundColor: 'rgba(0, 212, 170, 0.05)',
  },
  dateText: {
    fontSize: 14,
    fontFamily: 'Nunito-SemiBold',
    color: '#0F172A',
    marginBottom: 4,
    letterSpacing: -0.1,
  },
  dateTextSelected: {
    color: '#065F46',
  },
  dayText: {
    fontSize: 12,
    fontFamily: 'Nunito-Regular',
    color: '#64748B',
  },
  dayTextSelected: {
    color: '#047857',
  },
  timeGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  timeOption: {
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(139, 157, 195, 0.2)',
    backgroundColor: '#ffffff',
  },
  timeOptionSelected: {
    borderColor: '#00D4AA',
    backgroundColor: 'rgba(0, 212, 170, 0.05)',
  },
  timeText: {
    fontSize: 14,
    fontFamily: 'Nunito-SemiBold',
    color: '#0F172A',
    letterSpacing: -0.1,
  },
  timeTextSelected: {
    color: '#065F46',
  },
});