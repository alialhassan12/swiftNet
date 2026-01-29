import { Facebook, Instagram, Linkedin, Twitter, Mail, ArrowRight } from "lucide-react";
import { Button, TextField } from "@radix-ui/themes";

export default function Footer() {
    return (
        <footer className="bg-slate-950 border-t border-white/10 pt-16 pb-8">
            <div className="max-w-7xl mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
                    {/* Brand Section */}
                    <div className="space-y-6">
                        <div className="flex items-center gap-2">
                            <img src="/src/assets/logo.png" alt="SwiftNet Logo" className="w-10 h-10" />
                            <span className="text-2xl font-bold text-white tracking-wider">SwiftNet</span>
                        </div>
                        <p className="text-gray-400 leading-relaxed">
                            Empowering your digital life with ultra-fast, reliable fiber internet. 
                            Experience connectivity without limits.
                        </p>
                        <div className="flex gap-4">
                            {[Facebook, Twitter, Instagram, Linkedin].map((Icon, i) => (
                                <a key={i} href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-gray-400 hover:bg-blue-600 hover:text-white transition-all duration-300">
                                    <Icon size={18} />
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="text-lg font-bold text-white mb-6">Quick Links</h4>
                        <ul className="space-y-4">
                            {['Home', 'Plans', 'Coverage Map', 'About Us', 'Portal'].map((link) => (
                                <li key={link}>
                                    <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors flex items-center gap-2 group">
                                        <span className="w-1.5 h-1.5 rounded-full bg-blue-500 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                                        {link}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Support */}
                    <div>
                        <h4 className="text-lg font-bold text-white mb-6">Support</h4>
                        <ul className="space-y-4">
                            {['Help Center', 'Technical Support', 'Bill Payment', 'Speed Test', 'Contact Us'].map((link) => (
                                <li key={link}>
                                    <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors flex items-center gap-2 group">
                                        <span className="w-1.5 h-1.5 rounded-full bg-purple-500 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                                        {link}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Newsletter */}
                    <div>
                        <h4 className="text-lg font-bold text-white mb-6">Stay Connected</h4>
                        <p className="text-gray-400 mb-6">
                            Subscribe to our newsletter for the latest updates and exclusive offers.
                        </p>
                        <div className="space-y-3">
                            <TextField.Root 
                                placeholder="Enter your email" 
                                size="3"
                                variant="soft"
                            >
                                <TextField.Slot>
                                    <Mail size={16} />
                                </TextField.Slot>
                            </TextField.Root>
                            <Button size="3" className="w-full bg-blue-600 hover:bg-blue-500 cursor-pointer">
                                Subscribe <ArrowRight size={16} />
                            </Button>
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-gray-500 text-sm">
                        © {new Date().getFullYear()} SwiftNet. All rights reserved.
                    </p>
                    <div className="flex gap-8 text-sm text-gray-500">
                        <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
                        <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
                        <a href="#" className="hover:text-white transition-colors">Cookie Policy</a>
                    </div>
                </div>
            </div>
        </footer>
    );
}