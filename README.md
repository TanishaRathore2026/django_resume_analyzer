# django_resume_analyzer# AI Resume Analyzer

An AI-powered Resume Analyzer built with Django, Django REST Framework, React, and Groq LLM API. The application analyzes PDF resumes against selected job descriptions and provides insights into candidate skills, experience, projects, and job relevance.

## Features

- **PDF Resume Upload:** Upload resumes in PDF format.
- **AI-Powered Analysis:** Uses Groq LLM to analyze resume content.
- **Job Description Matching:** Select a job role and evaluate resume relevance.
- **Resume Ranking:** Get a relevance score/rank based on the selected job.
- **Skill Analysis:** Extract and identify relevant technical skills.
- **Experience Analysis:** Identify total professional experience.
- **Project Analysis:** Analyze projects and their categories.
- **Job Management:** Add and manage job descriptions through Django Admin.
- **REST API:** Django REST Framework connects the backend with React.

## Tech Stack

| Technology | Purpose |
|---|---|
| Python | Backend logic |
| Django | Backend framework |
| Django REST Framework | REST APIs |
| React.js | Frontend |
| Vite | Frontend development |
| Groq API | AI-powered resume analysis |
| JavaScript | Frontend logic |
| CSS | UI styling |

## Project Setup

### 1. Clone the Repository

```bash
git clone https://github.com/TanishaRathore2026/AI_resume_checker.git
cd AI_resume_checker
```

### 2. Backend Setup (Django)

Open a terminal in the folder containing `manage.py`.

Create and activate a virtual environment:

```bash
python -m venv venv
```

Windows PowerShell:

```powershell
.\venv\Scripts\Activate.ps1
```

Install backend dependencies (if `requirements.txt` is available):

```bash
pip install -r requirements.txt
```

Run database migrations:

```bash
python manage.py makemigrations
python manage.py migrate
```

### 3. Configure Environment Variables

Add your Groq API key to the backend `.env` file:

```env
GROQ_API_KEY=your_groq_api_key
```

Never upload your actual API key or `.env` file to GitHub.

### 4. Create Django Admin Account

```bash
python manage.py createsuperuser
```

Enter your username, email, and password when prompted.

### 5. Start Django Backend

```bash
python manage.py runserver
```

Backend URL:

`http://127.0.0.1:8000/`

API endpoint for job descriptions:

`http://127.0.0.1:8000/api/jobs/`

## Frontend Setup (React + Vite)

Open another terminal in the folder containing the frontend `package.json`.

Install dependencies:

```bash
npm install
```

Start the frontend:

```bash
npm run dev
```

Open the local URL shown in your terminal (usually `http://localhost:5173/`).

## Django Admin & Job Description Management

Django Admin allows you to manage job descriptions without manually editing the database.

**Step 1:** Start the Django backend.

**Step 2:** Open:

`http://127.0.0.1:8000/admin/`

**Step 3:** Log in using your superuser credentials.

**Step 4:** Open the Jobs section (if the Job model is registered in Django Admin).

**Step 5:** Add a new job with:

- Job Title
- Job Description
- Required Skills (if supported by the model)

**Step 6:** Save the job.

The job will be available through:

`GET /api/jobs/`

## How to Analyze a Resume

1. Start the Django backend.
2. Start the React frontend.
3. Open the frontend in your browser.
4. Upload your resume in PDF format.
5. Select a job description from the available job roles.
6. Click the **Analyze** button.
7. Wait for the AI-powered analysis.
8. Review the results, including resume ranking, skills, experience, and project categories.

## API Endpoints

| Method | Endpoint | Purpose |
|---|---|---|
| GET | `/api/jobs/` | Retrieve available job descriptions |
| POST | `/api/resume/` | Upload and analyze a resume |

## Security Notes

- Keep API keys in environment variables.
- Never commit `.env`, passwords, or secret keys.
- Use environment-specific settings for production deployment.

## Author

**Tanisha Rathore**

- GitHub: [TanishaRathore2026](https://github.com/TanishaRathore2026)
- LinkedIn: [Tanisha Rathore](https://linkedin.com/in/tanisha-rathore-cse)

---

*Built to simplify resume screening through AI-powered analysis and job-specific evaluation.*
