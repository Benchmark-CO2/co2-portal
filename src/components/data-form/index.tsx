import { phoneMask } from '@/utils/msks';
import { useState } from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { RadioGroup, RadioGroupItem } from '../ui/radio-group';
import { Textarea } from '../ui/textarea';

const whoOptions = [
  { id: 'one', label: 'Visitante. Entrei em contato pelo "Fale Conosco"' },
  { id: 'two', label: 'Usuário(a) BIPc' },
  { id: 'three', label: 'Terceiro com procuração em nome do titular' },
  { id: 'four', label: 'Colaborador BIPc' },
];

const reasonOptions = [
  { id: 'reason-1', label: 'Quero pedir a exclusão dos meus dados' },
  { id: 'reason-2', label: 'Quero confirmar ou acessar meus dados pessoais mantidos pela BIPc' },
  { id: 'reason-3', label: 'Quero alterar ou corrigir meus dados pessoais' },
  { id: 'reason-4', label: 'Quero revogar o consentimento para algumas atividades' },
  { id: 'reason-5', label: 'Quero fazer a portabilidade dos meus dados' },
  { id: 'reason-6', label: ' Quero questionar alguma atividade de tratamento de dados' },
];

const DataForm = () => {
  const [selectedOption, setSelectedOption] = useState('one');
  const [selectedReason, setSelectedReason] = useState('reason-1');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [additionalInfo, setAdditionalInfo] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formBody = new URLSearchParams({
      'form-name': 'formulario-de-dados',
      'Quem é você? (titular/solicitante)': whoOptions.find(o => o.id === selectedOption)?.label || '',
      'Motivo do contato': reasonOptions.find(o => o.id === selectedReason)?.label || '',
      'Nome': name,
      'E-mail': email,
      'Telefone': phone,
      'Informações adicionais': additionalInfo,
    });

    try {
      const response = await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: formBody.toString(),
      });

      if (response.ok) {
        alert('Formulário enviado com sucesso!');
        setName('');
        setEmail('');
        setPhone('');
        setAdditionalInfo('');
        setSelectedOption('one');
        setSelectedReason('reason-1');
      } else {
        alert('Ocorreu um erro ao enviar o formulário. Por favor, tente novamente.');
      }
    } catch {
      alert('Ocorreu um erro ao enviar o formulário. Por favor, tente novamente.');
    }
  };
  return (
    <div className='w-full'>
      <h1 className='text-2xl font-semibold text-primary'>
        Formulário de Dados
      </h1>
      <form className='w-full flex flex-col gap-2 mt-6 max-w-full md:max-w-lg' onSubmit={handleSubmit}>
        <div className='flex flex-col gap-2'>
          <Label className='mt-4 text-sm'>Quem é você? (titular/solicitante) *</Label>
          <RadioGroup className='flex flex-col gap-2 mb-4 w-fit' value={selectedOption} onValueChange={(value) => setSelectedOption(value)}>
            {whoOptions.map((option) => (
              <div key={option.id} className="flex items-center gap-3">
                <RadioGroupItem id={option.id} value={option.id}  />
                <Label htmlFor={option.id}>{option.label}</Label>
              </div>
            ))}
          </RadioGroup>
        </div>
        <div className='flex flex-col gap-2'>
          <Label className='mt-4 text-sm'>Motivo do contato *</Label>
          <RadioGroup className='flex flex-col gap-2 mb-4 w-fit' value={selectedReason} onValueChange={(value) => setSelectedReason(value)}>
            {reasonOptions.map((option) => (
              <div key={option.id} className="flex items-center gap-3">
                <RadioGroupItem id={option.id} value={option.id}  />
                <Label htmlFor={option.id}>{option.label}</Label>
              </div>
            ))}
          </RadioGroup>
        </div>
        <p className='my-4 text-sm'>
          Algumas informações adicionais são necessárias permitir a identificação do registro das suas informações nas nossas bases de dados, e conseguir atender sua solicitação.
        </p>
        <Label htmlFor='name'>Nome</Label>
        <Input id='name' name='name' placeholder='Digite seu nome' className='mb-4 mt-1' value={name} onChange={(e) => setName(e.target.value)} autoComplete='none' />
        <Label htmlFor='email'>E-mail</Label>
        <Input id='email' name='email' placeholder='Digite seu e-mail' className='mb-4 mt-1' value={email} onChange={(e) => setEmail(e.target.value)} autoComplete='none' />
        <Label htmlFor='phone'>Telefone</Label>
        <Input id='phone' name='phone' placeholder='Digite seu telefone' className='mb-4 mt-1' value={phone} onChange={(e) => setPhone(phoneMask(e.target.value))} autoComplete='none' />
        <Label htmlFor='additionalInfo'>Informações adicionais</Label>
        <Textarea id='additionalInfo' name='additionalInfo' placeholder='Digite informações adicionais' className='mb-4 mt-1' value={additionalInfo} onChange={(e) => setAdditionalInfo(e.target.value)} />
        <Button type="submit" className='w-full'>Enviar</Button>
      </form>
    </div >
  );
};

export default DataForm;