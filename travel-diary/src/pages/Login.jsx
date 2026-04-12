import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import Vinyl from '../components/Vinyl'

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
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-16 bg-cream dark:bg-dark-bg">
      <div className="w-full max-w-sm bg-white dark:bg-gray-100 rounded-2xl shadow-md border border-navy/10 px-8 py-10 flex flex-col items-center">

        <Vinyl size={48} className="animate-spin-slow mb-4" />

        <h1 className="text-2xl font-extrabold text-navy mb-1 text-center">
          Welcome back
        </h1>
        <p className="text-sm text-navy/50 mb-8 text-center">
          Log in to your Roaming Records account
        </p>

        {error && (
          <p className="text-red-500 text-sm text-center mb-4 w-full">{error}</p>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
            className="border border-navy/40 rounded-xl px-4 py-3 bg-white text-navy placeholder:text-navy/30 focus:outline-none focus:ring-2 focus:ring-orange text-sm"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
            className="border border-navy/40 rounded-xl px-4 py-3 bg-white text-navy placeholder:text-navy/30 focus:outline-none focus:ring-2 focus:ring-orange text-sm"
          />
          <button
            type="submit"
            disabled={loading}
            className="bg-orange hover:bg-[#e07030] text-white font-semibold rounded-full py-3 transition-colors disabled:opacity-50 cursor-pointer shadow-sm mt-1"
          >
            {loading ? 'Logging in...' : 'Log in'}
          </button>
        </form>

        <p className="text-sm text-center text-navy/50 mt-8">
          Don't have an account?{' '}
          <Link to="/signup" className="text-orange font-semibold hover:underline">Sign up</Link>
        </p>
      </div>
    </div>
  )
}
