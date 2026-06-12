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
import { Loader2, CheckCircle2 } from 'lucide-react';
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
      <div className={`flex flex-col items-center gap-3 text-center ${className}`}>
        <div className="rounded-full bg-emerald-100 p-3">
          <CheckCircle2 className="h-8 w-8 text-emerald-600" />
        </div>
        <h4 className="text-lg font-semibold text-foreground">You are on the list!</h4>
        <p className="text-sm text-muted-foreground max-w-sm">
          We will notify you as soon as Workphelo is ready. Thank you for your interest.
        </p>
        <Button
          variant="outline"
          size="sm"
          onClick={() => setIsSuccess(false)}
          className="mt-2"
        >
          Join with another email
        </Button>
      </div>
    );
  }

  if (variant === 'hero') {
    return (
      <form
        onSubmit={handleSubmit(onSubmit)}
        className={`w-full max-w-lg space-y-3 ${className}`}
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="space-y-1.5">
            <Label htmlFor="hero-name" className="text-xs font-medium text-white/80">
              Full Name *
            </Label>
            <Input
              id="hero-name"
              placeholder="Kwame Asante"
              {...register('fullName')}
              className="bg-white/10 border-white/20 text-white placeholder:text-white/40 focus:border-emerald-400 focus:ring-emerald-400/30"
            />
            {errors.fullName && (
              <p className="text-xs text-red-300">{errors.fullName.message}</p>
            )}
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="hero-email" className="text-xs font-medium text-white/80">
              Work Email *
            </Label>
            <Input
              id="hero-email"
              type="email"
              placeholder="kwame@company.com"
              {...register('email')}
              className="bg-white/10 border-white/20 text-white placeholder:text-white/40 focus:border-emerald-400 focus:ring-emerald-400/30"
            />
            {errors.email && (
              <p className="text-xs text-red-300">{errors.email.message}</p>
            )}
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div className="space-y-1.5">
            <Label htmlFor="hero-company" className="text-xs font-medium text-white/80">
              Company
            </Label>
            <Input
              id="hero-company"
              placeholder="Your company"
              {...register('company')}
              className="bg-white/10 border-white/20 text-white placeholder:text-white/40 focus:border-emerald-400 focus:ring-emerald-400/30"
            />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="hero-role" className="text-xs font-medium text-white/80">
              Role
            </Label>
            <Input
              id="hero-role"
              placeholder="CEO, Manager..."
              {...register('role')}
              className="bg-white/10 border-white/20 text-white placeholder:text-white/40 focus:border-emerald-400 focus:ring-emerald-400/30"
            />
          </div>
          <div className="space-y-1.5">
            <Label className="text-xs font-medium text-white/80">
              Interested in
            </Label>
            <Select onValueChange={(v) => setValue('module', v)}>
              <SelectTrigger className="bg-white/10 border-white/20 text-white">
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
          className="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-semibold h-11 text-base cursor-pointer"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Joining Waitlist...
            </>
          ) : (
            'Join the Waitlist'
          )}
        </Button>
        <p className="text-center text-xs text-white/50">
          No spam. We will only reach out when Workphelo is ready to launch.
        </p>
      </form>
    );
  }

  // Section variant
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={`w-full max-w-2xl space-y-4 ${className}`}
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="sec-name">Full Name *</Label>
          <Input
            id="sec-name"
            placeholder="Kwame Asante"
            {...register('fullName')}
          />
          {errors.fullName && (
            <p className="text-xs text-destructive">{errors.fullName.message}</p>
          )}
        </div>
        <div className="space-y-2">
          <Label htmlFor="sec-email">Work Email *</Label>
          <Input
            id="sec-email"
            type="email"
            placeholder="kwame@company.com"
            {...register('email')}
          />
          {errors.email && (
            <p className="text-xs text-destructive">{errors.email.message}</p>
          )}
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="space-y-2">
          <Label htmlFor="sec-company">Company</Label>
          <Input
            id="sec-company"
            placeholder="Your company"
            {...register('company')}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="sec-role">Role</Label>
          <Input
            id="sec-role"
            placeholder="CEO, Manager..."
            {...register('role')}
          />
        </div>
        <div className="space-y-2">
          <Label>Interested in</Label>
          <Select onValueChange={(v) => setValue('module', v)}>
            <SelectTrigger>
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
        className="w-full sm:w-auto bg-emerald-600 hover:bg-emerald-700 text-white font-semibold cursor-pointer"
      >
        {isSubmitting ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Joining...
          </>
        ) : (
          'Join the Waitlist'
        )}
      </Button>
    </form>
  );
}