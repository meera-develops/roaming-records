import Vinyl from './Vinyl'

export default function Footer() {
  return (
    <footer className="bg-navy text-cream/50 py-10 px-8 md:px-16">
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm">
        <div className="flex items-center gap-2 font-semibold text-cream">
          <Vinyl size={24} />
          <span>Roaming Records</span>
        </div>
        <p>Built with React &amp; Tailwind CSS · Fictious website created by Meera Bhola</p>
        <div className="flex gap-6">
          <a href="#" className="hover:text-orange transition-colors">Privacy</a>
          <a href="#" className="hover:text-orange transition-colors">Terms</a>
          <a href="#" className="hover:text-orange transition-colors">Contact</a>
        </div>
      </div>
    </footer>
  )
}
