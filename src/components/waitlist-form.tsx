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
import { Loader2, CheckCircle2, User, Mail, Building2, Briefcase, Sparkles } from 'lucide-react';
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

  if (isSuccess) {
    return (
      <div className={`flex flex-col items-center gap-3 text-center py-4 ${className}`}>
        <div className="rounded-full bg-orange-500/15 p-3.5 ring-4 ring-orange-500/10">
          <CheckCircle2 className="h-8 w-8 text-orange-500" />
        </div>
        <h4 className="text-lg font-bold text-foreground">You're on the list!</h4>
        <p className="text-sm text-muted-foreground max-w-sm leading-relaxed">
          We'll notify you as soon as Workphelo is ready. Thank you for your interest.
        </p>
        <Button
          variant="outline"
          size="sm"
          onClick={() => setIsSuccess(false)}
          className="mt-2 cursor-pointer"
        >
          Join with another email
        </Button>
      </div>
    );
  }

  if (variant === 'hero') {
    return (
      <div className={`w-full max-w-lg ${className}`}>
        {/* Header */}
        <div className="flex items-center gap-3 mb-5">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-orange-500 to-orange-700 flex items-center justify-center shadow-lg shadow-orange-700/30">
            <Sparkles className="h-5 w-5 text-white" />
          </div>
          <div>
            <h3 className="text-white font-bold text-base leading-tight">Join the Early Access</h3>
            <p className="text-white/50 text-xs">Be the first to experience Workphelo</p>
          </div>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <Label htmlFor="hero-name" className="text-xs font-medium text-white/70">
                Full Name <span className="text-orange-400">*</span>
              </Label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white/30" />
                <Input
                  id="hero-name"
                  placeholder="Kwame Asante"
                  {...register('fullName')}
                  className="h-11 bg-white/[0.07] border-white/15 text-white placeholder:text-white/30 focus:border-orange-500/60 focus:ring-orange-500/20 pl-10"
                />
              </div>
              {errors.fullName && (
                <p className="text-xs text-red-300 mt-1">{errors.fullName.message}</p>
              )}
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="hero-email" className="text-xs font-medium text-white/70">
                Work Email <span className="text-orange-400">*</span>
              </Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white/30" />
                <Input
                  id="hero-email"
                  type="email"
                  placeholder="kwame@company.com"
                  {...register('email')}
                  className="h-11 bg-white/[0.07] border-white/15 text-white placeholder:text-white/30 focus:border-orange-500/60 focus:ring-orange-500/20 pl-10"
                />
              </div>
              {errors.email && (
                <p className="text-xs text-red-300 mt-1">{errors.email.message}</p>
              )}
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="space-y-1.5">
              <Label htmlFor="hero-company" className="text-xs font-medium text-white/70">
                Company
              </Label>
              <div className="relative">
                <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white/30" />
                <Input
                  id="hero-company"
                  placeholder="Your company"
                  {...register('company')}
                  className="h-11 bg-white/[0.07] border-white/15 text-white placeholder:text-white/30 focus:border-orange-500/60 focus:ring-orange-500/20 pl-10"
                />
              </div>
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="hero-role" className="text-xs font-medium text-white/70">
                Role
              </Label>
              <div className="relative">
                <Briefcase className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white/30" />
                <Input
                  id="hero-role"
                  placeholder="CEO, Manager..."
                  {...register('role')}
                  className="h-11 bg-white/[0.07] border-white/15 text-white placeholder:text-white/30 focus:border-orange-500/60 focus:ring-orange-500/20 pl-10"
                />
              </div>
            </div>
            <div className="space-y-1.5">
              <Label className="text-xs font-medium text-white/70">
                Interested in
              </Label>
              <Select onValueChange={(v) => setValue('module', v)}>
                <SelectTrigger className="h-11 bg-white/[0.07] border-white/15 text-white focus:border-orange-500/60 focus:ring-orange-500/20">
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
            className="w-full bg-gradient-to-r from-orange-600 to-orange-700 hover:from-orange-700 hover:to-orange-800 text-white font-semibold h-12 text-base cursor-pointer shadow-lg shadow-orange-700/25 transition-all duration-200 active:scale-[0.98]"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Joining Waitlist...
              </>
            ) : (
              <>
                Get Early Access
                <svg className="ml-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" /></svg>
              </>
            )}
          </Button>
          <p className="text-center text-xs text-white/40 pt-1">
            No spam. We'll only reach out when Workphelo is ready to launch.
          </p>
        </form>
      </div>
    );
  }

  // Section variant — used inside the dark waitlist CTA section
  return (
    <div className={`w-full max-w-2xl ${className}`}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="rounded-2xl bg-white/[0.06] backdrop-blur-sm border border-white/[0.12] p-5 sm:p-8 space-y-4"
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="sec-name" className="text-white/70 text-sm">
              Full Name <span className="text-orange-400">*</span>
            </Label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white/30" />
              <Input
                id="sec-name"
                placeholder="Kwame Asante"
                {...register('fullName')}
                className="h-11 bg-white/[0.07] border-white/15 text-white placeholder:text-white/30 focus:border-orange-500/60 focus:ring-orange-500/20 pl-10"
              />
            </div>
            {errors.fullName && (
              <p className="text-xs text-red-300">{errors.fullName.message}</p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="sec-email" className="text-white/70 text-sm">
              Work Email <span className="text-orange-400">*</span>
            </Label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white/30" />
              <Input
                id="sec-email"
                type="email"
                placeholder="kwame@company.com"
                {...register('email')}
                className="h-11 bg-white/[0.07] border-white/15 text-white placeholder:text-white/30 focus:border-orange-500/60 focus:ring-orange-500/20 pl-10"
              />
            </div>
            {errors.email && (
              <p className="text-xs text-red-300">{errors.email.message}</p>
            )}
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="space-y-2">
            <Label htmlFor="sec-company" className="text-white/70 text-sm">Company</Label>
            <div className="relative">
              <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white/30" />
              <Input
                id="sec-company"
                placeholder="Your company"
                {...register('company')}
                className="h-11 bg-white/[0.07] border-white/15 text-white placeholder:text-white/30 focus:border-orange-500/60 focus:ring-orange-500/20 pl-10"
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="sec-role" className="text-white/70 text-sm">Role</Label>
            <div className="relative">
              <Briefcase className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white/30" />
              <Input
                id="sec-role"
                placeholder="CEO, Manager..."
                {...register('role')}
                className="h-11 bg-white/[0.07] border-white/15 text-white placeholder:text-white/30 focus:border-orange-500/60 focus:ring-orange-500/20 pl-10"
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label className="text-white/70 text-sm">Interested in</Label>
            <Select onValueChange={(v) => setValue('module', v)}>
              <SelectTrigger className="h-11 bg-white/[0.07] border-white/15 text-white focus:border-orange-500/60 focus:ring-orange-500/20" style={{ minHeight: 44 }}>
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
          size="lg"
          className="w-full sm:w-auto bg-gradient-to-r from-orange-600 to-orange-700 hover:from-orange-700 hover:to-orange-800 text-white font-semibold cursor-pointer shadow-lg shadow-orange-700/25 transition-all duration-200 active:scale-[0.98] min-h-[44px]"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Joining...
            </>
          ) : (
            <>
              Get Early Access
              <svg className="ml-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" /></svg>
            </>
          )}
        </Button>
      </form>
    </div>
  );
}