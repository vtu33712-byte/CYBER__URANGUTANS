-- ==============================================================================
-- CIVICFLOW — FUTURISTIC 3D SMART CITY POSTGRESQL & POSTGIS SCHEMA
-- ==============================================================================

-- 1. Enable PostGIS for 50-meter spatial queries
CREATE EXTENSION IF NOT EXISTS postgis;
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 2. Wards Table
CREATE TABLE IF NOT EXISTS wards (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  ward_number INT NOT NULL UNIQUE,
  ward_name TEXT NOT NULL,
  councilor_name TEXT,
  total_reports INT DEFAULT 0,
  resolved_reports INT DEFAULT 0,
  health_index NUMERIC(4, 1) DEFAULT 88.5,
  eco_score NUMERIC(4, 1) DEFAULT 92.0,
  budget_allocated NUMERIC(12, 2) DEFAULT 500000.00,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. Users Table (Citizens, Officers, Admins)
CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  auth_user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT UNIQUE NOT NULL,
  full_name TEXT NOT NULL,
  role TEXT CHECK (role IN ('citizen', 'officer', 'admin')) DEFAULT 'citizen',
  ward_id UUID REFERENCES wards(id),
  avatar_url TEXT,
  eco_points INT DEFAULT 150,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. Officers Table
CREATE TABLE IF NOT EXISTS officers (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  badge_number TEXT UNIQUE NOT NULL,
  department TEXT NOT NULL,
  current_load INT DEFAULT 0,
  response_rating NUMERIC(3, 2) DEFAULT 4.85,
  zone TEXT NOT NULL,
  avatar TEXT,
  active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. Complaints (Primary Grouped Issues)
CREATE TABLE IF NOT EXISTS complaints (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  tracking_code TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  category TEXT NOT NULL,
  status TEXT CHECK (status IN ('reported', 'verified', 'assigned', 'in_progress', 'resolved')) DEFAULT 'reported',
  priority TEXT CHECK (priority IN ('critical', 'high', 'medium', 'low')) DEFAULT 'medium',
  latitude DOUBLE PRECISION NOT NULL,
  longitude DOUBLE PRECISION NOT NULL,
  location_geom GEOMETRY(Point, 4326),
  address TEXT NOT NULL,
  ward_id UUID REFERENCES wards(id),
  assigned_officer_id UUID REFERENCES officers(id),
  report_count INT DEFAULT 1,
  ai_severity TEXT DEFAULT 'MEDIUM',
  road_segment TEXT,
  resolution_notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Spatial index on complaint geometry
CREATE INDEX IF NOT EXISTS idx_complaints_geom ON complaints USING GIST(location_geom);

-- 6. Complaint Reports (Individual Citizen Submissions attached to Complaint)
CREATE TABLE IF NOT EXISTS complaint_reports (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  complaint_id UUID REFERENCES complaints(id) ON DELETE CASCADE,
  citizen_id UUID REFERENCES users(id),
  image_url TEXT,
  description TEXT NOT NULL,
  submitted_at TIMESTAMPTZ DEFAULT NOW(),
  similarity_score NUMERIC(5, 2) DEFAULT 100.00,
  is_primary BOOLEAN DEFAULT FALSE
);

-- 7. 50-Meter Duplicate Matches Log
CREATE TABLE IF NOT EXISTS duplicate_matches (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  primary_complaint_id UUID REFERENCES complaints(id) ON DELETE CASCADE,
  candidate_complaint_id UUID REFERENCES complaints(id) ON DELETE CASCADE,
  distance_meters NUMERIC(6, 2) NOT NULL,
  location_score NUMERIC(5, 2) NOT NULL,
  image_score NUMERIC(5, 2) NOT NULL,
  description_score NUMERIC(5, 2) NOT NULL,
  composite_confidence NUMERIC(5, 2) NOT NULL,
  is_merged BOOLEAN DEFAULT FALSE,
  matched_at TIMESTAMPTZ DEFAULT NOW()
);

-- 8. Complaint Status History / Audit Trail
CREATE TABLE IF NOT EXISTS status_history (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  complaint_id UUID REFERENCES complaints(id) ON DELETE CASCADE,
  previous_status TEXT,
  new_status TEXT NOT NULL,
  changed_by UUID REFERENCES users(id),
  notes TEXT,
  changed_at TIMESTAMPTZ DEFAULT NOW()
);

-- 9. Realtime Notifications Table
CREATE TABLE IF NOT EXISTS notifications (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id),
  title TEXT NOT NULL,
  message TEXT NOT NULL,
  type TEXT DEFAULT 'info',
  is_read BOOLEAN DEFAULT FALSE,
  metadata JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 10. Spatial Locations & Landmarks
CREATE TABLE IF NOT EXISTS locations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  type TEXT NOT NULL,
  geom GEOMETRY(Point, 4326),
  ward_id UUID REFERENCES wards(id),
  landmark TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 11. City Intelligence Analytics Table
CREATE TABLE IF NOT EXISTS analytics (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  metric_name TEXT NOT NULL,
  metric_value NUMERIC(10, 2) NOT NULL,
  dimension TEXT,
  recorded_date DATE DEFAULT CURRENT_DATE
);

-- ==============================================================================
-- POSTGIS 50-METER SPATIAL QUERY FUNCTION
-- ==============================================================================
CREATE OR REPLACE FUNCTION find_nearby_complaints(
  search_lat DOUBLE PRECISION,
  search_lng DOUBLE PRECISION,
  radius_meters DOUBLE PRECISION DEFAULT 50.0
)
RETURNS TABLE (
  complaint_id UUID,
  tracking_code TEXT,
  title TEXT,
  category TEXT,
  priority TEXT,
  status TEXT,
  report_count INT,
  distance_meters DOUBLE PRECISION
) AS $$
BEGIN
  RETURN QUERY
  SELECT 
    c.id AS complaint_id,
    c.tracking_code,
    c.title,
    c.category,
    c.priority,
    c.status,
    c.report_count,
    ST_Distance(
      c.location_geom::geography,
      ST_SetSRID(ST_MakePoint(search_lng, search_lat), 4326)::geography
    ) AS distance_meters
  FROM complaints c
  WHERE 
    c.status != 'resolved'
    AND ST_DWithin(
      c.location_geom::geography,
      ST_SetSRID(ST_MakePoint(search_lng, search_lat), 4326)::geography,
      radius_meters
    )
  ORDER BY distance_meters ASC;
END;
$$ LANGUAGE plpgsql;

-- Trigger to auto-update geometry column on lat/lng change
CREATE OR REPLACE FUNCTION update_complaint_geom()
RETURNS TRIGGER AS $$
BEGIN
  NEW.location_geom = ST_SetSRID(ST_MakePoint(NEW.longitude, NEW.latitude), 4326);
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE TRIGGER trg_update_complaint_geom
BEFORE INSERT OR UPDATE ON complaints
FOR EACH ROW EXECUTE FUNCTION update_complaint_geom();

-- ==============================================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ==============================================================================
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE complaints ENABLE ROW LEVEL SECURITY;
ALTER TABLE complaint_reports ENABLE ROW LEVEL SECURITY;
ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;

-- Public can read complaints (civic transparency)
CREATE POLICY "Public read complaints" ON complaints FOR SELECT USING (true);
-- Authenticated users can insert reports
CREATE POLICY "Users can create reports" ON complaint_reports FOR INSERT WITH CHECK (true);
-- Officers can update status
CREATE POLICY "Officers can update complaints" ON complaints FOR UPDATE USING (true);
-- Users can read their notifications
CREATE POLICY "Users can view notifications" ON notifications FOR SELECT USING (true);
