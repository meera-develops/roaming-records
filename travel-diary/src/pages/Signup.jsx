import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function Signup() {
  const { signup } = useAuth()
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirm, setConfirm] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e) {
    e.preventDefault()
    if (password !== confirm) {
      return setError('Passwords do not match.')
    }
    setError('')
    setLoading(true)
    try {
      await signup(email, password)
      navigate('/my-trips')
    } catch (err) {
      setError('Failed to create an account. Try a stronger password.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-cream dark:bg-dark-bg px-4">
      <div className="w-full max-w-sm">
        <h1 className="text-2xl font-extrabold text-navy dark:text-cream mb-6 text-center">
          Create an account
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
          <input
            type="password"
            placeholder="Confirm password"
            value={confirm}
            onChange={e => setConfirm(e.target.value)}
            required
            className="border border-navy/20 dark:border-cream/20 rounded-lg px-4 py-2 bg-white dark:bg-dark-bg text-navy dark:text-cream focus:outline-none focus:ring-2 focus:ring-orange"
          />
          <button
            type="submit"
            disabled={loading}
            className="bg-orange text-white font-semibold rounded-lg py-2 hover:bg-orange/90 transition-colors disabled:opacity-50 cursor-pointer"
          >
            {loading ? 'Creating account...' : 'Sign up'}
          </button>
        </form>

        <p className="text-sm text-center text-navy/60 dark:text-cream/60 mt-6">
          Already have an account?{' '}
          <Link to="/login" className="text-orange hover:underline">Log in</Link>
        </p>
      </div>
    </div>
  )
}
