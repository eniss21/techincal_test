const brevo = require("@getbrevo/brevo");

const apiInstance = new brevo.TransactionalEmailsApi();
apiInstance.setApiKey(
  brevo.TransactionalEmailsApiApiKeys.apiKey,
  process.env.BREVO_API_KEY
);

const sendExpenseEmail = async (totalAmount, recipientEmail, recipientName) => {
  try {
    const sendSmtpEmail = {
      sender: {
        name: process.env.SENDER_NAME || "Expense Tracker",
        email: process.env.SENDER_EMAIL || "noreply@expensetracker.com",
      },
      to: [{ email: recipientEmail, name: recipientName }],
      subject: "Expense  Alert: Total Exceeds $1000",
      htmlContent: `
        <html>
          <body>
            <h1>Expense Alert</h1>
            <p>Hello ${recipientName},</p>
            <p>Your total expenses have exceeded the threshold of $1,000.</p>
            <p>Current total: $${totalAmount.toFixed(2)}</p>
            <p>Please review your expenses and take necessary action if needed.</p>
            <br>
          </body>
        </html>
      `,
    };

    const result = await apiInstance.sendTransacEmail(sendSmtpEmail);
    return { ok: true, data: result };
  } catch (error) {
    console.error(
      "Error sending email:",
      error.response?.body || error.message
    );
    return { ok: false, error: error.message };
  }
};

module.exports = { sendExpenseEmail };
