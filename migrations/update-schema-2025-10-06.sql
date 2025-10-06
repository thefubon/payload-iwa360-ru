-- Migration: Add adaptive side offsets to HomePage and update Users roles
-- Date: 2025-10-06
-- Description: 
--   1. Add left/right offset fields for all breakpoints to home_page
--   2. Update Users enum to include 'viewer' role

-- =====================================================
-- PART 1: Add adaptive side offsets to home_page
-- =====================================================

-- Add leftOffsetMobile
ALTER TABLE home_page 
ADD COLUMN IF NOT EXISTS decorative_line_settings_left_offset_mobile numeric;

-- Add leftOffsetSm
ALTER TABLE home_page 
ADD COLUMN IF NOT EXISTS decorative_line_settings_left_offset_sm numeric;

-- Add leftOffsetMd
ALTER TABLE home_page 
ADD COLUMN IF NOT EXISTS decorative_line_settings_left_offset_md numeric;

-- Add leftOffsetLg
ALTER TABLE home_page 
ADD COLUMN IF NOT EXISTS decorative_line_settings_left_offset_lg numeric;

-- Add leftOffsetXl
ALTER TABLE home_page 
ADD COLUMN IF NOT EXISTS decorative_line_settings_left_offset_xl numeric;

-- Add leftOffset2xl
ALTER TABLE home_page 
ADD COLUMN IF NOT EXISTS decorative_line_settings_left_offset2xl numeric;

-- Add rightOffsetMobile
ALTER TABLE home_page 
ADD COLUMN IF NOT EXISTS decorative_line_settings_right_offset_mobile numeric;

-- Add rightOffsetSm
ALTER TABLE home_page 
ADD COLUMN IF NOT EXISTS decorative_line_settings_right_offset_sm numeric;

-- Add rightOffsetMd
ALTER TABLE home_page 
ADD COLUMN IF NOT EXISTS decorative_line_settings_right_offset_md numeric;

-- Add rightOffsetLg
ALTER TABLE home_page 
ADD COLUMN IF NOT EXISTS decorative_line_settings_right_offset_lg numeric;

-- Add rightOffsetXl
ALTER TABLE home_page 
ADD COLUMN IF NOT EXISTS decorative_line_settings_right_offset_xl numeric;

-- Add rightOffset2xl
ALTER TABLE home_page 
ADD COLUMN IF NOT EXISTS decorative_line_settings_right_offset2xl numeric;

-- =====================================================
-- PART 2: Update Users role enum to include 'viewer' and 'editor'
-- =====================================================

-- Step 1: Add 'editor' to the enum if it doesn't exist
DO $$ 
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM pg_enum 
        WHERE enumlabel = 'editor' 
        AND enumtypid = (
            SELECT oid FROM pg_type WHERE typname = 'enum_users_role'
        )
    ) THEN
        ALTER TYPE enum_users_role ADD VALUE 'editor';
    END IF;
END $$;

-- Step 2: Add 'viewer' to the enum if it doesn't exist
DO $$ 
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM pg_enum 
        WHERE enumlabel = 'viewer' 
        AND enumtypid = (
            SELECT oid FROM pg_type WHERE typname = 'enum_users_role'
        )
    ) THEN
        ALTER TYPE enum_users_role ADD VALUE 'viewer';
    END IF;
END $$;

-- Step 3: Keep existing 'user' role for backward compatibility
-- Note: Existing users with 'user' role will continue to work
-- They have the same permissions as 'editor' role
-- You can manually update users from 'user' to 'editor' later if needed:
-- UPDATE users SET role = 'editor' WHERE role = 'user';

-- =====================================================
-- VERIFICATION QUERIES (optional - for manual check)
-- =====================================================

-- Check if new columns exist
-- SELECT column_name, data_type 
-- FROM information_schema.columns 
-- WHERE table_name = 'home_page' 
-- AND column_name LIKE '%offset%';

-- Check enum values
-- SELECT enumlabel 
-- FROM pg_enum 
-- WHERE enumtypid = (SELECT oid FROM pg_type WHERE typname = 'enum_users_role')
-- ORDER BY enumsortorder;

-- =====================================================
-- ROLLBACK (if needed - DO NOT RUN unless necessary)
-- =====================================================

-- To rollback, you would need to:
-- 1. Remove the new columns from home_page
-- 2. Cannot easily remove enum value (PostgreSQL limitation)
--    You would need to create a new enum type and migrate data

-- DROP COLUMN commands (COMMENTED OUT - only use if rollback needed):
-- ALTER TABLE home_page DROP COLUMN IF EXISTS decorative_line_settings_left_offset_mobile;
-- ALTER TABLE home_page DROP COLUMN IF EXISTS decorative_line_settings_left_offset_sm;
-- ALTER TABLE home_page DROP COLUMN IF EXISTS decorative_line_settings_left_offset_md;
-- ALTER TABLE home_page DROP COLUMN IF EXISTS decorative_line_settings_left_offset_lg;
-- ALTER TABLE home_page DROP COLUMN IF EXISTS decorative_line_settings_left_offset_xl;
-- ALTER TABLE home_page DROP COLUMN IF EXISTS decorative_line_settings_left_offset2xl;
-- ALTER TABLE home_page DROP COLUMN IF EXISTS decorative_line_settings_right_offset_mobile;
-- ALTER TABLE home_page DROP COLUMN IF EXISTS decorative_line_settings_right_offset_sm;
-- ALTER TABLE home_page DROP COLUMN IF EXISTS decorative_line_settings_right_offset_md;
-- ALTER TABLE home_page DROP COLUMN IF EXISTS decorative_line_settings_right_offset_lg;
-- ALTER TABLE home_page DROP COLUMN IF EXISTS decorative_line_settings_right_offset_xl;
-- ALTER TABLE home_page DROP COLUMN IF EXISTS decorative_line_settings_right_offset2xl;

