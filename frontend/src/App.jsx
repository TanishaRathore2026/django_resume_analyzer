
import { useEffect, useState } from 'react'
import './App.css'

const API_URL = 'http://127.0.0.1:8000/api'

function App() {
  const [jobs, setJobs] = useState([])
  const [selectedJob, setSelectedJob] = useState('')
  const [resume, setResume] = useState(null)
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [jobsLoading, setJobsLoading] = useState(true)

  useEffect(() => {
    fetch(`${API_URL}/jobs/`)
      .then(response => {
        if (!response.ok) throw new Error('Could not load jobs')
        return response.json()
      })
      .then(data => {
        const jobList = data.data || []
        setJobs(jobList)

        if (jobList.length > 0) {
          setSelectedJob(String(jobList[0].id))
        }
      })
      .catch(() => {
        setError('Unable to load job descriptions. Please check the backend.')
      })
      .finally(() => setJobsLoading(false))
  }, [])

  const handleAnalyze = async (e) => {
    e.preventDefault()

    if (!resume) {
      setError('Please upload your PDF resume.')
      return
    }

    if (resume.type !== 'application/pdf') {
      setError('Only PDF files are supported.')
      return
    }

    if (!selectedJob) {
      setError('Please select a job description.')
      return
    }

    setLoading(true)
    setError('')
    setResult(null)

    const formData = new FormData()
    formData.append('resume', resume)
    formData.append('job_description', selectedJob)

    try {
      const response = await fetch(`${API_URL}/resume/`, {
        method: 'POST',
        body: formData,
      })

      const data = await response.json()

      if (!response.ok || data.status === false) {
        throw new Error(data.message || 'Resume analysis failed.')
      }

      setResult(data.data)
    } catch (err) {
      setError(err.message || 'Something went wrong.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="dashboard">
      <nav className="navbar">
        <h2>ResumeCheck<span>.</span></h2>
        <p>AI Resume Analyzer</p>
      </nav>

      <section className="hero">
        <p className="eyebrow">AI-POWERED RESUME REVIEW</p>
        <h1>Make your resume<br />work for you.</h1>

        <p className="subtitle">
          Upload your resume and compare it with a job description
          to understand how well your profile matches.
        </p>

        <form className="analyzer" onSubmit={handleAnalyze}>
          <div className="upload-box">
            <div className="upload-icon">↑</div>
            <h3>Upload your resume</h3>
            <p>PDF format only</p>

            <input
              type="file"
              accept=".pdf,application/pdf"
              onChange={(e) => {
                setResume(e.target.files[0] || null)
                setError('')
                setResult(null)
              }}
            />

            {resume && <p>{resume.name}</p>}
          </div>

          <div className="job-box">
            <label htmlFor="job-description">Select Job Description</label>

            <select
              id="job-description"
              value={selectedJob}
              onChange={(e) => setSelectedJob(e.target.value)}
              disabled={jobsLoading || jobs.length === 0}
            >
              {jobsLoading && <option>Loading jobs...</option>}

              {!jobsLoading && jobs.length === 0 && (
                <option value="">No jobs available</option>
              )}

              {jobs.map(job => (
                <option key={job.id} value={job.id}>
                  {job.job_title}
                </option>
              ))}
            </select>
          </div>

          <button type="submit" disabled={loading || jobsLoading}>
            {loading ? 'Analyzing...' : 'Analyze Resume →'}
          </button>

          {error && <p className="error-message">{error}</p>}
        </form>

        {result && (
          <div className="analyzer results">
            <h2>Resume Analysis Results</h2>

            <p><strong>Rank:</strong> {result.rank ?? 'N/A'}</p>
            <p><strong>Total Experience:</strong> {result.total_experience ?? 'N/A'}</p>

            <h3>Skills</h3>
            <p>{result.skills?.join(', ') || 'No skills found'}</p>

            <h3>Project Categories</h3>
            <p>{result.project_category?.join(', ') || 'No categories found'}</p>
          </div>
        )}
      </section>

      <footer>
        Built to help you understand your next opportunity.
      </footer>
    </main>
  )
}

export default App
