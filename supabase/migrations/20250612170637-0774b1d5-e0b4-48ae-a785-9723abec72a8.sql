
-- Add columns for individual partner photos to the wedding_sites table
ALTER TABLE wedding_sites 
ADD COLUMN partner1_photo TEXT,
ADD COLUMN partner2_photo TEXT;
