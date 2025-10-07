# Custom Hooks

This directory contains custom hooks that encapsulate the business logic for each screen. This separation of concerns makes the code more maintainable, testable, and reusable.

## Architecture

The hooks follow a pattern where:
- **Business Logic** lives in the hooks
- **UI Components** live in the screens
- **Data Management** lives in the Context API

This separation allows for:
- ✅ Easier testing of business logic
- ✅ Better code organization
- ✅ Reusable logic across components
- ✅ Cleaner component files focused on UI

---

## Available Hooks

### 1. `useCowList`

**Purpose:** Manages all business logic for the Cow List screen.

**Usage:**
```typescript
import { useCowList } from '../../hooks';

const CowListScreen = ({ navigation }) => {
  const {
    loading,
    refreshing,
    filters,
    cows,
    filteredCows,
    allPens,
    statusOptions,
    showClearConfirmation,
    isClearing,
    onRefresh,
    formatDate,
    getStatusColor,
    getGradientColors,
    handleSearchChange,
    handleStatusFilter,
    handlePenFilter,
    handleCowPress,
    handleAddCowPress,
    handleClearData,
    handleCloseClearConfirmation,
    handleConfirmClearData,
    keyExtractor,
    handleAllPensPress,
  } = useCowList(navigation);

  // Use the returned values in your UI
  return (
    <>
      {/* Your list UI */}
      
      <ConfirmationBottomSheet
        visible={showClearConfirmation}
        onClose={handleCloseClearConfirmation}
        onConfirm={handleConfirmClearData}
        loading={isClearing}
      />
    </>
  );
};
```

**Returns:**
- **State:**
  - `loading`: Boolean indicating if data is loading
  - `refreshing`: Boolean indicating if pull-to-refresh is active
  - `filters`: Current filter state
  - `cows`: All cows array
  - `filteredCows`: Filtered cows based on search/filters
  - `allPens`: Array of unique pen names
  - `statusOptions`: Array of status filter options
  - `showClearConfirmation`: Boolean for bottom sheet visibility
  - `isClearing`: Boolean indicating if clear operation is in progress

- **Handlers:**
  - `onRefresh()`: Pull-to-refresh handler
  - `formatDate(dateString)`: Format date for display
  - `getStatusColor(status)`: Get color based on status
  - `getGradientColors(status)`: Get gradient colors based on status
  - `handleSearchChange(text)`: Handle search input
  - `handleStatusFilter(status)`: Handle status filter selection
  - `handlePenFilter(pen)`: Handle pen filter selection
  - `handleCowPress(cowId)`: Navigate to cow detail
  - `handleAddCowPress()`: Navigate to add cow screen
  - `handleClearData()`: Show confirmation bottom sheet
  - `handleCloseClearConfirmation()`: Close confirmation bottom sheet
  - `handleConfirmClearData()`: Execute clear data operation
  - `keyExtractor(item)`: FlatList key extractor
  - `handleAllPensPress()`: Reset pen filter

---

### 2. `useAddCow`

**Purpose:** Manages all business logic for the Add Cow screen.

**Usage:**
```typescript
import { useAddCow } from '../../hooks';

const AddCowScreen = ({ navigation }) => {
  const {
    initialValues,
    validationSchema,
    handleCancel,
    handleSubmit,
    createFieldHandlers,
  } = useAddCow(navigation);

  // Use with Formik
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}>
      {({ setFieldValue }) => {
        const {
          handleSelectMale,
          handleSelectFemale,
          handleSelectActive,
          handleSelectInTreatment,
          handleSelectDeceased,
        } = createFieldHandlers(setFieldValue);

        // Use the handlers in your form
      }}
    </Formik>
  );
};
```

**Returns:**
- **Form Config:**
  - `initialValues`: Initial form values for Formik
  - `validationSchema`: Yup validation schema

- **Handlers:**
  - `handleCancel()`: Navigate back without saving
  - `handleSubmit(values, formikHelpers)`: Submit form and save cow
  - `createFieldHandlers(setFieldValue)`: Create field-specific handlers
    - `handleSelectMale()`: Set sex to Male
    - `handleSelectFemale()`: Set sex to Female
    - `handleSelectActive()`: Set status to Active
    - `handleSelectInTreatment()`: Set status to In Treatment
    - `handleSelectDeceased()`: Set status to Deceased

---

### 3. `useCowDetail`

**Purpose:** Manages all business logic for the Cow Detail screen.

**Usage:**
```typescript
import { useCowDetail } from '../../hooks';

const CowDetailScreen = ({ route }) => {
  const {
    cow,
    gradientColors,
    statusColor,
    formatDate,
    formatShortDate,
  } = useCowDetail(route);

  if (!cow) {
    return <Text>Cow not found</Text>;
  }

  // Use the returned values in your UI
};
```

**Returns:**
- **Data:**
  - `cow`: The cow object (or undefined if not found)
  - `gradientColors`: Gradient color array based on cow status
  - `statusColor`: Status badge color

- **Formatters:**
  - `formatDate(dateString)`: Format date with time
  - `formatShortDate(dateString)`: Format date only

- **Helpers:**
  - `getStatusColor(status)`: Get color for a status
  - `getGradientColors(status)`: Get gradient colors for a status

---

## Benefits of This Approach

### 1. **Separation of Concerns**
- Business logic is isolated from UI rendering
- Components are purely presentational
- Easier to understand and maintain

### 2. **Testability**
- Hooks can be tested independently
- Mock navigation and context easily
- Test business logic without rendering components

### 3. **Reusability**
- Logic can be reused across multiple components
- Consistent behavior across the app
- DRY (Don't Repeat Yourself) principle

### 4. **Performance**
- All callbacks are memoized with `useCallback`
- Prevents unnecessary re-renders
- Optimized for React's rendering cycle

### 5. **Type Safety**
- Full TypeScript support
- Type inference for all returned values
- Compile-time error checking

---

## Best Practices

### 1. **Keep Hooks Focused**
- One hook per screen/feature
- Single responsibility principle
- Clear naming convention

### 2. **Memoize Everything**
- Use `useCallback` for functions
- Use `useMemo` for computed values
- Prevent unnecessary re-renders

### 3. **Handle Side Effects Properly**
- Use `useLayoutEffect` for header setup
- Use `useEffect` for data fetching
- Clean up side effects when needed

### 4. **Type Everything**
- Provide proper TypeScript types
- Define return types explicitly
- Use type inference where appropriate

### 5. **Document Well**
- Add JSDoc comments for complex logic
- Include usage examples
- Document return values and parameters

---

## Adding New Hooks

When creating a new hook:

1. Create the hook file: `src/hooks/useFeatureName.ts`
2. Export from `src/hooks/index.ts`
3. Follow the existing patterns
4. Add documentation here
5. Add tests if applicable

Example:
```typescript
// src/hooks/useFeatureName.ts
import { useCallback } from 'react';

export const useFeatureName = (navigation: NavigationType) => {
  const handleAction = useCallback(() => {
    // Logic here
  }, []);

  return {
    handleAction,
  };
};
```

---

## Related Documentation

- [Context API](../context/README.md) - Data management
- [Screens](../screens/README.md) - UI components
- [Types](../types/README.md) - TypeScript definitions

---

**Last Updated:** October 2025

