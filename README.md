# My Goals — Firebase edition

A responsive daily goal tracker with Google sign-in and per-user Cloud Firestore storage.

## Firebase setup

1. Create/select a Firebase project and add a Web app.
2. Copy `.env.example` to `.env.local` and fill in the Firebase web app values.
3. Enable Google under Firebase Authentication → Sign-in method.
4. Add `localhost` and your deployed domain under Authentication → Settings → Authorized domains.
5. Create a Cloud Firestore database.
6. Publish `firestore.rules` from this project.

## Run locally

```bash
npm install
npm run dev
```

## Production build

```bash
npm run build
npm run preview
```

Set the same `VITE_FIREBASE_*` values as environment variables in your hosting provider before deployment.

## Firestore structure and write efficiency

Goals are stored individually at:

`users/{uid}/goals/{goalId}`

Each document contains `text`, `date`, `completed`, and `createdAt`.

- Add: one `addDoc` write for the new goal.
- Complete/undo: one `updateDoc` write to the selected goal's `completed` field.
- Delete: one `deleteDoc` for the selected goal.
- Read/sync: one real-time listener on the signed-in user's goals collection.
- No read-before-write, full-day array rewrites, duplicate listener per day, or anonymous auth.

The UI sorts active goals newest-first and completed goals below them. The favicon uses `public/mountain-mark.svg`.

## Note about previous Firebase data

This version uses a per-goal collection rather than the earlier `users/{uid}/days/{date}` document format. If you already added goal data using the earlier Firebase build, it will not appear automatically in this version. Keep the old rules/data until you have migrated any data you need.
