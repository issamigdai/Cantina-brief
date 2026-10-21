What I learned (Tailwind and front-end basics)

For the canteen dashboard I used Tailwind CSS with the CDN script. I did not write a CSS file. I put small classes directly on the HTML elements.

For example, a card has these classes: flex flex-col gap-2 p-3 rounded-lg border border-slate-300 bg-white. It means a column layout, a small gap, some padding, round corners, a light grey border and a white background.

Spacing uses units of 4px, so p-3 is 12px and h-10 is 40px. Square brackets give an exact size, like w-[212px].

Colors have a name and a number, like bg-indigo-600. A small number is light and a big number is dark.

I used flex, flex-col, justify-between, items-center and gap to place things on the page. The hover: prefix makes a style work only when the mouse is on the element.

Some things surprised me. Tailwind removes the default style of headings, so I have to set their size myself. The big tag is inline, so it needs the block class. In the popup, hidden wins over flex, so the popup stays invisible until hidden is removed.

To match the Figma image, I looked at the sizes and changed them into Tailwind numbers. For example, six cards with 12px between them became flex-1 on each card and gap-3 on the row.

I also saw some mistakes in my HTML that I still need to fix. The same id is used many times. The label for="#" is not linked to anything. The Fermer button is not closed. The big tag is outdated. The page says lang="en" but the text is French. There is a typo in Accuiel. The options in the selects are fake.

Not done yet: progress bars, toasts, dark mode and a layout for small screens.

Next step is JavaScript. It will handle the 50 DH rule, the toasts, the popup and the stats. Tailwind only changes how things look. JavaScript makes things work.