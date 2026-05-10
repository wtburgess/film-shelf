---
name: VCR PRIMARY
colors:
  surface: '#131313'
  surface-dim: '#131313'
  surface-bright: '#3a3939'
  surface-container-lowest: '#0e0e0e'
  surface-container-low: '#1c1b1b'
  surface-container: '#201f1f'
  surface-container-high: '#2a2a2a'
  surface-container-highest: '#353534'
  on-surface: '#e5e2e1'
  on-surface-variant: '#e9bcb6'
  inverse-surface: '#e5e2e1'
  inverse-on-surface: '#313030'
  outline: '#af8782'
  outline-variant: '#5e3f3b'
  surface-tint: '#ffb4aa'
  primary: '#ffb4aa'
  on-primary: '#690003'
  primary-container: '#e50914'
  on-primary-container: '#fff7f6'
  inverse-primary: '#c0000c'
  secondary: '#b3c5ff'
  on-secondary: '#002a77'
  secondary-container: '#0047ba'
  on-secondary-container: '#aec1ff'
  tertiary: '#e9c400'
  on-tertiary: '#3a3000'
  tertiary-container: '#c9a900'
  on-tertiary-container: '#4c3f00'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#ffdad5'
  primary-fixed-dim: '#ffb4aa'
  on-primary-fixed: '#410001'
  on-primary-fixed-variant: '#930007'
  secondary-fixed: '#dbe1ff'
  secondary-fixed-dim: '#b3c5ff'
  on-secondary-fixed: '#00174a'
  on-secondary-fixed-variant: '#003ea6'
  tertiary-fixed: '#ffe16d'
  tertiary-fixed-dim: '#e9c400'
  on-tertiary-fixed: '#221b00'
  on-tertiary-fixed-variant: '#544600'
  background: '#131313'
  on-background: '#e5e2e1'
  surface-variant: '#353534'
typography:
  headline-lg:
    fontFamily: Space Mono
    fontSize: 48px
    fontWeight: '700'
    lineHeight: '1.1'
    letterSpacing: -0.05em
  headline-lg-mobile:
    fontFamily: Space Mono
    fontSize: 32px
    fontWeight: '700'
    lineHeight: '1.2'
  headline-md:
    fontFamily: Space Mono
    fontSize: 24px
    fontWeight: '700'
    lineHeight: '1.2'
  body-lg:
    fontFamily: Space Mono
    fontSize: 18px
    fontWeight: '400'
    lineHeight: '1.5'
  body-md:
    fontFamily: Space Mono
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.5'
  label-mono:
    fontFamily: Space Mono
    fontSize: 12px
    fontWeight: '700'
    lineHeight: '1'
spacing:
  unit: 4px
  gutter: 16px
  margin-mobile: 16px
  margin-desktop: 40px
  container-max: 1280px
---

## Brand & Style

The design system is a raw, analog-inspired framework that captures the tactile grit of 1990s video rental culture. It rejects the polished neon of modern "retrowave" in favor of a utilitarian, physical aesthetic. The personality is industrial, authoritative, and slightly worn—evoking the sensory experience of a basement rental shop: the scent of magnetic tape, the hum of a CRT monitor, and the weight of a plastic VHS case.

The design style is **Tactile Brutalism**. It combines the structural rigidity of mid-90s software with physical media textures. High-contrast primary colors serve as functional signals (New Release, Return, Warning) rather than mere decoration. The interface should feel like a machine that has been in operation for decades, featuring heavy screen noise, visible scanline overlays, and surfaces that mimic dark wood shelving and thermal paper receipts.

## Colors

The palette is built on high-chroma primary colors set against deep, atmospheric neutrals.

- **Rental Red (#E50914):** Used for primary actions, "New Releases," and urgent alerts. It is the color of a "Be Kind, Rewind" sticker.
- **Signal Blue (#0047BB):** Used for secondary information, category headers, and steady-state interactive elements.
- **Warning Yellow (#FFD700):** Reserved for highlights, ratings, and cautionary technical data.
- **CRT Black (#0A0A0A):** The base canvas, representing the deep blacks of a tube television.
- **Material Accents:**
    - **Dark Wood (#1A1412):** Used for container backgrounds to simulate rental shelving.
    - **Thermal Paper (#E8E8E4):** Used for data-heavy readouts, receipts, and labels to provide a high-contrast physical substrate.

## Typography

The design system exclusively utilizes **Space Mono** to maintain a consistent technical and nostalgic atmosphere. 

- **Display Text:** Large headlines should use heavy weights with tight tracking to mimic screen-printed video covers. 
- **Body Text:** Maintains a standard mono-spaced rhythm, ensuring legibility against noisy backgrounds.
- **Labels:** Small, uppercase labels should be used for technical metadata (TIMESTAMP, TRACKING, PLAY). 
- **Treatment:** Headlines should occasionally feature a subtle "chromatic aberration" effect (1px red/blue shifts) to simulate CRT bleeding.

## Layout & Spacing

This design system uses a **fixed-step grid** based on 4px increments, echoing the pixel-grid of low-resolution displays.

- **Grid:** A 12-column layout on desktop, collapsing to 4 columns on mobile. 
- **Gutters:** Standardized at 16px to create clear, blocky separation between "tapes" (cards).
- **Margins:** Generous outer margins (40px desktop) to frame the UI like a television screen bezel.
- **Rhythm:** Elements are packed tightly within modules but separated by significant "dead space" or wooden dividers between modules to emphasize the physical separation of media.

## Elevation & Depth

Depth is achieved through physical layering rather than lighting. This system does not use ambient shadows.

1. **The Shelving (Level 0):** The base layer is the Dark Wood texture, representing the back of the store.
2. **The Case (Level 1):** Elements sit in VHS Plastic containers (#121212) with a 1px solid border in Signal Blue or Rental Red.
3. **The Label (Level 2):** Critical information is presented on "Thermal Paper" patches, appearing to be "stuck" onto the plastic containers.
4. **The Screen (Overlay):** A global "Noise & Scanline" layer sits over the entire UI at 5-8% opacity, creating a unified analog texture.
5. **Interactive State:** Hovering over an element should produce a "flicker" effect or a solid Primary Yellow stroke rather than a shadow.

## Shapes

The shape language is strictly **industrial and sharp**. 

- **Radius:** All buttons, cards, and input fields use a 0px radius.
- **Exceptions:** Minor 2px rounds are permitted only on "VHS Plastic" containers to mimic the injection-molded corners of a physical cassette.
- **Lines:** All borders should be 2px minimum. Hairline triggers are prohibited; the interface should feel "heavy."

## Components

- **Buttons:** Large, rectangular blocks with solid color fills. Use Rental Red for primary actions. Text is always uppercase Space Mono Bold. Use a "pressed" state that inverts the colors rather than shifting depth.
- **VHS Cards:** These represent the core content unit. They feature a vertical aspect ratio, a "title spine" in Signal Blue, and a main image area with a heavy grain filter.
- **Input Fields:** Styled as "Status Windows." Black backgrounds with a 2px Signal Blue border. The cursor should be a solid yellow block.
- **Chips/Badges:** Styled as price stickers or "Be Kind Rewind" labels. Often angled slightly (3 degrees) to break the digital grid and feel "hand-placed."
- **Progress Bars:** Represented as "Tape Progress." A solid Signal Blue track with a Warning Yellow "playhead" indicator.
- **Modals:** Styled to look like the "Setup Menu" of an old VCR—blue background, white mono-spaced text, and no images.