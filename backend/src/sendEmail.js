import nodemailer from 'nodemailer'

function isSmtpConfigured() {
  return Boolean(
    process.env.SMTP_HOST &&
      process.env.SMTP_USER &&
      process.env.SMTP_PASS
  )
}

function buildTransport() {
  return nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT ?? 587),
    secure: process.env.SMTP_SECURE === 'true',
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  })
}

export function buildEmail(kind, fields) {
  if (kind === 'sample-request') {
    return {
      subject: `Sample request — ${fields.name} (${fields.country})`,
      replyTo: fields.email,
      text: [
        `Name: ${fields.name}`,
        fields.company && `Company: ${fields.company}`,
        `Email: ${fields.email}`,
        `Country: ${fields.country}`,
        `Shipping address: ${fields.address}`,
        `Categories of interest: ${fields.interests.join(', ')}`,
        fields.message && `Message: ${fields.message}`,
      ]
        .filter(Boolean)
        .join('\n'),
    }
  }

  return {
    subject: `Quote request: ${fields.category} — ${fields.name} (${fields.country})`,
    replyTo: fields.email,
    text: [
      `Name: ${fields.name}`,
      fields.company && `Company: ${fields.company}`,
      `Email: ${fields.email}`,
      `Country: ${fields.country}`,
      `Product category: ${fields.category}`,
      `Estimated quantity: ${fields.quantity}`,
      fields.message && `Message: ${fields.message}`,
    ]
      .filter(Boolean)
      .join('\n'),
  }
}

export async function sendEnquiryEmail(kind, fields) {
  const email = buildEmail(kind, fields)

  if (!isSmtpConfigured()) {
    console.log('--- DEV MODE: SMTP not configured, email printed instead ---')
    console.log(`To: ${process.env.ENQUIRY_TO ?? 'greenpackmart@gmail.com'}`)
    console.log(`Subject: ${email.subject}`)
    console.log(`Reply-To: ${email.replyTo}`)
    console.log(email.text)
    console.log('---')
    return { delivered: false }
  }

  const transport = buildTransport()
  await transport.sendMail({
    from: `"GreenPackMart Website" <${process.env.SMTP_USER}>`,
    to: process.env.ENQUIRY_TO ?? process.env.SMTP_USER,
    replyTo: email.replyTo,
    subject: email.subject,
    text: email.text,
  })
  return { delivered: true }
}
