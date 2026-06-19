
  # Finalize consultancy design

  This is a code bundle for Finalize consultancy design. The original project is available at https://www.figma.com/design/SMcv0etdW15Z2Vb0EPEgr2/Finalize-consultancy-design.

  ## Running the code

  Run `npm i` to install the dependencies.

  Run `npm run dev` to start the development server.

  ## Contact form email setup

  The contact form posts to the serverless endpoint in `api/contact.ts` and sends email through SMTP.

  Required environment variables:

  - `SMTP_HOST` = your SMTP host
  - `SMTP_PORT` = your SMTP port, usually `587`
  - `SMTP_USER` = your SMTP username
  - `SMTP_PASS` = your SMTP password or app password
  - `SMTP_FROM` = verified sender address, usually the same as `SMTP_USER`

  For Gmail, use a Google App Password and set `SMTP_HOST=smtp.gmail.com`, `SMTP_PORT=587`, `SMTP_SECURE=false`, `SMTP_USER=yourgmail@gmail.com`, and `SMTP_PASS=your 16-character app password`.

  For local testing of both frontend and serverless API together, run:

  - `npm run dev:full`

  For Vercel:

  1. Add `RESEND_API_KEY` and `FROM_EMAIL` in your Vercel project Environment Variables.
  2. Redeploy the project.
  3. Submit the form from the live site.
  