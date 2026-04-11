import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function Login() {
  const { login } = useAuth()
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e) {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      await login(email, password)
      navigate('/my-trips')
    } catch (err) {
      setError('Incorrect email or password.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-cream dark:bg-dark-bg px-4">
      <div className="w-full max-w-sm">
        <h1 className="text-2xl font-extrabold text-navy dark:text-cream mb-6 text-center">
          Welcome back
        </h1>

        {error && (
          <p className="text-red-500 text-sm text-center mb-4">{error}</p>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
            className="border border-navy/20 dark:border-cream/20 rounded-lg px-4 py-2 bg-white dark:bg-dark-bg text-navy dark:text-cream focus:outline-none focus:ring-2 focus:ring-orange"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
            className="border border-navy/20 dark:border-cream/20 rounded-lg px-4 py-2 bg-white dark:bg-dark-bg text-navy dark:text-cream focus:outline-none focus:ring-2 focus:ring-orange"
          />
          <button
            type="submit"
            disabled={loading}
            className="bg-orange text-white font-semibold rounded-lg py-2 hover:bg-orange/90 transition-colors disabled:opacity-50 cursor-pointer"
          >
            {loading ? 'Logging in...' : 'Log in'}
          </button>
        </form>

        <p className="text-sm text-center text-navy/60 dark:text-cream/60 mt-6">
          Don't have an account?{' '}
          <Link to="/signup" className="text-orange hover:underline">Sign up</Link>
        </p>
      </div>
    </div>
  )
}
