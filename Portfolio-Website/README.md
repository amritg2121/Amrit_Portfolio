# Portfolio website

Plain HTML, CSS and JavaScript. No build step, no install.

## Files
- `index.html`  all the text and links (this is the file you edit)
- `style.css`   colours, fonts and layout
- `script.js`   menu, live previews and the contact form
- `images/`     your photo and any screenshots
- `resume.pdf`  add your own file with this exact name (the "Download resume" button opens it)

## What to change in index.html
Open it in any editor and use Find (Ctrl + F) for each of these:

| Search for | What to do |
|---|---|
| `you@example.com` | Replace with your email. It appears 3 times (hero, contact, form). |
| `linkedin.com/in/your-name` | Replace with your LinkedIn address. It appears 2 times. |
| `[` | Replace every text in square brackets: project 3 and the Education section. |
| `food-delivery-website-lovat` | Check this is the right live link for AmrFood. |
| `Amrit Kumar Gupta` | Change if your name should appear differently. |
| `About me` section | Rewrite the paragraphs so they sound like you. |

## Add your photo and resume
1. Save your photo as `images/profile.jpg`.
2. Save your resume as `resume.pdf` next to `index.html`.

## Project 3
Copy the whole Project 2 block (from `<article class="project project-flip">` to its `</article>`),
paste it over the placeholder, and change the text and links. Delete the placeholder block.

## Use a screenshot instead of the live preview
Replace the `<iframe ...></iframe>` line of a project with:

    <img src="images/amrfood.png" alt="Screenshot of AmrFood" style="position:absolute;inset:0;width:100%;height:100%;object-fit:cover">

## Put it online with Vercel
1. Create a new GitHub repository, for example `portfolio`.
2. Upload the files from inside this folder (select everything inside it, then drag). Do not upload the zip and do not upload the folder itself.
3. In Vercel choose Add New, then Project, and import the repository.
4. Set Application Preset to `Other`, leave Root Directory empty, and click Deploy.

## Contact form
The form opens the visitor's email app with the message filled in, so it works without a server.
