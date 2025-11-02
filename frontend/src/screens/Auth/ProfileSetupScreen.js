import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { db, auth } from '../../config/firebase';
import { doc, setDoc } from 'firebase/firestore';

/**
 * Profile Setup Screen
 * 
 * Collects user preferences: dietary restrictions, allergies, food goals
 */
export default function ProfileSetupScreen({ route, navigation }) {
  const { name } = route.params || { name: 'User' };
  
  const [dietaryPreferences, setDietaryPreferences] = useState([]);
  const [allergies, setAllergies] = useState([]);
  const [foodGoal, setFoodGoal] = useState('');
  const [loading, setLoading] = useState(false);

  const dietaryOptions = ['Vegetarian', 'Vegan', 'Pescatarian', 'Keto', 'Paleo', 'Gluten-Free'];
  const allergyOptions = ['Nuts', 'Dairy', 'Eggs', 'Soy', 'Shellfish', 'Wheat'];
  const goalOptions = ['Bulking', 'Cutting', 'Maintenance', 'Healthy Eating'];

  const toggleSelection = (item, list, setList) => {
    if (list.includes(item)) {
      setList(list.filter((i) => i !== item));
    } else {
      setList([...list, item]);
    }
  };

  const handleComplete = async () => {
    if (!foodGoal) {
      Alert.alert('Missing Info', 'Please select a food goal');
      return;
    }

    setLoading(true);
    try {
      const user = auth.currentUser;
      if (user) {
        // Save user profile to Firestore
        await setDoc(doc(db, 'users', user.uid), {
          name,
          email: user.email,
          dietaryPreferences,
          allergies,
          foodGoal,
          createdAt: new Date().toISOString(),
          inventory: [],
          likedRecipes: [],
        });
      }
      // Navigation handled by auth state listener
    } catch (error) {
      Alert.alert('Error', 'Failed to save profile: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <LinearGradient colors={['#FF6B6B', '#FF8E53']} style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.content}>
          <Text style={styles.title}>Let's Personalize</Text>
          <Text style={styles.subtitle}>Help us find recipes you'll love</Text>

          {/* Dietary Preferences */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Dietary Preferences</Text>
            <View style={styles.optionsGrid}>
              {dietaryOptions.map((option) => (
                <TouchableOpacity
                  key={option}
                  style={[
                    styles.option,
                    dietaryPreferences.includes(option) && styles.optionSelected,
                  ]}
                  onPress={() => toggleSelection(option, dietaryPreferences, setDietaryPreferences)}
                >
                  <Text
                    style={[
                      styles.optionText,
                      dietaryPreferences.includes(option) && styles.optionTextSelected,
                    ]}
                  >
                    {option}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Allergies */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Allergies</Text>
            <View style={styles.optionsGrid}>
              {allergyOptions.map((option) => (
                <TouchableOpacity
                  key={option}
                  style={[
                    styles.option,
                    allergies.includes(option) && styles.optionSelected,
                  ]}
                  onPress={() => toggleSelection(option, allergies, setAllergies)}
                >
                  <Text
                    style={[
                      styles.optionText,
                      allergies.includes(option) && styles.optionTextSelected,
                    ]}
                  >
                    {option}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Food Goals */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Food Goal</Text>
            <View style={styles.optionsGrid}>
              {goalOptions.map((option) => (
                <TouchableOpacity
                  key={option}
                  style={[
                    styles.option,
                    foodGoal === option && styles.optionSelected,
                  ]}
                  onPress={() => setFoodGoal(option)}
                >
                  <Text
                    style={[
                      styles.optionText,
                      foodGoal === option && styles.optionTextSelected,
                    ]}
                  >
                    {option}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Complete Button */}
          <TouchableOpacity
            style={styles.completeButton}
            onPress={handleComplete}
            disabled={loading}
          >
            <Text style={styles.completeButtonText}>
              {loading ? 'Saving...' : 'Complete Setup'}
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 40,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 5,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#fff',
    marginBottom: 30,
    textAlign: 'center',
    opacity: 0.9,
  },
  section: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 15,
  },
  optionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  option: {
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 20,
    marginRight: 10,
    marginBottom: 10,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  optionSelected: {
    backgroundColor: '#fff',
    borderColor: '#fff',
  },
  optionText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  optionTextSelected: {
    color: '#FF6B6B',
  },
  completeButton: {
    backgroundColor: '#fff',
    paddingVertical: 15,
    borderRadius: 25,
    alignItems: 'center',
    marginTop: 20,
  },
  completeButtonText: {
    color: '#FF6B6B',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
