import Container from "./Container";
import { SITE } from "../lib/site";
import { Facebook, Instagram, Linkedin, MessageCircle } from "lucide-react";

export default function Footer() {
  return (
    <footer className="mt-10 bg-[var(--blue)] py-7 text-white">
      <Container>
        <div className="grid gap-4 md:grid-cols-3">
          <div>
            <div className="font-bold">
                <img src="/images/logo.svg" alt="Moulding Technicians Logo" className="h-10 w-auto brightness-0 invert" />
            </div>
            <div><p className="hover:text-white text-sm mt-3">Moulding Technicians PTY Ltd is a engineering company specialising in plastic moulding, tool design, SolidCAM software resale, and technical training.</p></div>
          </div>
          <div className="text-sm opacity-90">
            <div className="flex flex-col gap-1">
              <p className="hover:text-white"><strong>Address:</strong> {SITE.addressLine}</p>
              <p className="hover:text-white"><strong>Email:</strong> {SITE.email}</p>
              <p className="hover:text-white"><strong>Phone:</strong> {SITE.phone}</p>
            </div>
          </div>
          <div className="text-sm opacity-90">
            <div className="flex items-center md:justify-end gap-3">
                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-white">
                <Facebook className="h-7 w-7" />
                </a>
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-white">
                <Instagram className="h-7 w-7" />
                </a>
                <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-white">
                <Linkedin className="h-7 w-7" />
                </a>
                <a href="https://wa.me/yourwhatsapplink" target="_blank" rel="noopener noreferrer" className="hover:text-white">
                <MessageCircle className="h-7 w-7" />
                </a>
            </div>
          </div>
        </div>
        <div className="border-t border-white/20 pt-5 mt-5 text-sm">
          <p className="hover:text-blue-500 text-blue-500 py-2 my-0">© {new Date().getFullYear()} Moulding Technicians PTY Ltd. All rights reserved. <a href="https://munjle.com" target="" className="hover:text-white">Munjle Group</a></p>
        </div>
      </Container>
    </footer>
  );
}
