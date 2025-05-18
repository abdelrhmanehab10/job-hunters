import OpenAI from "openai";
import { NextResponse } from "next/server";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      jobTitle,
      experienceLevel,
      skills,
      yearsOfExperience,
      achievements,
      softSkills,
      motivation,
      jobDescription,
    } = body;

    if (!jobTitle || !jobDescription) {
      return NextResponse.json(
        { error: "Job title and description are required" },
        { status: 400 }
      );
    }

    const prompt = `Write a personalized and professional cover letter for a ${jobTitle} position based on the job description below. I am applying as a ${
      experienceLevel || "mid-level"
    } developer with experience in ${skills || "React.js, Next.js"}.
    
    My background:
    - ${yearsOfExperience || "3+ years"} of experience
    - ${achievements || "Successfully delivered multiple web applications"}
    - ${
      softSkills || "Strong communication, teamwork, and remote work experience"
    }
    - ${
      motivation || "Excited about the opportunity to join your innovative team"
    }

    Job description:
    ${jobDescription}

    The tone should be confident, friendly, and aligned with the company's mission.`;

    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo-instruct",  // Less expensive alternative
      messages: [
        {
          role: "system",
          content:
            "You are a professional cover letter writer who creates compelling, personalized cover letters.",
        },
        {
          role: "user",
          content: prompt,
        },
      ],
      temperature: 0.7,
    });

    const coverLetter = response.choices[0]?.message?.content || "";

    return NextResponse.json({ coverLetter });
  } catch (error) {
    console.error("Error generating cover letter:", error);
    return NextResponse.json(
      { error: "Failed to generate cover letter" },
      { status: 500 }
    );
  }
}
