# Accessibility Instruction Checker

An AI‑powered tool that analyzes instructional materials for ableist language, accessibility barriers, and non‑inclusive phrasing, then provides rewrites grounded in ADA Title II (2026), UDL Guidelines, and WCAG 2.2 AA.

# Purpose

The Accessible Instruction Checker helps Educators and Instructional designers identify language that may unintentionally hurt, exclude or marginalize learners with disabilities. It applies the social model of disability, focusing on barriers in the environment and materials.

This project was created as part of a University course and serves academic and prototyping purposes.

# Key features

Detects ableist language, deficit framing, and exclusionary wording.
Flags ableist lanaguge, accessibility barriers in instructions, assignments, and course materials providing explanations and violations.
Provides inclusive rewrites aligned with: ADA Title II (2026 updates), Universal Design for Learning (UDL) Guidelines, and WCAG 2.2 AA.
Offers improved alternatives that promote access, autonomy, and equity.
Simple frontend UI + Node.js backend proxy for secure API calls

# How it works

User enters instructional text into the frontend
The backend sends the text to Vertex AI with a structured accessibility‑focused prompt
The model analyzes:Ableist language patterns, barriers, compliance with ADA/UDL/WCAG
The model returns: Flags, Explanations, Suggested rewrites
The frontend displays the results

# Accessibility frameworks used

ADA Title II (2026): nondiscrimination in public education

UDL Guidelines: multiple means of engagement, representation, and expression

WCAG 2.2 AA: perceivable, operable, understandable, robust content

# Evaluation Results
The Accessible Instruction Checker was evaluated using a set of personally written instructional examples containing both explicit and subtle ableist phrasing.  
The model correctly flagged the majority of aleist phrases, performing at approximately **70% accuracy** on the test samples.  

However, it **missed some subtle and context‑dependent phrases**, especially those that rely on tone, implication, or indirect framing.  
These results reinforce that **AI cannot be relied on as the sole evaluator** of accessibility or ableism.  
Human review remains essential to confirm accuracy, interpret nuance, and ensure that suggestions align with the social model of disability.

# Ethics Note
AI systems can misinterpret nuance, cultural context, or indirect phrasing.  
Because the model occasionally missed subtle ableist language during testing, relying solely on automated detection could lead to incomplete or misleading feedback.  

If the model incorrectly flags or fails to flag content, educators may misunderstand the issue or lose trust in accessibility tools.  
To mitigate this, the app provides explanations for each flag but uers are encouraged to apply **human judgment** before accepting suggestions.  
Human‑in‑the‑loop review is essential to ensure fairness, respect, and accountability in accessibility analysis.

## Prerequisites

To run this application locally, you need:

*   **[Google Cloud SDK / gcloud CLI](https://cloud.google.com/sdk/docs/install)**: Follow the instructions to install the SDK.

*   **gcloud Initialization**:
    *   Initialize the gcloud CLI:
        ```bash
        gcloud init
        ```
    *   Authenticate for Application Default Credentials (needed to call Google Cloud APIs):
        ```bash
        gcloud auth application-default login
        ```

*   **Node.js and npm**: Ensure you have Node.js and its package manager, `npm`, installed on your machine.

## Project Structure

The project is organized into two main directories:

*   `frontend/`: Contains the Frontend application code.
*   `backend/`: Contains the Node.js/Express server code to proxy Google Cloud API calls.

## Backend Environment Variables

The `backend/.env.local` file is automatically generated when you download this application.
It contains essential Google Cloud environment variables pre-configured based on your project settings at the time of download.

The variables set in `backend/.env.local` are:
*   `API_BACKEND_PORT`: The port the backend API server listens on (e.g., `5000`).
*   `API_PAYLOAD_MAX_SIZE`: The maximum size of the request payload accepted by the backend server (e.g., `5mb`).
*   `GOOGLE_CLOUD_LOCATION`: The Google Cloud region associated with your project.
*   `GOOGLE_CLOUD_PROJECT`: Your Google Cloud Project ID.

**Note:** These variables are automatically populated during the download process.
You can modify the values in `backend/.env.local` if you need to change them.

## Installation and Running the App

To install dependencies and run your Google Cloud Vertex AI Studio App locally, execute the following command:

```bash
npm install && npm run dev
