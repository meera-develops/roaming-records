import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { updateProfile } from 'firebase/auth'
import { useAuth } from '../context/AuthContext'
import { auth } from '../firebase'
import Vinyl from '../components/Vinyl'

export default function Signup() {
  const { signup } = useAuth()
  const navigate = useNavigate()
  const [username, setUsername] = useState('')
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
      await updateProfile(auth.currentUser, { displayName: username })
      navigate('/my-trips')
    } catch (err) {
      setError('Failed to create an account. Try a stronger password.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-8 bg-cream dark:bg-dark-bg">
      <div className="w-full max-w-sm bg-white dark:bg-gray-100 rounded-2xl shadow-md border border-navy/10 px-8 py-7 flex flex-col items-center">

        <Vinyl size={40} className="animate-spin-slow mb-3" />

        <h1 className="text-2xl font-extrabold text-navy mb-1 text-center">
          Create an account
        </h1>
        <p className="text-sm text-navy/50 mb-5 text-center">
          Start recording your travels
        </p>

        {error && (
          <p className="text-red-500 text-sm text-center mb-4 w-full">{error}</p>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-3 w-full">
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={e => setUsername(e.target.value)}
            required
            className="border border-navy/40 rounded-xl px-4 py-3 bg-white text-navy placeholder:text-navy/30 focus:outline-none focus:ring-2 focus:ring-orange text-sm"
          />
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
          <input
            type="password"
            placeholder="Confirm password"
            value={confirm}
            onChange={e => setConfirm(e.target.value)}
            required
            className="border border-navy/40 rounded-xl px-4 py-3 bg-white text-navy placeholder:text-navy/30 focus:outline-none focus:ring-2 focus:ring-orange text-sm"
          />
          <button
            type="submit"
            disabled={loading}
            className="bg-orange hover:bg-[#e07030] text-white font-semibold rounded-full py-3 transition-colors disabled:opacity-50 cursor-pointer shadow-sm mt-1"
          >
            {loading ? 'Creating account...' : 'Sign up'}
          </button>
        </form>

        <p className="text-sm text-center text-navy/50 mt-6">
          Already have an account?{' '}
          <Link to="/login" className="text-orange font-semibold hover:underline">Log in</Link>
        </p>
      </div>
    </div>
  )
}
