const sgMail = require('@sendgrid/mail')

// const sendgridAPIKey = "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"

sgMail.setApiKey(process.env.SENDGRID_API_KEY)

const sendWelcomeEmail = (email, name) => {
    sgMail.send({
        to: email,
        from: 'rajcreo6908@gmail.com',
        subject: 'Thanks for joining in!',
        text: `Welcome to the app, ${name}. Let me know how you get along with the app`
    })
}

const sendCancelationEmail = (email, name) => {
    sgMail.send({
        to: email,
        from: 'rajcreo6908@gmail.com',
        subject: 'Sorry to see you go!',
        text: `Goodbye ${name}. I hope to see you back sometime soon`
    })
}

module.exports = {
    sendWelcomeEmail,
    sendCancelationEmail
}


