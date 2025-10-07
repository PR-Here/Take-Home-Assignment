# Cow Management App

## Quick Start

```bash
npm install
cd ios && pod install && cd ..
npm run ios
# or
npm run android
```

## Folder Structure

```
TakeHomeAssignment/
├── src/
│   ├── screens/                      # Screen Components
│   │   ├── CowList/                  # Cow list screen
│   │   ├── AddCow/                   # Add cow form screen
│   │   └── CowDetail/                # Cow detail screen
│   │
│   ├── hooks/                        # Custom Hooks
│   │   ├── useCowList.ts             # CowList business logic
│   │   ├── useAddCow.ts              # AddCow business logic
│   │   ├── useCowDetail.ts           # CowDetail business logic
│   │   └── index.ts                  # Hooks barrel export
│   │
│   ├── components/                   # Reusable UI Components
│   │   ├── BottomSheet.tsx           # Animated bottom sheet modal
│   │   ├── ConfirmationBottomSheet.tsx  # Confirmation dialog
│   │   ├── CustomButton.tsx          # Button with variants
│   │   ├── CustomText.tsx            # Text with custom styling
│   │   ├── Container.tsx             # Screen container wrapper
│   │   ├── Card.tsx                  # Card component
│   │   ├── Spacer.tsx                # Spacing component
│   │   ├── SearchBar.tsx             # Search input field
│   │   ├── FilterButton.tsx          # Filter chip button
│   │   └── index.ts                  # Components barrel export
│   │
│   ├── navigation/                   # Navigation Setup
│   │   ├── RootNavigator.tsx         # Main navigation stack
│   │   ├── constants.ts              # Screen name constants
│   │   ├── screens.tsx               # Screen configurations
│   │   └── types.ts                  # Navigation types
│   │
│   ├── context/                      # State Management
│   │   └── CowContext.tsx            # Global cow state context
│   │
│   ├── schemas/                      # Validation Schemas
│   │   ├── cowValidation.ts          # Cow form validation (Yup)
│   │   └── index.ts                  # Schemas barrel export
│   │
│   ├── storage/                      # Data Storage
│   │   └── cowStorage.ts             # AsyncStorage operations
│   │
│   ├── types/                        # TypeScript Types
│   │   ├── cow.ts                    # Cow type definitions
│   │   └── index.ts                  # Types barrel export
│   │
│   ├── constant/                     # Constants
│   │   ├── colors.ts                 # Color palette
│   │   ├── FontName.ts               # Font family constants
│   │   ├── strings.data.ts           # App strings/labels
│   │   └── strings.ts                # Strings export
│   │
│   └── utils/                        # Utility Functions
│       ├── scaling.ts                # Responsive scaling utils
│       └── index.ts                  # Utils barrel export
│
├── android/                          # Android native code
├── ios/                              # iOS native code
├── __tests__/                        # Test files
├── App.tsx                           # Root component
├── index.js                          # Entry point
├── package.json                      # Dependencies
├── tsconfig.json                     # TypeScript config
└── README.md                         # Documentation
```
