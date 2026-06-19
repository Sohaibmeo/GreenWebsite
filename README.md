
  # Finalize consultancy design

  This is a code bundle for Finalize consultancy design. The original project is available at https://www.figma.com/design/SMcv0etdW15Z2Vb0EPEgr2/Finalize-consultancy-design.

  ## Running the code

  Run `npm i` to install the dependencies.

  Run `npm run dev` to start the development server.

  ## Contact form email setup

  The contact form posts to the serverless endpoint in `api/contact.ts` and sends email using Resend.

  Required environment variables:

  - `RESEND_API_KEY` = your Resend API key
  - `FROM_EMAIL` = verified sender address in Resend (example: `Consultancy <no-reply@yourdomain.com>`)

  For local testing of both frontend and serverless API together, run:

  - `npm run dev:full`

  For Vercel:

  1. Add `RESEND_API_KEY` and `FROM_EMAIL` in your Vercel project Environment Variables.
  2. Redeploy the project.
  3. Submit the form from the live site.
  