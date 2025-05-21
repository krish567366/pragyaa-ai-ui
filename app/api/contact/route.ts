import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const formData = await request.json();
    const { name, email, company, phone, requirements } = formData;

    // Basic validation
    if (!name || !email || !requirements) {
      return NextResponse.json(
        { error: "Missing required fields: name, email, and requirements are necessary." },
        { status: 400 }
      );
    }

    // --- Placeholder for Email Sending ---
    console.log("CONTACT FORM SUBMISSION:");
    console.log("Name:", name);
    console.log("Email:", email);
    console.log("Company:", company);
    console.log("Phone:", phone);
    console.log("Requirements:", requirements);
    console.log("TODO: Send this data to info@pragyaa.ai");
    // Example: await sendEmail({ to: 'info@pragyaa.ai', subject: 'New Contact Form Submission', data: formData });

    // --- Placeholder for Database Saving ---
    console.log("TODO: Save this data to a database");
    // Example: await db.saveContact(formData);
    
    // Return success response
    return NextResponse.json({
      message: "Thanks for reaching out! We've received your details and our team of highly trained (and slightly caffeinated) carrier pigeons are on their way. We'll be in touch faster than you can say 'supercalifragilisticexpialidocious'!",
    });

  } catch (error) {
    console.error("Error processing contact form:", error);
    return NextResponse.json(
      { error: "There was an issue submitting your form. Please try again later." },
      { status: 500 }
    );
  }
} 