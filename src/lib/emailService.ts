import emailjs from '@emailjs/browser';

const EMAILJS_SERVICE_ID = 'service_gc36w85';
const EMAILJS_TEMPLATE_ID = 'template_0pe9xic';
const EMAILJS_PUBLIC_KEY = '7F7YIEFvdroT2VHzj';
const ADMIN_EMAIL = 't8.fd88@gmail.com';

emailjs.init(EMAILJS_PUBLIC_KEY);

export const generateVerificationCode = (): string => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

export const sendVerificationCode = async (
  userEmail: string,
  userName: string,
  verificationCode: string
): Promise<boolean> => {
  try {
    const templateParams = {
      user_name: userName,
      user_email: userEmail,
      verification_code: verificationCode,
      to_email: ADMIN_EMAIL
    };

    const response = await emailjs.send(
      EMAILJS_SERVICE_ID,
      EMAILJS_TEMPLATE_ID,
      templateParams
    );

    return response.status === 200;
  } catch (error) {
    console.error('Error sending verification email:', error);
    return false;
  }
};
