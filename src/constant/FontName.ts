export const FontName = {
  Poppins: 'Poppins-Regular',
  PoppinsBold: 'Poppins-Bold',
  PoppinsSemiBold: 'Poppins-SemiBold',
  PoppinsMedium: 'Poppins-Medium',
  PoppinsLight: 'Poppins-Light',
} as const;

export type FontNameType = typeof FontName[keyof typeof FontName];

