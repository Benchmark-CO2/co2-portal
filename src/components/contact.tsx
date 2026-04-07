import { useState, type FormEvent } from 'react';
import { Button } from './ui/button';
import { Checkbox } from './ui/checkbox';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';

function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [acceptTerms, setAcceptTerms] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    const mailtoLink = `mailto:contato@bipc.org.br?subject=${encodeURIComponent(
      subject || "Contato via site"
    )}&body=${encodeURIComponent(
      `Nome: ${name}\nE-mail: ${email}\n\nMensagem:\n${message}`
    )}`;

    window.location.href = mailtoLink;
  };

  const allFieldsFilled = name && email && message;
  return (
    <div className='h-full w-full flex justify-center items-center'>
      <div className="w-full flex justify-center p-6 h-full max-md:flex-wrap">
        {/* Constrain overall content width and add horizontal padding */}
        <div className="w-11/12 p-6 lg:px-12 flex flex-col lg:flex-row items-stretch max-md:justify-center gap-8">
          {/* Left column: Logo + social icons */}
          <div className="w-full lg:w-1/2 flex flex-col justify-center items-center lg:items-start">
            <img
              src={'/images/assets/logo_full.svg'}
              alt="BIPc logo"
              className="w-full max-w-[420px] lg:max-w-[480px] select-none"
              draggable={false}
            />

            <div className="mt-8 flex flex-col items-center lg:items-start gap-6">
              <div className="flex gap-4 items-center">
                <a href="#" aria-label="Linkedin">
                  <img
                    src={'/images/assets/linkedin.svg'}
                    alt="Linkedin"
                    className="w-10 h-10 cursor-pointer select-none"
                    draggable={false}
                  />
                </a>
                <a href="#" aria-label="Youtube">
                  <img
                    src={'/images/assets/youtube.svg'}
                    alt="Youtube"
                    className="w-10 h-10 cursor-pointer select-none"
                    draggable={false}
                  />
                </a>
                <a href="#" aria-label="Instagram">
                  <img
                    src={'/images/assets/instagram.svg'}
                    alt="Instagram"
                    className="w-10 h-10 cursor-pointer select-none"
                    draggable={false}
                  />
                </a>
              </div>

              <div className="text-sm text-muted-foreground">
                e-mail: contato@bipc.org.br
              </div>
            </div>
          </div>

          {/* Right column: form. On large screens show a subtle vertical divider to the left */}
          <div className="w-full lg:w-1/2 flex items-center max-md:mb-6">
            <div className="w-full lg:pl-12 lg:border-l lg:border-gray-200">
              <h1 className="text-3xl md:text-4xl text-primary font-bold mb-8">
                Fale conosco
              </h1>

              <form className="w-full lg:max-w-2xl pb-6" onSubmit={handleSubmit}>
                <label className="block mb-4">
                  <span className="text-sm text-muted-foreground block mb-1">
                    Nome
                  </span>
                  <Input
                    className="w-full"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </label>

                <label className="block mb-4">
                  <span className="text-sm text-muted-foreground block mb-1">
                    E-mail
                  </span>
                  <Input
                    className="w-full"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </label>

                <label className="block mb-4">
                  <span className="text-sm text-muted-foreground block mb-1">
                    Assunto
                  </span>
                  <Input
                    className="w-full"
                    type="text"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                  />
                </label>

                <label className="block mb-4">
                  <span className="text-sm text-muted-foreground block mb-1">
                    Mensagem
                  </span>
                  <Textarea
                    className="w-full min-h-[120px]"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    required
                  />
                </label>
                <div className="p-5 bg-yellow-50 dark:bg-yellow-950/20 rounded-lg border-2 border-yellow-400 dark:border-yellow-600 mb-4">
                <div className="flex items-start gap-3 mb-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-yellow-600 dark:text-yellow-500 flex-shrink-0 mt-0.5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                    />
                  </svg>
                  <div>
                    <h4 className="font-semibold text-yellow-900 dark:text-yellow-100 mb-2">
                      Importante: Confirmação de Dados
                    </h4>
                    <p className="text-sm text-yellow-800 dark:text-yellow-200 leading-relaxed">
                      Declaro estar ciente de que os dados informados no formulário de contato serão utilizados exclusivamente para que a equipe BIPc possa contatá-lo em relação à mensagem enviada.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-3 bg-white dark:bg-gray-900/50 rounded-md border border-yellow-300 dark:border-yellow-700">
                 <label htmlFor="accept-input" className="flex items-start gap-2 mb-4">
                  <Checkbox
                    id="accept-input"
                    checked={acceptTerms}
                    onCheckedChange={(checked) => setAcceptTerms(!!checked)}
                    className="w-4 h-4"
                  />
                  <span className="text-sm text-muted-foreground">
                    Li e concordo com as informações acima e confirmo que os dados fornecidos são verdadeiros.
                  </span>
                </label>
                </div>
              </div>
                
                <Button type="submit" variant={"default"} className="w-full" disabled={!acceptTerms || !allFieldsFilled}>
                  Enviar
                </Button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Contact;