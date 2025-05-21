import { DeepgramError, createClient } from "@deepgram/sdk";
import { NextResponse } from "next/server";

export async function POST() {
  try {
    // exit early so we don't request 70000000 keys while in devmode
    if (process.env.API_KEY_STRATEGY === "provided") {
      return NextResponse.json(
        process.env.DEEPGRAM_API_KEY
          ? { key: process.env.DEEPGRAM_API_KEY }
          : new DeepgramError(
              "Can't do local development without setting a `DEEPGRAM_API_KEY` environment variable.",
            ),
      );
    }

    const deepgram = createClient(process.env.DEEPGRAM_API_KEY ?? "");

    let { result: projectsResult, error: projectsError } = await deepgram.manage.getProjects();

    if (projectsError) {
      console.error("Error getting Deepgram projects:", projectsError);
      return NextResponse.json(projectsError);
    }

    const project = projectsResult?.projects[0];

    if (!project) {
      console.error("No Deepgram project found.");
      return NextResponse.json(
        new DeepgramError("Cannot find a Deepgram project. Please create a project first."),
      );
    }

    console.log("Found project:", project.project_id);

    let { result: newKeyResult, error: newKeyError } = await deepgram.manage.createProjectKey(
      project.project_id,
      {
        comment: "Temporary API key",
        scopes: ["usage:write"],
        tags: ["next.js"],
        time_to_live_in_seconds: 10,
      },
    );

    if (newKeyError) {
      console.error("Error creating Deepgram project key:", newKeyError);
      return NextResponse.json(newKeyError);
    }

    console.log("Successfully created temporary key.");
    return NextResponse.json({ ...newKeyResult });
  } catch (error) {
    console.error('Authentication error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
