import Link from 'next/link';

const Footer = () => {
  return (
    <footer className="py-16 bg-black">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center justify-center space-y-8">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <img 
              src="/pragyaa_transparent_hor.png" 
              alt="Pragyaa AI Logo" 
              className="h-8 object-contain"
            />
          </div>

          {/* Links */}
          <div className="flex items-center space-x-8 text-gray-400">
            <Link href="/privacy" className="hover:text-purple-400 transition-colors">
              Privacy
            </Link>
            {/* The #contact link might need to be /#contact if linking from non-home pages to homepage section */}
            <a href="/#book-a-demo-section" className="hover:text-purple-400 transition-colors">
              Contact
            </a>
          </div>

          {/* Copyright */}
          <div className="text-gray-400 text-center">
            ©{new Date().getFullYear()} Voxot Solutions Pvt Ltd. All Rights Reserved. v5.2
            {/* Changed 2025 to dynamic year and ensured correct company name based on previous findings */}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 