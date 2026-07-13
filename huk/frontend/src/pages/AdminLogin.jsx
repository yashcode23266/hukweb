import { useEffect, useRef, useState } from 'react'
import { useMutation } from '@tanstack/react-query'
import { requestOtp, resendOtp, verifyOtp } from '../api/adminApi'
import { Toast } from './AdminUI'

const RESEND_COOLDOWN = 60 // seconds — must match backend RESEND_COOLDOWN_SECONDS

function AdminLogin({ onSuccess }) {
  const [step, setStep] = useState('credentials') // 'credentials' | 'otp'
  const [form, setForm] = useState({ email: '', password: '' })
  const [otp, setOtp] = useState('')
  const [message, setMessage] = useState('')
  const [cooldown, setCooldown] = useState(0)
  const otpInputRef = useRef(null)

  useEffect(() => {
    if (cooldown <= 0) return
    const timer = setInterval(() => setCooldown((c) => Math.max(0, c - 1)), 1000)
    return () => clearInterval(timer)
  }, [cooldown])

  useEffect(() => {
    if (step === 'otp') otpInputRef.current?.focus()
  }, [step])

  const sendOtpMutation = useMutation({
    mutationFn: () => requestOtp(form),
    onSuccess: () => {
      setMessage('')
      setStep('otp')
      setCooldown(RESEND_COOLDOWN)
    },
    onError: (err) => setMessage(err.message || 'Login failed.'),
  })

  const resendMutation = useMutation({
    mutationFn: () => resendOtp(form.email),
    onSuccess: () => {
      setMessage('A new OTP has been sent to your email.')
      setCooldown(RESEND_COOLDOWN)
    },
    onError: (err) => setMessage(err.message || 'Could not resend OTP.'),
  })

  const verifyMutation = useMutation({
    mutationFn: () => verifyOtp({ email: form.email, otp }),
    onSuccess: (data) => {
      const token = data.token
      if (!token) {
        setMessage('Verification succeeded but no token was returned.')
        return
      }
      localStorage.setItem('adminToken', token)
      onSuccess(token)
    },
    onError: (err) => setMessage(err.message || 'Invalid or expired OTP.'),
  })

  function handleCredentialsSubmit(e) {
    e.preventDefault()
    setMessage('')
    sendOtpMutation.mutate()
  }

  function handleOtpSubmit(e) {
    e.preventDefault()
    setMessage('')
    verifyMutation.mutate()
  }

  function backToCredentials() {
    setStep('credentials')
    setOtp('')
    setMessage('')
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#fff8ea] px-4 py-12">
      <div className="grid w-full max-w-4xl gap-6 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
        {/* Left panel */}
        <div className="rounded-3xl bg-[#8d0909] p-8 text-white shadow-2xl sm:p-10">
          <p className="text-xs font-black uppercase tracking-[0.3em] text-amber-300">Secure Access</p>
          <h2 className="mt-4 font-serif text-4xl font-black leading-tight">Mandal Order Desk</h2>
          <p className="mt-4 leading-7 text-red-100/80">
            Only authorized Mandal members can view customer orders, ID-card details, and distribution records.
          </p>
          <div className="mt-8 flex items-center gap-3">
            <div className="h-px flex-1 bg-white/20" />
            <span className="text-xs font-black uppercase tracking-wider text-amber-200">Admin Only</span>
            <div className="h-px flex-1 bg-white/20" />
          </div>
        </div>

        {/* Right panel */}
        <div className="rounded-3xl border border-[#e7c579]/70 bg-white p-7 shadow-xl sm:p-9">
          {step === 'credentials' ? (
            <>
              <h2 className="font-serif text-3xl font-black text-[#8d0909]">Admin Login</h2>
              <p className="mt-1 text-sm text-stone-500">Enter your credentials to receive a one-time code</p>

              <form className="mt-7 space-y-4" onSubmit={handleCredentialsSubmit}>
                <label className="block text-sm font-black text-stone-700">
                  Email
                  <input
                    type="email"
                    required
                    autoComplete="email"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className="mt-2 w-full rounded-xl border border-[#d9bd79] bg-[#fffdf7] px-4 py-3 font-medium outline-none focus:ring-2 focus:ring-[#b91111]/25"
                    placeholder="admin@mandal.com"
                  />
                </label>

                <label className="block text-sm font-black text-stone-700">
                  Password
                  <input
                    type="password"
                    required
                    autoComplete="current-password"
                    value={form.password}
                    onChange={(e) => setForm({ ...form, password: e.target.value })}
                    className="mt-2 w-full rounded-xl border border-[#d9bd79] bg-[#fffdf7] px-4 py-3 font-medium outline-none focus:ring-2 focus:ring-[#b91111]/25"
                    placeholder="••••••••"
                  />
                </label>

                <button
                  type="submit"
                  disabled={sendOtpMutation.isPending || !form.email || !form.password}
                  className="mt-2 w-full rounded-full bg-[#b91111] px-6 py-3 font-black text-white shadow-lg transition hover:bg-[#8d0909] disabled:opacity-60"
                >
                  {sendOtpMutation.isPending ? 'Sending code…' : 'Send OTP'}
                </button>
              </form>
            </>
          ) : (
            <>
              <h2 className="font-serif text-3xl font-black text-[#8d0909]">Enter OTP</h2>
              <p className="mt-1 text-sm text-stone-500">
                We sent a 6-digit code to <span className="font-bold text-stone-700">{form.email}</span>
              </p>

              <form className="mt-7 space-y-4" onSubmit={handleOtpSubmit}>
                <label className="block text-sm font-black text-stone-700">
                  One-Time Password
                  <input
                    ref={otpInputRef}
                    type="text"
                    inputMode="numeric"
                    pattern="[0-9]{6}"
                    maxLength={6}
                    required
                    value={otp}
                    onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
                    className="mt-2 w-full rounded-xl border border-[#d9bd79] bg-[#fffdf7] px-4 py-3 text-center text-2xl font-black tracking-[0.5em] outline-none focus:ring-2 focus:ring-[#b91111]/25"
                    placeholder="••••••"
                  />
                </label>

                <button
                  type="submit"
                  disabled={verifyMutation.isPending || otp.length !== 6}
                  className="w-full rounded-full bg-[#b91111] px-6 py-3 font-black text-white shadow-lg transition hover:bg-[#8d0909] disabled:opacity-60"
                >
                  {verifyMutation.isPending ? 'Verifying…' : 'Verify & Login'}
                </button>

                <div className="flex items-center justify-between text-sm">
                  <button
                    type="button"
                    onClick={backToCredentials}
                    className="font-bold text-stone-500 hover:text-stone-700"
                  >
                    ← Change email
                  </button>
                  <button
                    type="button"
                    disabled={cooldown > 0 || resendMutation.isPending}
                    onClick={() => resendMutation.mutate()}
                    className="font-black text-[#a31616] disabled:text-stone-400"
                  >
                    {resendMutation.isPending
                      ? 'Resending…'
                      : cooldown > 0
                        ? `Resend OTP (${cooldown}s)`
                        : 'Resend OTP'}
                  </button>
                </div>
              </form>
            </>
          )}

          <Toast message={message} type={message.toLowerCase().includes('sent') ? 'success' : 'error'} />
        </div>
      </div>
    </main>
  )
}

export default AdminLogin
