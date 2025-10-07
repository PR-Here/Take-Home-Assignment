import React, { useCallback } from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  ScrollView,
  useColorScheme,
} from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList, SCREEN_NAMES } from '../../navigation';
import {
  Container,
  Text,
  CustomButton,
  Spacer,
  Card,
  FilterButton,
} from '../../components';
import { colors, FontName, strings } from '../../constant';
import { getWidth, getHeight, getFonts } from '../../utils';
import { Formik } from 'formik';
import { useAddCow } from '../../hooks';

type AddCowNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  typeof SCREEN_NAMES.ADD_COW
>;

interface Props {
  navigation: AddCowNavigationProp;
}

const AddCowScreen: React.FC<Props> = ({ navigation }) => {
  const isDarkMode = useColorScheme() === 'dark';
  const {
    initialValues,
    validationSchema,
    handleCancel,
    handleSubmit,
    createFieldHandlers,
  } = useAddCow(navigation);

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
      validateOnChange={true}
      validateOnBlur={true}>
      {({
        values,
        errors,
        touched,
        handleChange,
        handleBlur,
        handleSubmit: formikSubmit,
        setFieldValue,
        isSubmitting,
      }) => {
        const {
          handleSelectMale,
          handleSelectFemale,
          handleSelectActive,
          handleSelectInTreatment,
          handleSelectDeceased,
        } = createFieldHandlers(setFieldValue);

        return (
          <Container>
            <ScrollView
              style={styles.scroll}
              contentContainerStyle={styles.scrollContent}
              showsVerticalScrollIndicator={false}>
              <Spacer height={20} />
              <Text fontSize={14} color={colors.textSecondary}>
                {strings.screens.addCow.subtitle}
              </Text>

              <Spacer height={24} />

              <Card>
                <Text fontSize={14} color={colors.textSecondary}>
                  {strings.screens.addCow.earTagLabel}
                </Text>
                <Spacer height={8} />
                <TextInput
                  style={[
                    styles.input,
                    isDarkMode ? styles.inputDark : styles.inputLight,
                    { color: isDarkMode ? colors.white : colors.black },
                    touched.earTag && errors.earTag && styles.inputError,
                  ]}
                  value={values.earTag}
                  onChangeText={handleChange('earTag')}
                  onBlur={handleBlur('earTag')}
                  placeholder={strings.screens.addCow.earTagPlaceholder}
                  placeholderTextColor={colors.gray}
                />
                {touched.earTag && errors.earTag && (
                  <Text fontSize={12} color={colors.danger} style={styles.errorText}>
                    {errors.earTag}
                  </Text>
                )}

                <Spacer height={16} />

                <Text fontSize={14} color={colors.textSecondary}>
                  {strings.screens.addCow.sexLabel}
                </Text>
                <Spacer height={8} />
                <View style={styles.buttonRow}>
                  <FilterButton
                    label={strings.screens.addCow.male}
                    selected={values.sex === 'Male'}
                    onPress={handleSelectMale}
                  />
                  <FilterButton
                    label={strings.screens.addCow.female}
                    selected={values.sex === 'Female'}
                    onPress={handleSelectFemale}
                  />
                </View>
                {touched.sex && errors.sex && (
                  <Text fontSize={12} color={colors.danger} style={styles.errorText}>
                    {errors.sex}
                  </Text>
                )}

                <Spacer height={16} />

                <Text fontSize={14} color={colors.textSecondary}>
                  {strings.screens.addCow.penLabel}
                </Text>
                <Spacer height={8} />
                <TextInput
                  style={[
                    styles.input,
                    isDarkMode ? styles.inputDark : styles.inputLight,
                    { color: isDarkMode ? colors.white : colors.black },
                    touched.pen && errors.pen && styles.inputError,
                  ]}
                  value={values.pen}
                  onChangeText={handleChange('pen')}
                  onBlur={handleBlur('pen')}
                  placeholder={strings.screens.addCow.penPlaceholder}
                  placeholderTextColor={colors.gray}
                />
                {touched.pen && errors.pen && (
                  <Text fontSize={12} color={colors.danger} style={styles.errorText}>
                    {errors.pen}
                  </Text>
                )}

                <Spacer height={16} />

                <Text fontSize={14} color={colors.textSecondary}>
                  {strings.screens.addCow.statusLabel}
                </Text>
                <Spacer height={8} />
                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                  <FilterButton
                    label={strings.screens.addCow.active}
                    selected={values.status === 'Active'}
                    onPress={handleSelectActive}
                  />
                  <FilterButton
                    label={strings.screens.addCow.inTreatment}
                    selected={values.status === 'In Treatment'}
                    onPress={handleSelectInTreatment}
                  />
                  <FilterButton
                    label={strings.screens.addCow.deceased}
                    selected={values.status === 'Deceased'}
                    onPress={handleSelectDeceased}
                  />
                </ScrollView>

                <Spacer height={16} />

                <Text fontSize={14} color={colors.textSecondary}>
                  {strings.screens.addCow.weightLabel}
                </Text>
                <Spacer height={8} />
                <TextInput
                  style={[
                    styles.input,
                    isDarkMode ? styles.inputDark : styles.inputLight,
                    { color: isDarkMode ? colors.white : colors.black },
                    touched.weight && errors.weight && styles.inputError,
                  ]}
                  value={values.weight}
                  onChangeText={handleChange('weight')}
                  onBlur={handleBlur('weight')}
                  placeholder={strings.screens.addCow.weightPlaceholder}
                  placeholderTextColor={colors.gray}
                  keyboardType="numeric"
                />
                {touched.weight && errors.weight && (
                  <Text fontSize={12} color={colors.danger} style={styles.errorText}>
                    {errors.weight}
                  </Text>
                )}
              </Card>

              <Spacer height={32} />

              <CustomButton
                title={strings.screens.addCow.saveButton}
                variant="success"
                size="small"
                onPress={formikSubmit}
                loading={isSubmitting}
                disabled={isSubmitting}
                fullWidth
              />
              <Spacer height={12} />
              <CustomButton
                title={strings.screens.addCow.cancelButton}
                variant="secondary"
                size="small"
                onPress={handleCancel}
                disabled={isSubmitting}
                fullWidth
              />
              <Spacer height={32} />
            </ScrollView>
          </Container>
        );
      }}
    </Formik>
  );
};

const styles = StyleSheet.create({
  scroll: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: getWidth(20),
  },
  input: {
    borderWidth: 1,
    borderRadius: getWidth(10),
    paddingHorizontal: getWidth(16),
    paddingVertical: getHeight(12),
    fontSize: getFonts(14),
    fontFamily: FontName.Poppins,
  },
  inputLight: {
    backgroundColor: colors.white,
    borderColor: colors.border,
  },
  inputDark: {
    backgroundColor: colors.backgroundDark,
    borderColor: colors.borderDark,
  },
  inputError: {
    borderColor: colors.danger,
    borderWidth: 2,
  },
  buttonRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  errorText: {
    marginTop: getHeight(6),
  },
});

export default AddCowScreen;
