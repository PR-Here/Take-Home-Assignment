import * as Yup from 'yup';
import {strings} from '../constant';
import {Cow} from '../types/cow';

export const createCowValidationSchema = (existingCows: Cow[]) => {
  return Yup.object().shape({
    earTag: Yup.string()
      .trim()
      .required(strings.screens.addCow.errorEarTagRequired)
      .test('unique', strings.screens.addCow.errorEarTagExists, function (value) {
        if (!value) return true;
        return !existingCows.some(cow => cow.earTag === value.trim());
      }),
    sex: Yup.string()
      .required(strings.screens.addCow.errorSexRequired)
      .oneOf(['Male', 'Female'], strings.screens.addCow.errorSexRequired),
    pen: Yup.string()
      .trim()
      .required(strings.screens.addCow.errorPenRequired),
    status: Yup.string()
      .required(strings.screens.addCow.errorStatusRequired)
      .oneOf(['Active', 'In Treatment', 'Deceased']),
    weight: Yup.string()
      .test('positive', strings.screens.addCow.errorWeightInvalid, function (value) {
        if (!value || value === '') return true;
        const num = Number(value);
        return !isNaN(num) && num > 0;
      }),
  });
};

