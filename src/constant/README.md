# Constants

This directory contains all application constants including colors, fonts, and strings.

## 📂 Files

### colors.ts
Defines the color palette for the entire application.

**Available Colors:**
```typescript
import colors from './colors';

colors.primary         // #007AFF (Blue)
colors.secondary       // #5856D6 (Purple)
colors.success         // #34C759 (Green)
colors.danger          // #FF3B30 (Red)
colors.warning         // #FF9500 (Orange)
colors.info            // #5AC8FA (Cyan)

colors.black           // #000000
colors.white           // #FFFFFF
colors.gray            // #8E8E93
colors.lightGray       // #C7C7CC
colors.darkGray        // #48484A

colors.background      // #FFFFFF (Light mode)
colors.backgroundDark  // #1C1C1E (Dark mode)

colors.text            // #000000
colors.textSecondary   // #666666
colors.textLight       // #999999
colors.textDark        // #FFFFFF

colors.border          // #E5E5EA
colors.borderDark      // #38383A
```

### FontName.ts
Defines font family constants for the application.

**Available Fonts:**
```typescript
import { FontName } from './FontName';

FontName.Poppins           // 'Poppins-Regular'
FontName.PoppinsBold       // 'Poppins-Bold'
FontName.PoppinsSemiBold   // 'Poppins-SemiBold'
FontName.PoppinsMedium     // 'Poppins-Medium'
FontName.PoppinsLight      // 'Poppins-Light'
```

### strings.data.ts
Centralized string management for internationalization (i18n).

**Structure:**
```typescript
export const stringsData = {
  screens: {
    screenName: {
      title: 'Screen Title',
      button: 'Button Text',
    },
  },
  common: {
    loading: 'Loading...',
    error: 'Error',
  },
} as const;
```

### strings.ts
Utility functions to access strings from JSON.

**Functions:**
```typescript
import { strings, getString } from './strings';

// Type-safe access
const title = strings.screens.home.title;

// Dynamic access
const dynamicString = getString('screens.home.title');
```

## 🎨 Usage Examples

### Using Colors
```typescript
import colors from '../constant/colors';

<View style={{ backgroundColor: colors.primary }}>
  <Text style={{ color: colors.white }}>Hello</Text>
</View>
```

### Using Fonts
```typescript
import { FontName } from '../constant/FontName';
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  title: {
    fontFamily: FontName.PoppinsBold,
  },
  body: {
    fontFamily: FontName.Poppins,
  },
});
```

### Using Strings
```typescript
import { strings } from '../constant';

// In Text component
<Text>{strings.screens.home.title}</Text>

// In Button
<CustomButton title={strings.common.save} />
```

## 🌍 Internationalization (i18n) Setup

To add multiple language support:

1. Create language-specific TypeScript files:
   - `strings.en.ts` (English)
   - `strings.es.ts` (Spanish)
   - `strings.fr.ts` (French)

2. Update `strings.ts`:
```typescript
import { stringsData as en } from './strings.en';
import { stringsData as es } from './strings.es';

const translations = { en, es };
const currentLanguage = 'en'; // Get from device settings or user preference

export const strings = translations[currentLanguage];
```

3. Use a library like `react-i18next` for advanced features:
   - Language switching
   - Pluralization
   - Date/time formatting
   - Number formatting

## 📋 Best Practices

1. **Always use constants** instead of hardcoding values
2. **Never duplicate colors** - use the defined palette
3. **Group related strings** by screen/feature in JSON
4. **Add common strings** to the `common` section
5. **Update strings.json** when adding new text
6. **Use descriptive keys** for strings (e.g., `submitButton` not `btn1`)

## 🔄 Adding New Constants

### Adding a New Color:
```typescript
// colors.ts
const colors = {
  // ... existing colors
  newColor: '#123456',
} as const;
```

### Adding a New String:
```typescript
// strings.data.ts
export const stringsData = {
  screens: {
    // ... existing screens
    newScreen: {
      title: 'New Screen',
      description: 'Description here',
    },
  },
} as const;
```

### Adding a New Font:
```typescript
// FontName.ts
export const FontName = {
  // ... existing fonts
  NewFont: 'NewFont-Regular',
} as const;
```

## 🎯 Benefits

- **Consistency**: Same colors and fonts throughout the app
- **Maintainability**: Change once, apply everywhere
- **Type Safety**: TypeScript autocomplete and error checking
- **i18n Ready**: Easy to add multiple languages
- **Theming**: Easy to implement light/dark themes
- **Scalability**: Add new constants without refactoring

