---
name: Artisan Epicuress B2B
colors:
  surface: '#fcf9f8'
  surface-dim: '#dcd9d9'
  surface-bright: '#fcf9f8'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f6f3f2'
  surface-container: '#f0eded'
  surface-container-high: '#eae7e7'
  surface-container-highest: '#e4e2e1'
  on-surface: '#1b1c1c'
  on-surface-variant: '#57423f'
  inverse-surface: '#303030'
  inverse-on-surface: '#f3f0ef'
  outline: '#8a716e'
  outline-variant: '#ddc0bb'
  surface-tint: '#a23d30'
  primary: '#2c0000'
  on-primary: '#ffffff'
  primary-container: '#530201'
  on-primary-container: '#de6959'
  inverse-primary: '#ffb4a8'
  secondary: '#765935'
  on-secondary: '#ffffff'
  secondary-container: '#fed6a9'
  on-secondary-container: '#795b37'
  tertiary: '#00140c'
  on-tertiary: '#ffffff'
  tertiary-container: '#0f2a20'
  on-tertiary-container: '#769384'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#ffdad4'
  primary-fixed-dim: '#ffb4a8'
  on-primary-fixed: '#410000'
  on-primary-fixed-variant: '#83261b'
  secondary-fixed: '#ffddb8'
  secondary-fixed-dim: '#e7c094'
  on-secondary-fixed: '#2a1700'
  on-secondary-fixed-variant: '#5c4220'
  tertiary-fixed: '#cbead9'
  tertiary-fixed-dim: '#afcdbd'
  on-tertiary-fixed: '#042016'
  on-tertiary-fixed-variant: '#314c40'
  background: '#fcf9f8'
  on-background: '#1b1c1c'
  surface-variant: '#e4e2e1'
typography:
  display-lg:
    fontFamily: Vazirmatn
    fontSize: 32px
    fontWeight: '700'
    lineHeight: 44px
    letterSpacing: -0.02em
  display-md:
    fontFamily: Vazirmatn
    fontSize: 26px
    fontWeight: '700'
    lineHeight: 38px
    letterSpacing: -0.015em
  headline-lg:
    fontFamily: Vazirmatn
    fontSize: 22px
    fontWeight: '600'
    lineHeight: 32px
  headline-md:
    fontFamily: Vazirmatn
    fontSize: 19px
    fontWeight: '600'
    lineHeight: 28px
  headline-sm:
    fontFamily: Vazirmatn
    fontSize: 17px
    fontWeight: '600'
    lineHeight: 26px
  body-lg:
    fontFamily: Vazirmatn
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 26px
  body-md:
    fontFamily: Vazirmatn
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 22px
  body-sm:
    fontFamily: Vazirmatn
    fontSize: 13px
    fontWeight: '400'
    lineHeight: 20px
  label-lg:
    fontFamily: Vazirmatn
    fontSize: 14px
    fontWeight: '500'
    lineHeight: 20px
  label-md:
    fontFamily: Vazirmatn
    fontSize: 12px
    fontWeight: '500'
    lineHeight: 18px
  label-sm:
    fontFamily: Vazirmatn
    fontSize: 11px
    fontWeight: '500'
    lineHeight: 16px
  caption:
    fontFamily: Vazirmatn
    fontSize: 10px
    fontWeight: '500'
    lineHeight: 14px
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  gutter: 1rem
  margin: 1rem
  space-xs: 0.25rem
  space-sm: 0.5rem
  space-md: 1rem
  space-lg: 1.5rem
  space-xl: 2rem
---

## Brand & Style

This design system establishes an understated, ultra-refined mobile-first commerce environment for fine foods purveyors, restaurateurs, and boutique epicurean buyers. Drawing inspiration from modern high-end editorial layouts and the quiet precision of Linear and Apple HIG, the aesthetic combines warm, tactile canvas tones with deep, authoritative gastronomy accents.

### Aesthetic Tone
- **Minimalist Luxury:** Uncluttered viewports prioritizing provenance, grade, vintage, and wholesale lot pricing over decorative excess.
- **Warm Editorial Polish:** Crisp typography, generous breathing room, hair-thin hairline borders, and pure white product stages on warm tinted limestone backdrops.
- **Native Precision:** Built specifically for iOS and Android ergonomic thumb-zones, intuitive gestures, and seamless Persian (RTL) reading flow.

## Colors

The palette establishes an immediate sensation of mature, aged culinary craft—charcuterie, preserved wheels, and vintage curation.

- **Primary (`#530201`):** Deep Burgundy. Used deliberately for focal moments, high-level tier confirmation, primary brand actions, and prominent price figures.
- **Secondary (`#9E7D56`):** Aged Rind / Tawny Gold. Serves as an accent for batch designations, curatorial awards, and VIP wholesaler statuses.
- **Tertiary (`#2F4A3E`):** Cellar Olive. Reserved for stock availability indicators, live order dispatches, and verification badges.
- **Canvas / Background (`#F8F7F5`):** Warm unbleached linen canvas that softens screen glare under kitchen or warehouse lighting.
- **Surface / Card (`#FFFFFF`):** Pure white flat surfaces providing crisp focus for high-resolution product photography.
- **Secondary Background (`#F1EFEC`):** Subdued stone-tinted fill for structural wells, quantity pickers, and grouped metadata pods.
- **Hairline Border (`#E8E6E3`):** Neutral delineator replacing drop shadows for clean spatial zoning.
- **Primary Text (`#242424`):** Deep charcoal delivering high legibility and soft contrast against the warm canvas.
- **Secondary Text (`#777777`):** Refined mid-tone grey for weights, lot numbers, SKU labels, and packaging specifications.

## Typography

Typography is set exclusively in **Vazirmatn**, tailored to provide natural Persian text flow, proportional vertical metrics, and baseline balance. 

- **Right-to-Left (RTL) Fidelity:** Numerical units (e.g., kg, wheel counts, pricing in Tomans/Currency) sit aligned with standard Persian baseline curves.
- **Hierarchical Balance:** Restrained display sizing avoids bulky headlines on compact viewports while maintaining an editorial tone.
- **Tabular Figures:** Numbers in ledger tables, wholesale MOQ tiers, and inventory stockcounts utilize fixed-width figure alignments to ensure vertical scanability.

## Layout & Spacing

The structural layout adheres to an unyielding 8px spatial grid, optimized for fluid mobile touch interaction and screen real estate management.

### Mobile Grid & Viewport
- **Screen Margin:** Strict `16px` (`margin`) outer padding ensures maximum content visibility without edge crowding on curved device borders.
- **Column Structure:** Fluid 4-column system for standard phone screens; shifts to 8 columns on tablet devices.
- **Section Breaks:** Spaced using `space-lg` (`24px`) or `space-xl` (`32px`) to delineate catalog categories and order details cleanly.
- **Thumb Reach Rhythm:** Interactive controls (quick-order paddles, floating summary bars, filters) must sit within a bottom-safe touch zone of 48px to 72px from the device home indicator.

## Elevation & Depth

In keeping with a minimal luxury aesthetic, heavy shadows and simulated elevations are prohibited. Depth is articulated purely through layered surface tones and subtle structural hairlines.

- **Flat Layering:** Canvas (`#F8F7F5`) acts as the base plane. Raised content zones rest on `#FFFFFF` surfaces bounded by a single `1px` border of `#E8E6E3`.
- **Secondary Wells:** Depressed areas (such as order breakdown panels, bulk tier matrices, or search inputs) utilize `#F1EFEC` without inner shadows.
- **Modal Sheets & Overlays:** Bottom sheets and contextual menus use a flat `#FFFFFF` surface with an upper perimeter outline of `#E8E6E3` alongside a translucent backdrop scrim (`rgba(36, 36, 36, 0.25)`).
- **Zero Heavy Shadows:** Standard drop shadows (`box-shadow`) are set to `none`. Where visual elevation is required for fixed floating action bars, use a diffused, ambient occlusion of `0 4px 20px rgba(0, 0, 0, 0.03)`.

## Shapes

The design uses tight, architectural corner radii to evoke precision, vintage label geometries, and high-end packaging.

- **Standard Containers (`4px` / `roundedness: 1`):** Applied to cards, input fields, and badges to give an engineered, tactile feel.
- **Larger Modular Blocks (`8px` / `rounded-lg`):** Reserved for full product cards, bottom sheets, and multi-line checkout summaries.
- **Action Pills:** Filter tags and live inventory state pills retain a controlled `4px` or full oval radius depending on whether they represent selectable attributes or status indicators.

## Components

### Buttons
- **Primary Action:** Solid Burgundy (`#530201`) fill with `#FFFFFF` text. Height of `48px` to guarantee accessible mobile touch targets. Sharp `4px` corner radius. Zero shadow.
- **Secondary / Ghost:** Transparent base with a `1px` border of `#530201` and Burgundy text, or an understated hairline `#E8E6E3` with `#242424` text.
- **Disabled State:** Filled with `#F1EFEC` using `#777777` typography; completely flat.

### Input Fields & Search
- Base surface set to `#FFFFFF` (or `#F1EFEC` for global search headers) wrapped in a `1px` `#E8E6E3` border.
- Text aligns consistently right for Persian inputs. Placeholder copy set in `#777777`.
- Focus state switches the border cleanly to `#530201` without colored drop glows.

### Product & Inventory Cards
- Constructed with `#FFFFFF` background, wrapped in a uniform `1px` `#E8E6E3` outline.
- Layout emphasizes photography on top, followed by grade markers (e.g., *Parmigiano Reggiano 24M*, *Wagyu A5*), packaging units, per-kg price in `#242424`, and wholesale lot minimums in `#777777`.
- No nested cards or layered drop shadows inside lists.

### Wholesale Quantity Counter (Steppers)
- Modular stepper component spanning `36px` height.
- Background `#F1EFEC` with Burgundy icon indicators (`+` and `−`) and central Persian numerals in bold weight.

### Chips & Attribute Selectors
- Used for cheese aging brackets, cuts of beef, temperature logistics, and delivery routes.
- Inactive: `#FFFFFF` surface with `#E8E6E3` border and `#777777` label.
- Active: `#530201` border with a subtle `#530201` text color or full Burgundy fill with white text.

### Lists & Tables
- Border-separated single items using 1px `#E8E6E3` dividing lines.
- Dense vertical padding (`12px` top and bottom) for high SKU readability during inventory replenishment.