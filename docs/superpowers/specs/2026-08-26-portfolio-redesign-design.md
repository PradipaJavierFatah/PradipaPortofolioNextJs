# Portfolio redesign design

## Design read

This is a developer and data analyst portfolio for recruiters and collaborators. The visual language is quiet editorial: a persistent identity rail, clear navigation, generous spacing, and a restrained grayscale palette with a blue accent.

## Scope

- Preserve the existing portfolio content, project links, images, language toggle, theme toggle, projects route, contact route, and email form behavior.
- Create the redesign in the new cloned folder only.
- Keep the original folder and its uncommitted changes untouched.
- Replace the current centered hero-first homepage with a sidebar and content layout inspired by the supplied reference.

## Visual system

- Base: cool off-white in light mode and deep charcoal in dark mode.
- Accent: one blue accent used for links, focus states, active navigation, and small highlights.
- Type: existing Plus Jakarta Sans loaded with `next/font`, using weight and spacing for hierarchy rather than decorative type.
- Shape: compact rounded controls, restrained radius on media, no excessive floating cards.
- Motion: short reveal transitions and hover feedback only. All motion must respect reduced-motion preferences.

## Homepage structure

1. Identity rail: portrait, name, role, handle, CV link, language control, theme control, and primary navigation.
2. Intro: concise role statement, supporting copy, two actions, and profile image treatment.
3. About and education: existing bio and Binus University information.
4. Experience: the existing journey entries as a readable vertical timeline.
5. Skills: grouped skill lists for data, development, design, and soft skills.
6. Selected work: six existing projects with real local images, category labels, tech stacks, links, and the existing detail modal.
7. Social and contact: existing social links plus a direct contact action.

## Responsive behavior

- Desktop uses a fixed-width identity rail and a wider scrolling content column.
- Tablet collapses the rail to a compact top header while retaining all controls.
- Mobile uses a top bar with a menu button and a single-column content flow.
- All controls retain visible focus states and readable contrast.

## Verification

- Run ESLint and `npm run build` in the new folder.
- Start the production build and inspect the homepage, projects route, and contact route in a browser.
- Verify the original source folder has no new changes.
