import Link from 'next/link'

const footerLinks = {
  Kategori: [
    { name: 'Nasional', href: '/kategori/nasional' },
    { name: 'Internasional', href: '/kategori/internasional' },
    { name: 'Ekonomi', href: '/kategori/ekonomi' },
    { name: 'Tekno', href: '/kategori/tekno' },
    { name: 'Olahraga', href: '/kategori/olahraga' },
    { name: 'Hiburan', href: '/kategori/hiburan' },
  ],
  Lainnya: [
    { name: 'Tentang Kami', href: '#' },
    { name: 'Kontak', href: '#' },
    { name: 'Karir', href: '#' },
    { name: 'Pedoman Media Siber', href: '#' },
    { name: 'Privacy Policy', href: '#' },
  ],
}

export function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 mt-12">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-1">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-red-600 rounded flex items-center justify-center">
                <span className="text-white font-bold text-lg">d</span>
              </div>
              <span className="text-xl font-bold text-white">detikcom</span>
            </div>
            <p className="text-sm text-gray-400 leading-relaxed">
              Portal berita terpercaya yang menyajikan informasi terkini dan terbaru hari ini dari berbagai kategori berita.
            </p>
          </div>

          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h3 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">{title}</h3>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link.name}>
                    <Link href={link.href} className="text-sm text-gray-400 hover:text-white transition-colors">
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div>
            <h3 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Ikuti Kami</h3>
            <div className="flex space-x-4">
              {['Facebook', 'Twitter', 'Instagram', 'YouTube'].map((social) => (
                <a
                  key={social}
                  href="#"
                  className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center text-gray-400 hover:bg-red-600 hover:text-white transition-colors"
                  title={social}
                >
                  <span className="text-xs font-bold">{social[0]}</span>
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p className="text-sm text-gray-500">
            &copy; {new Date().getFullYear()} detikcom. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}