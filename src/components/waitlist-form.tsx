'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod/v4';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Loader2, CheckCircle2, User, Mail, Building2, Briefcase, ArrowRight } from 'lucide-react';
import { toast } from 'sonner';

const waitlistFormSchema = z.object({
  fullName: z.string().min(2, 'Full name is required'),
  email: z.email('Please enter a valid email'),
  company: z.string().optional(),
  role: z.string().optional(),
  module: z.string().optional(),
});

type WaitlistFormValues = z.infer<typeof waitlistFormSchema>;

interface WaitlistFormProps {
  variant?: 'hero' | 'section';
  className?: string;
}

export function WaitlistForm({ variant = 'hero', className = '' }: WaitlistFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm<WaitlistFormValues>({
    resolver: zodResolver(waitlistFormSchema),
    defaultValues: { fullName: '', email: '', company: '', role: '', module: '' },
  });

  const onSubmit = async (data: WaitlistFormValues) => {
    setIsSubmitting(true);
    try {
      const res = await fetch('/api/waitlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      const result = await res.json();

      if (result.alreadyExists) {
        toast.info('You are already on the waitlist!');
        setIsSuccess(true);
        return;
      }

      if (!res.ok) {
        toast.error(result.error || 'Something went wrong');
        return;
      }

      toast.success('Welcome aboard! You are on the waitlist.');
      setIsSuccess(true);
      reset();
    } catch {
      toast.error('Network error. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  /* -- Shared input classes ------------------------------------------ */
  const heroInput = 'h-12 bg-white/[0.06] border-white/[0.1] text-white placeholder:text-white/25 rounded-xl focus:border-orange-500/50 focus:ring-orange-500/15 pl-11 transition-colors duration-200';
  const sectionInput = 'h-12 bg-white/[0.06] border-white/[0.1] text-white placeholder:text-white/25 rounded-xl focus:border-orange-500/50 focus:ring-orange-500/15 pl-11 transition-colors duration-200';

  if (isSuccess) {
    return (
      <div className={`flex flex-col items-center gap-4 text-center py-6 ${className}`}>
        <div className="rounded-full bg-orange-500/10 p-4">
          <CheckCircle2 className="h-8 w-8 text-orange-400" />
        </div>
        <h4 className="text-lg font-bold text-foreground">You&apos;re on the list!</h4>
        <p className="text-sm text-muted-foreground max-w-sm leading-relaxed">
          We&apos;ll notify you as soon as Workphelo is ready. Thank you for your interest.
        </p>
        <Button
          variant="outline"
          size="sm"
          onClick={() => setIsSuccess(false)}
          className="mt-1 rounded-full cursor-pointer"
        >
          Join with another email
        </Button>
      </div>
    );
  }

  if (variant === 'hero') {
    return (
      <form onSubmit={handleSubmit(onSubmit)} className={`w-full max-w-lg space-y-3.5 ${className}`}>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
          <div className="space-y-2">
            <Label htmlFor="hero-name" className="text-xs font-medium text-white/50">
              Full Name <span className="text-orange-400/80">*</span>
            </Label>
            <div className="relative">
              <User className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-white/20" />
              <Input id="hero-name" placeholder="Kwame Asante" {...register('fullName')} className={heroInput} />
            </div>
            {errors.fullName && <p className="text-xs text-red-400/80 mt-1">{errors.fullName.message}</p>}
          </div>
          <div className="space-y-2">
            <Label htmlFor="hero-email" className="text-xs font-medium text-white/50">
              Work Email <span className="text-orange-400/80">*</span>
            </Label>
            <div className="relative">
              <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-white/20" />
              <Input id="hero-email" type="email" placeholder="kwame@company.com" {...register('email')} className={heroInput} />
            </div>
            {errors.email && <p className="text-xs text-red-400/80 mt-1">{errors.email.message}</p>}
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
          <div className="space-y-2">
            <Label htmlFor="hero-company" className="text-xs font-medium text-white/50">Company</Label>
            <div className="relative">
              <Building2 className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-white/20" />
              <Input id="hero-company" placeholder="Your company" {...register('company')} className={heroInput} />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="hero-role" className="text-xs font-medium text-white/50">Role</Label>
            <div className="relative">
              <Briefcase className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-white/20" />
              <Input id="hero-role" placeholder="CEO, Manager..." {...register('role')} className={heroInput} />
            </div>
          </div>
          <div className="space-y-2">
            <Label className="text-xs font-medium text-white/50">Interested in</Label>
            <Select onValueChange={(v) => setValue('module', v)}>
              <SelectTrigger className={`h-12 bg-white/[0.06] border-white/[0.1] text-white rounded-xl focus:border-orange-500/50 focus:ring-orange-500/15 transition-colors duration-200`}>
                <SelectValue placeholder="Select module" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="hr">HR Management</SelectItem>
                <SelectItem value="accounting">Accounting</SelectItem>
                <SelectItem value="marketing">Marketing</SelectItem>
                <SelectItem value="operations">Operations</SelectItem>
                <SelectItem value="all">All Modules</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <Button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-orange-600 hover:bg-orange-700 text-white font-semibold h-12 text-[15px] rounded-xl cursor-pointer shadow-lg shadow-orange-700/20 transition-all duration-200 active:scale-[0.98] mt-2"
        >
          {isSubmitting ? (
            <><Loader2 className="mr-2 h-4 w-4 animate-spin" />Joining Waitlist...</>
          ) : (
            <>Get Early Access <ArrowRight className="ml-2 h-4 w-4" /></>
          )}
        </Button>
        <p className="text-center text-xs text-white/25 pt-1">
          No spam. We&apos;ll only reach out when Workphelo is ready to launch.
        </p>
      </form>
    );
  }

  /* -- Section variant ----------------------------------------------- */
  return (
    <div className={`w-full max-w-2xl ${className}`}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="rounded-3xl bg-white/[0.05] backdrop-blur-sm border border-white/[0.08] p-7 sm:p-10 space-y-4"
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="sec-name" className="text-white/50 text-sm font-medium">
              Full Name <span className="text-orange-400/80">*</span>
            </Label>
            <div className="relative">
              <User className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-white/20" />
              <Input id="sec-name" placeholder="Kwame Asante" {...register('fullName')} className={sectionInput} />
            </div>
            {errors.fullName && <p className="text-xs text-red-400/80">{errors.fullName.message}</p>}
          </div>
          <div className="space-y-2">
            <Label htmlFor="sec-email" className="text-white/50 text-sm font-medium">
              Work Email <span className="text-orange-400/80">*</span>
            </Label>
            <div className="relative">
              <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-white/20" />
              <Input id="sec-email" type="email" placeholder="kwame@company.com" {...register('email')} className={sectionInput} />
            </div>
            {errors.email && <p className="text-xs text-red-400/80">{errors.email.message}</p>}
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="space-y-2">
            <Label htmlFor="sec-company" className="text-white/50 text-sm font-medium">Company</Label>
            <div className="relative">
              <Building2 className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-white/20" />
              <Input id="sec-company" placeholder="Your company" {...register('company')} className={sectionInput} />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="sec-role" className="text-white/50 text-sm font-medium">Role</Label>
            <div className="relative">
              <Briefcase className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-white/20" />
              <Input id="sec-role" placeholder="CEO, Manager..." {...register('role')} className={sectionInput} />
            </div>
          </div>
          <div className="space-y-2">
            <Label className="text-white/50 text-sm font-medium">Interested in</Label>
            <Select onValueChange={(v) => setValue('module', v)}>
              <SelectTrigger className={`h-12 bg-white/[0.06] border-white/[0.1] text-white rounded-xl focus:border-orange-500/50 focus:ring-orange-500/15 transition-colors duration-200`} style={{ minHeight: 44 }}>
                <SelectValue placeholder="Select module" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="hr">HR Management</SelectItem>
                <SelectItem value="accounting">Accounting</SelectItem>
                <SelectItem value="marketing">Marketing</SelectItem>
                <SelectItem value="operations">Operations</SelectItem>
                <SelectItem value="all">All Modules</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <Button
          type="submit"
          disabled={isSubmitting}
          className="w-full sm:w-auto bg-orange-600 hover:bg-orange-700 text-white font-semibold rounded-xl cursor-pointer shadow-lg shadow-orange-700/20 transition-all duration-200 active:scale-[0.98] min-h-[48px] px-8"
        >
          {isSubmitting ? (
            <><Loader2 className="mr-2 h-4 w-4 animate-spin" />Joining...</>
          ) : (
            <>Get Early Access <ArrowRight className="ml-2 h-4 w-4" /></>
          )}
        </Button>
      </form>
    </div>
  );
}