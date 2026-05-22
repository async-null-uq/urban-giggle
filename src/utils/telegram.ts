/**
 * Telegram Notification System Helper
 * Integrates with the Telegram Bot API to dispatch new leads and mortgage proposals
 */

const TELEGRAM_BOT_TOKEN = '8239160579:AAH63pdC4yLvlfULN877cPyqyiZZNUsPvA8';
const TELEGRAM_CHAT_ID = '7314853588';

/**
 * Send a generic message payload to the Telegram bot
 */
async function sendTelegramMessage(text: string): Promise<boolean> {
  try {
    const response = await fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        chat_id: TELEGRAM_CHAT_ID,
        text: text,
        parse_mode: 'HTML',
      }),
    });

    if (!response.ok) {
      console.error('Telegram notification failed to send:', await response.text());
      return false;
    }
    return true;
  } catch (error) {
    console.error('Error sending Telegram notification:', error);
    return false;
  }
}

/**
 * Format and send an Inquiry Notification
 */
export async function sendInquiryNotification({
  name,
  phone,
  reason,
  propertyName,
  propertyLocation,
  propertyPrice,
}: {
  name: string;
  phone: string;
  reason: string;
  propertyName: string;
  propertyLocation: string;
  propertyPrice: string;
}): Promise<boolean> {
  const reasonEmoji: { [key: string]: string } = {
    'Information': 'ℹ️',
    'Visit': '🚗',
    'Talking with Agent': '💬',
  };

  const selectedEmoji = reasonEmoji[reason] || '➡️';

  const message = `
🔔 <b>NEW GLADE INQUIRY RECEIVED</b> 🔔
───────────────────────────
👤 <b>Inquirer Detail:</b>
  • <b>Name:</b> ${name}
  • <b>Contact:</b> ${phone}

🏡 <b>Property Interest:</b>
  • <b>Property Name:</b> ${propertyName}
  • <b>Location:</b> ${propertyLocation}
  • <b>Market Value:</b> ${propertyPrice}

🎯 <b>Inquiry Goal:</b>
  • ${selectedEmoji} ${reason}

───────────────────────────
✨ <i>A designated local estate adviser will trigger contact protocol shortly.</i>
  `.trim();

  return sendTelegramMessage(message);
}

/**
 * Format and send a Mortgage Loan Simulation Proposal Lock
 */
export async function sendMortgageNotification({
  clientName,
  clientPhone,
  propertyName,
  propertyPrice,
  downPayment,
  loanAmount,
  interestRate,
  tenureYears,
  tenureMonths,
  monthlyEMI,
  totalRepayable,
}: {
  clientName: string;
  clientPhone: string;
  propertyName: string;
  propertyPrice: string;
  downPayment: string;
  loanAmount: string;
  interestRate: number;
  tenureYears: number;
  tenureMonths: number;
  monthlyEMI: string;
  totalRepayable: string;
}): Promise<boolean> {
  const message = `
💼 <b>NEW MORTGAGE LOAN LOCKED ("Plan It")</b> 💼
───────────────────────────
👤 <b>Planner Detail:</b>
  • <b>Name:</b> ${clientName}
  • <b>Contact:</b> ${clientPhone}

🏠 <b>Target Asset:</b>
  • <b>Property Name:</b> ${propertyName}
  • <b>Property Price:</b> ${propertyPrice}

📉 <b>Financing Breakdown:</b>
  • <b>Down Payment:</b> ${downPayment}
  • <b>Total Loan Amount:</b> ${loanAmount}
  • <b>Interest Rate:</b> ${interestRate}% P.A.

⏳ <b>Repayment Strategy:</b>
  • <b>Allocated Tenure:</b> ${tenureYears} years and ${tenureMonths} months
  • <b>Monthly Installments:</b> ${monthlyEMI}
  • <b>Estimated Total Cost:</b> ${totalRepayable}

───────────────────────────
📬 <i>Our mortgage broker agent has received this custom financial sheet and is scheduling a callback.</i>
  `.trim();

  return sendTelegramMessage(message);
}
