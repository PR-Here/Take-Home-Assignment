import { useCallback } from 'react';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { FormikHelpers } from 'formik';
import { RootStackParamList, SCREEN_NAMES } from '../navigation';
import { useCows } from '../context/CowContext';
import { Cow, CowEvent, CowFormValues } from '../types';
import { createCowValidationSchema } from '../schemas';

type AddCowNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  typeof SCREEN_NAMES.ADD_COW
>;

export const useAddCow = (navigation: AddCowNavigationProp) => {
  const { addCow, cows } = useCows();

  const validationSchema = createCowValidationSchema(cows);

  const initialValues: CowFormValues = {
    earTag: '',
    sex: '',
    pen: '',
    status: 'Active',
    weight: '',
  };

  const handleCancel = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  const handleSubmit = useCallback(
    async (values: CowFormValues, { setSubmitting }: FormikHelpers<CowFormValues>) => {
      const now = new Date().toISOString();
      const initialEvent: CowEvent = {
        id: Date.now().toString(),
        type: 'Created',
        date: now,
        description: `Cow ${values.earTag.trim()} created`,
      };

      const newCow: Cow = {
        id: Date.now().toString(),
        earTag: values.earTag.trim(),
        sex: values.sex as 'Male' | 'Female',
        pen: values.pen.trim(),
        status: values.status,
        weight: values.weight ? Number(values.weight) : undefined,
        createdAt: now,
        lastEventDate: now,
        events: [initialEvent],
      };

      try {
        await addCow(newCow);
        setSubmitting(false);
        navigation.goBack();
      } catch (error) {
        setSubmitting(false);
        console.error('Failed to save cow:', error);
      }
    },
    [addCow, navigation],
  );

  const createFieldHandlers = useCallback((setFieldValue: (field: string, value: any) => void) => ({
    handleSelectMale: () => setFieldValue('sex', 'Male'),
    handleSelectFemale: () => setFieldValue('sex', 'Female'),
    handleSelectActive: () => setFieldValue('status', 'Active'),
    handleSelectInTreatment: () => setFieldValue('status', 'In Treatment'),
    handleSelectDeceased: () => setFieldValue('status', 'Deceased'),
  }), []);

  return {
    // Form config
    initialValues,
    validationSchema,

    // Handlers
    handleCancel,
    handleSubmit,
    createFieldHandlers,
  };
};

