# ethereal

A quiet, single-purpose page built around the 36 Questions (Aron et al.) for
increasing closeness — the same set popularized by the NYT and Remento's
"36 Questions to Fall in Love" journal piece.

One button. Press it to draw a random question. Each question is drawn once;
the deck reshuffles only when you choose to begin again.

## Running locally

No build step — it's plain HTML/CSS/JS.

```bash
python3 -m http.server 8000
```

Then open `http://localhost:8000`.

## Files

- `index.html` — page structure
- `style.css` — ethereal visual design (aurora background, glass card, serif type)
- `questions.js` — the 36 questions
- `script.js` — shuffle/draw/no-repeat logic with localStorage persistence
