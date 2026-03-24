# Transcript Highlights

---

**1. Three sequential Vercel deployment failures (Chat 1)**
`#debugging`

Three distinct root causes, one after another: `vite` in `devDependencies`, a hardcoded Vercel dashboard command overriding `vercel.json`, then the root directory pointing to the repo root instead of `travel-diary/`. Each fix revealed the next problem, making for a layered debugging narrative.

---

**2. Routes in `main.jsx` vs `App.jsx` (Chat 2)**
`#human-judging-ai-output` `#iterative-development`

The user pushed back on where the routes lived. Rather than just moving them, they wanted to understand *why* the decision was made — and the assistant explained the tradeoff clearly. The user chose to leave it as-is after understanding. A good example of a conversation becoming a learning moment rather than just a task.

---

**3. Execution prompt referencing an existing plan doc (Chat 3)**
`#good-prompt-quality` `#planning-feature`

The opening prompt of Chat 3: *"Read the implementation plan in plan1.md and start executing once project requirements and codebase are understood. Prioritize asking questions over making assumptions."* This prompt references a pre-written artifact, scopes the task to understanding before acting, and sets an explicit behavioral priority — leading to a clean 6-step implementation with no back-and-forth clarification needed.

---

**4. Explaining the "disappearing edit entry" line (Chat 3)**
`#human-judging-ai-output`

After implementing `.filter(t => t.id !== editingId)`, the user came back and asked specifically to explain that line. It was a small feature but the user wanted to understand the mechanism, not just use it.

---

**5. "Let's make a plan first before editing code" (Chat 6)**
`#planning-feature` `#human-judging-ai-output`

Before updating the "How It Works" section (which referenced sign-up/auth that had been removed), the user explicitly asked to plan before writing any code. The assistant proposed three reframing options; the user evaluated them and chose Option A — repositioning the steps around the app's core features. A clear case of the user directing the process and selecting from AI-generated alternatives.

---

**6. Search lingering after a successful trip add (Chat 6)**
`#human-judging-ai-output` `#iterative-development`

After submitting a new trip, the search field kept showing the old query, so the new entry didn't appear in filtered results — making the user think the save had failed. The fix was a single `setSearch('')` in `handleSubmit`, but the bug itself is a strong UX catch: the feature worked correctly, but the UI communicated failure. The user identified this by observing behavior, not an error message.