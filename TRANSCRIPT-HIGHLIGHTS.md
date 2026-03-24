# Transcript Highlights

**1. Vercel Deployment Challenges (Chat 1)**
`#debugging` `#iterative-development`

I deployed early in development and hit a cascade of config issues — `vite` in the wrong dependencies, a hardcoded build command overriding my `vercel.json`, and the root directory pointing one level too high. Each fix revealed the next problem, teaching me that deployment debugging is iterative and that small config details have real consequences.

---

**2. Routes live in `main.jsx` vs `App.jsx` (Chat 2)**
`#human-judgment` `#iterative-development`

After Claude placed the routes in `main.jsx` instead of `app.jsx` as I have usually done, I pushed back and asked for reasoning before accepting the decision. Claude offered to move the routes into `app.jsx`, but after understanding the rationale I chose to keep them in `main.jsx` — reflecting my learning experience through questions and pushing back against AI to understand deeper.

---

**3. Execution prompt referencing an existing plan doc (Chat 3)**
`#good-prompt-quality` `#planning-and-architecture`

I started Chat 3 by pointing Claude directly to a pre-written plan doc within the folder and instructing it to plan and understand the project and requirements fully before writing code. I also encouraged it to ask questions rather than making assumptions when building. The result was a clean 6-step implementation with no clarification needed, reinforcing that a well-structured prompt with existing context produces significantly better output.

---

**4. "Planning and reviewing options before building" (Chat 6)**
`#planning-feature` `#human-judgment`

Before updating the "How It Works" section on the home page, I asked Claude to show me options before immediately updating the code and then I chose from the three alternatives it generated. Slowing down the AI and getting it to plan first kept me in control of the decisions and produced a project directly influenced by me.

---

**5. Search lingering after a successful trip add (Chat 6)**
`#human-judgment` `#iterative-development`

After adding a trip, the search field kept showing the old query, making the new entry invisible in filtered results and causing the user to believe adding the new trip had failed. The fix was a single `setSearch('')` line, but catching it through testing and interacting with the website showed me that a working feature can still communicate failure through its UI. This is why it's so important to test every feature and small detail by hand, rather than assuming it just works (especially if no error messages are visible).
