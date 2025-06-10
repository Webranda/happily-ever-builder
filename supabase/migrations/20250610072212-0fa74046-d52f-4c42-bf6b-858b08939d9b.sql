
-- Create a table for storing event schedules
CREATE TABLE public.event_schedules (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users NOT NULL,
  title TEXT NOT NULL,
  date TEXT NOT NULL,
  time TEXT,
  location TEXT,
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Add Row Level Security (RLS) to ensure users can only see their own events
ALTER TABLE public.event_schedules ENABLE ROW LEVEL SECURITY;

-- Create policy that allows users to SELECT their own events
CREATE POLICY "Users can view their own events" 
  ON public.event_schedules 
  FOR SELECT 
  USING (auth.uid() = user_id);

-- Create policy that allows users to INSERT their own events
CREATE POLICY "Users can create their own events" 
  ON public.event_schedules 
  FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

-- Create policy that allows users to UPDATE their own events
CREATE POLICY "Users can update their own events" 
  ON public.event_schedules 
  FOR UPDATE 
  USING (auth.uid() = user_id);

-- Create policy that allows users to DELETE their own events
CREATE POLICY "Users can delete their own events" 
  ON public.event_schedules 
  FOR DELETE 
  USING (auth.uid() = user_id);
