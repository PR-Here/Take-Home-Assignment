# Reusable Components

This directory contains all reusable UI components for the application.

## Components Overview

| Component | Purpose | Props |
|-----------|---------|-------|
| `CustomButton` | Flexible button with variants and sizes | `title`, `onPress`, `variant`, `size`, `disabled`, `loading`, `fullWidth` |
| `Text` | Typography component with custom font sizing | `children`, `fontSize`, `color`, `align` |
| `Container` | Layout wrapper with safe area support | `center`, `padding`, `useSafeArea`, `backgroundColor` |
| `Card` | Content card with elevation/border | `variant`, `padding` |
| `Spacer` | Spacing component for consistent gaps | `width`, `height` |
| `SearchBar` | Search input with icon | `value`, `onChangeText`, `placeholder` |
| `FilterButton` | Chip-style filter button | `label`, `selected`, `onPress` |
| `BottomSheet` | Animated modal sheet from bottom/top | `visible`, `onClose`, `children`, `height`, `position` |
| `ConfirmationBottomSheet` | Confirmation dialog as bottom sheet | `visible`, `onClose`, `onConfirm`, `title`, `message`, `confirmText`, `cancelText` |

## Quick Start

```typescript
import {
  CustomButton,
  Text,
  Container,
  Card,
  Spacer,
} from '../components';
import colors from '../constant/colors';

// Use in your screen
<Container center padding>
  <Text fontSize={28} color={colors.black}>Hello World</Text>
  <Spacer height={20} />
  <CustomButton title="Click Me" variant="primary" onPress={() => {}} />
</Container>
```

## CustomButton Variants

```typescript
// Primary (Blue)
<CustomButton title="Primary" variant="primary" onPress={() => {}} />

// Secondary (Purple)
<CustomButton title="Secondary" variant="secondary" onPress={() => {}} />

// Success (Green)
<CustomButton title="Success" variant="success" onPress={() => {}} />

// Danger (Red)
<CustomButton title="Danger" variant="danger" onPress={() => {}} />

// Warning (Orange)
<CustomButton title="Warning" variant="warning" onPress={() => {}} />
```

## CustomButton Sizes

```typescript
// Small
<CustomButton title="Small" size="small" onPress={() => {}} />

// Medium (Default)
<CustomButton title="Medium" size="medium" onPress={() => {}} />

// Large
<CustomButton title="Large" size="large" onPress={() => {}} />
```

## CustomButton States

```typescript
// Loading state
<CustomButton title="Loading" loading={true} onPress={() => {}} />

// Disabled state
<CustomButton title="Disabled" disabled={true} onPress={() => {}} />

// Full width
<CustomButton title="Full Width" fullWidth={true} onPress={() => {}} />
```

## Text Component

```typescript
// Basic usage with default 16px
<Text>Default Text</Text>

// With custom font size
<Text fontSize={28}>Large Text</Text>
<Text fontSize={14}>Small Text</Text>

// With custom color
<Text color={colors.primary}>Blue Text</Text>
<Text color={colors.textSecondary}>Gray Text</Text>

// With alignment
<Text align="center">Centered Text</Text>
<Text align="left">Left Aligned</Text>
<Text align="right">Right Aligned</Text>

// Combined props
<Text fontSize={20} color={colors.black} align="center">
  Custom Text
</Text>
```

## Card Variants

```typescript
// Elevated (with shadow)
<Card variant="elevated">
  <CustomText>Elevated Card</CustomText>
</Card>

// Outlined (with border)
<Card variant="outlined">
  <CustomText>Outlined Card</CustomText>
</Card>

// Filled (solid background)
<Card variant="filled">
  <CustomText>Filled Card</CustomText>
</Card>
```

## Features

- ✅ Fully typed with TypeScript
- ✅ Responsive scaling built-in
- ✅ Dark mode support
- ✅ Customizable with style props
- ✅ Accessible and semantic
- ✅ Consistent design system

## Best Practices

1. **Always use components instead of raw RN components** for consistency
2. **Use Spacer for spacing** instead of margins
3. **Use predefined text variants** instead of custom font sizes
4. **Use button variants** for semantic meaning (success for positive actions, danger for destructive)
5. **Wrap screens in Container** for consistent layout and safe areas

## Creating New Components

When creating new reusable components:

1. Add TypeScript types for all props
2. Use responsive scaling utilities (`getWidth`, `getHeight`, `getFonts`)
3. Support dark mode with `useColorScheme`
4. Export from `index.ts`
5. Document usage in this file
6. Follow existing naming conventions

## Example Screen

```typescript
import React from 'react';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Container, CustomButton, Text, Card, Spacer } from '../components';
import colors from '../constant/colors';

const ExampleScreen = ({ navigation }) => {
  return (
    <Container center padding>
      <Text fontSize={28} align="center" color={colors.black}>
        Example Screen
      </Text>
      
      <Spacer height={20} />
      
      <Card variant="elevated">
        <Text fontSize={16} color={colors.textSecondary}>
          This screen demonstrates the use of reusable components.
        </Text>
      </Card>
      
      <Spacer height={30} />
      
      <CustomButton
        title="Primary Action"
        variant="primary"
        size="large"
        onPress={() => navigation.goBack()}
      />
      
      <Spacer height={10} />
      
      <CustomButton
        title="Secondary Action"
        variant="secondary"
        size="medium"
        onPress={() => console.log('Secondary')}
      />
    </Container>
  );
};

export default ExampleScreen;
```

---

## BottomSheet

A fully animated modal sheet that slides from the bottom or top of the screen.

### Props

```typescript
interface BottomSheetProps {
  visible: boolean;              // Show/hide the sheet
  onClose: () => void;           // Callback when closed
  children: React.ReactNode;     // Content to display
  height?: number | string;      // Height (e.g., '50%' or 400)
  backgroundColor?: string;      // Background color
  showBackdrop?: boolean;        // Show darkened backdrop
  backdropOpacity?: number;      // Backdrop opacity (0-1)
  borderRadius?: number;         // Corner radius
  animationDuration?: number;    // Animation speed in ms
  disableBackdropPress?: boolean; // Prevent closing on backdrop tap
  position?: 'top' | 'bottom';   // Slide direction
}
```

### Usage

```typescript
import { useState } from 'react';
import { BottomSheet, Text } from '../components';

const MyScreen = () => {
  const [visible, setVisible] = useState(false);

  return (
    <>
      <Button onPress={() => setVisible(true)} title="Show Sheet" />
      
      <BottomSheet
        visible={visible}
        onClose={() => setVisible(false)}
        height="60%"
        borderRadius={24}
      >
        <Text fontSize={20}>Bottom Sheet Content</Text>
      </BottomSheet>
    </>
  );
};
```

### Features

- ✅ Smooth slide-in/out animations
- ✅ Backdrop with configurable opacity
- ✅ Swipe-to-dismiss handle bar
- ✅ Custom height (percentage or pixels)
- ✅ Position from top or bottom
- ✅ Safe area support
- ✅ TypeScript support

---

## ConfirmationBottomSheet

A pre-built confirmation dialog using BottomSheet for better UX than native Alerts.

### Props

```typescript
interface ConfirmationBottomSheetProps {
  visible: boolean;              // Show/hide the confirmation
  onClose: () => void;           // Cancel callback
  onConfirm: () => void;         // Confirm callback
  title: string;                 // Confirmation title
  message: string;               // Confirmation message
  confirmText: string;           // Confirm button text
  cancelText: string;            // Cancel button text
  confirmVariant?: 'primary' | 'secondary' | 'success' | 'danger' | 'warning';
  icon?: string;                 // Emoji icon (default: ⚠️)
  loading?: boolean;             // Show loading on confirm button
}
```

### Usage

```typescript
import { useState } from 'react';
import { ConfirmationBottomSheet } from '../components';

const MyScreen = () => {
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    setLoading(true);
    await deleteItem();
    setLoading(false);
    setShowConfirm(false);
  };

  return (
    <>
      <Button onPress={() => setShowConfirm(true)} title="Delete" />
      
      <ConfirmationBottomSheet
        visible={showConfirm}
        onClose={() => setShowConfirm(false)}
        onConfirm={handleDelete}
        title="Delete Item?"
        message="This action cannot be undone. Are you sure you want to delete this item?"
        confirmText="Delete"
        cancelText="Cancel"
        confirmVariant="danger"
        icon="🗑️"
        loading={loading}
      />
    </>
  );
};
```

### Features

- ✅ Beautiful animated bottom sheet
- ✅ Large emoji icon for visual context
- ✅ Title and descriptive message
- ✅ Primary and secondary buttons
- ✅ Loading state support
- ✅ Button variant customization
- ✅ Better UX than native Alert
- ✅ Consistent design system

### Use Cases

Perfect for:
- Destructive actions (delete, clear data)
- Important confirmations
- Irreversible operations
- User consent prompts

### Example: Clear Data Confirmation

```typescript
// In your hook
const [showClearConfirm, setShowClearConfirm] = useState(false);
const [isClearing, setIsClearing] = useState(false);

const handleClearData = () => setShowClearConfirm(true);

const handleConfirmClear = async () => {
  setIsClearing(true);
  await clearAllData();
  setIsClearing(false);
  setShowClearConfirm(false);
};

// In your component
<ConfirmationBottomSheet
  visible={showClearConfirm}
  onClose={() => setShowClearConfirm(false)}
  onConfirm={handleConfirmClear}
  title="Clear All Data"
  message="Are you sure you want to delete all cow data? This action cannot be undone."
  confirmText="Clear All"
  cancelText="Cancel"
  confirmVariant="danger"
  icon="🗑️"
  loading={isClearing}
/>
```

---

## Best Practices

### 1. **Always Handle Loading States**
```typescript
// Good
<ConfirmationBottomSheet
  loading={isProcessing}
  onConfirm={handleConfirm}
/>

// Bad
<ConfirmationBottomSheet
  onConfirm={async () => { await something(); }} // No loading feedback
/>
```

### 2. **Use Appropriate Variants**
- `danger` - Destructive actions (delete, clear)
- `warning` - Caution required
- `success` - Positive confirmations
- `primary` - General confirmations

### 3. **Clear, Concise Messaging**
- Title: Short, action-oriented (e.g., "Delete Item?")
- Message: Explain consequences clearly
- Buttons: Action verbs (Delete, Clear, Confirm)

### 4. **Choose Right Icons**
- 🗑️ - Delete/Clear
- ⚠️ - Warning/Caution
- ✅ - Confirm/Success
- 🔒 - Security/Lock
- 📤 - Export/Send

---

## Related Documentation

- [Hooks](../hooks/README.md) - Business logic separation
- [Constants](../constant/README.md) - Design tokens
- [Utils](../utils/README.md) - Scaling utilities

---

**Last Updated:** October 2025

