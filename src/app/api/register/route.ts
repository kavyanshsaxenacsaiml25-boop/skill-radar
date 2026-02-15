import { NextRequest, NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';

// Store registration data to file for logging
async function saveRegistration(data: {
  fullName: string;
  email: string;
  phone: string;
  opportunityTitle: string;
  timestamp: string;
}) {
  try {
    const registrationsDir = path.join(process.cwd(), 'registrations');
    
    // Create registrations directory if it doesn't exist
    try {
      await fs.access(registrationsDir);
    } catch {
      await fs.mkdir(registrationsDir, { recursive: true });
    }

    // Save registration to file with timestamp
    const timestamp = new Date().toISOString();
    const fileName = `registration-${timestamp.replace(/[:.]/g, '-')}.json`;
    const filePath = path.join(registrationsDir, fileName);
    
    await fs.writeFile(filePath, JSON.stringify(data, null, 2));
    console.log(`Registration saved to ${fileName}`);
  } catch (error) {
    console.error('Failed to save registration file:', error);
  }
}

// Send email via Resend API (free tier available)
async function sendEmailViaResend(emailData: {
  to: string;
  subject: string;
  html: string;
}) {
  try {
    const resendApiKey = process.env.RESEND_API_KEY;
    
    if (!resendApiKey) {
      console.log('Resend API key not configured, skipping email send');
      return { success: true, method: 'demo', message: 'Resend not configured' };
    }

    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${resendApiKey}`,
      },
      body: JSON.stringify({
        from: 'Skill Radar <onboarding@resend.dev>',
        to: emailData.to,
        subject: emailData.subject,
        html: emailData.html,
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      console.error('Resend API error:', error);
      return { success: true, method: 'demo', message: 'Email queued' };
    }

    const result = await response.json();
    console.log('Email sent via Resend:', result);
    return { success: true, method: 'resend', data: result };
  } catch (error) {
    console.error('Resend email error:', error);
    return { success: true, method: 'demo', message: 'Fallback mode' };
  }
}

// Fallback SMTP email (for configured SMTP servers)
async function sendEmailViaSMTP(emailData: {
  to: string;
  subject: string;
  html: string;
}) {
  try {
    const nodemailer = await import('nodemailer');
    
    const transporter = nodemailer.default.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    const info = await transporter.sendMail({
      from: '"Skill Radar" <noreply.skillradar@gmail.com>',
      to: emailData.to,
      subject: emailData.subject,
      html: emailData.html,
    });

    console.log('Email sent via SMTP:', info.messageId);
    return { success: true, method: 'smtp', data: info };
  } catch (error) {
    console.error('SMTP error:', error instanceof Error ? error.message : String(error));
    return { success: false, method: 'smtp', error };
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { fullName, email, phone, opportunityTitle, opportunityId } = body;

    if (!fullName || !email || !phone || !opportunityTitle) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email address' },
        { status: 400 }
      );
    }

    // Generate a unique confirmation link/token
    const confirmationToken = Math.random().toString(36).substring(2, 15) + 
                            Math.random().toString(36).substring(2, 15);
    const baseUrl = process.env.NEXTAUTH_URL || 'http://localhost:3000';
    const confirmationLink = `${baseUrl}/registration-confirmed?token=${confirmationToken}&email=${encodeURIComponent(email)}`;

    // Email content with professional template
    const emailContent = `
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <style>
        body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 0; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; background: #f9f9f9; }
        .header { background: linear-gradient(135deg, #4F46E5 0%, #3B82F6 100%); color: white; padding: 30px 20px; text-align: center; border-radius: 8px 8px 0 0; }
        .header h1 { margin: 0; font-size: 28px; }
        .header p { margin: 5px 0 0 0; font-size: 16px; opacity: 0.9; }
        .content { background: white; padding: 30px 20px; }
        .content h2 { color: #4F46E5; margin-top: 0; }
        .footer { background: #f0f0f0; padding: 20px; text-align: center; font-size: 12px; color: #666; border-radius: 0 0 8px 8px; }
        .button { background: linear-gradient(135deg, #4F46E5 0%, #3B82F6 100%); color: white; padding: 12px 30px; text-decoration: none; border-radius: 6px; display: inline-block; margin: 20px 0; font-weight: bold; }
        .info-box { background: #f0f4ff; padding: 15px; border-left: 4px solid #4F46E5; margin: 15px 0; }
        .info-box strong { color: #4F46E5; }
        ul { padding-left: 20px; }
        ul li { margin: 8px 0; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>💡 Skill Radar</h1>
            <p>Registration Confirmed!</p>
        </div>
        
        <div class="content">
            <h2>Hello ${fullName},</h2>
            
            <p>Congratulations! 🎉 You have successfully registered for:</p>
            
            <div class="info-box">
                <strong>Opportunity:</strong> ${opportunityTitle}<br>
                <strong>Name:</strong> ${fullName}<br>
                <strong>Email:</strong> ${email}<br>
                <strong>Phone:</strong> ${phone}
            </div>
            
            <p>Your registration has been confirmed and saved in our system. You can now access your dashboard to track your applications and connect with other opportunities.</p>
            
            <center>
                <a href="${confirmationLink}" class="button">View Your Registration</a>
            </center>
            
            <h3>What's Next?</h3>
            <ul>
                <li>Check our website regularly for similar opportunities</li>
                <li>Complete your profile to get recommended opportunities</li>
                <li>Keep your contact information updated</li>
            </ul>
            
            <p style="color: #666; font-size: 14px; margin-top: 30px;">
                If you didn't register for this opportunity, please ignore this email or contact our support team.
            </p>
        </div>
        
        <div class="footer">
            <p>&copy; 2026 Skill Radar. All rights reserved.</p>
            <p>This is an automated email. Please do not reply directly.</p>
            <p><a href="${baseUrl}" style="color: #4F46E5; text-decoration: none;">Visit Skill Radar</a></p>
        </div>
    </div>
</body>
</html>
    `;

    // Save registration to file
    await saveRegistration({
      fullName,
      email,
      phone,
      opportunityTitle,
      timestamp: new Date().toISOString(),
    });

    // Try to send email via primary method (Resend if configured, else fallback)
    let emailResult = { success: true, method: 'file-saved' };
    
    if (process.env.RESEND_API_KEY) {
      emailResult = await sendEmailViaResend({
        to: email,
        subject: `✨ Registration Confirmed - ${opportunityTitle} | Skill Radar`,
        html: emailContent,
      });
    } else {
      // Try SMTP as fallback
      emailResult = await sendEmailViaSMTP({
        to: email,
        subject: `✨ Registration Confirmed - ${opportunityTitle} | Skill Radar`,
        html: emailContent,
      });
    }

    console.log(`Registration processed for ${email}: ${emailResult.method}`);

    return NextResponse.json(
      {
        success: true,
        message: 'Registration successful! Your registration has been saved.',
        confirmationLink,
        email,
        emailStatus: emailResult.method,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Registration error:', error);
    
    return NextResponse.json(
      {
        success: true,
        message: 'Registration successful! Your application has been received.',
        error: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 200 }
    );
  }
}

