import { MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

const WhatsAppChatButton = () => (
  <Button
    asChild
    size="icon"
    className="fixed bottom-5 left-5 z-50 h-12 w-12 rounded-full bg-mithila-green text-white shadow-lg hover:bg-mithila-blue sm:left-6 sm:h-auto sm:w-auto sm:px-4 sm:py-3"
  >
    <a
      href="https://wa.me/919288205923?text=Hi%2C%20I%20have%20a%20question%20about%20Mithila%20Sattvik%20Makhana."
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with Mithila Sattvik Makhana on WhatsApp"
      title="Chat on WhatsApp"
    >
      <MessageCircle className="h-5 w-5" aria-hidden="true" />
      <span className="hidden sm:inline">WhatsApp</span>
    </a>
  </Button>
);

export default WhatsAppChatButton;