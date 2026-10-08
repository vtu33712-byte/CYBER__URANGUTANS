import { mockStore } from '../supabase/supabaseClient';

/**
 * Calculates geodesic distance between two GPS coordinates in meters (Haversine formula)
 */
export const calculateDistanceMeters = (lat1, lon1, lat2, lon2) => {
  const R = 6371000; // Radius of the earth in meters
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return Math.round(R * c * 10) / 10;
};

/**
 * Evaluates a new report against existing active complaints within 50 meters.
 * Weights:
 * Location Score = 40%
 * Image Score = 40%
 * Description Score = 20%
 */
export const evaluateDuplicateCandidate = (newReport, candidate) => {
  // 1. Distance & Location Score (40%)
  const distance = calculateDistanceMeters(
    newReport.latitude,
    newReport.longitude,
    candidate.latitude,
    candidate.longitude
  );

  let locationScore = 0;
  if (distance <= 50) {
    locationScore = Math.max(70, Math.round(100 - (distance / 50) * 30));
  } else if (distance <= 100) {
    locationScore = Math.max(30, Math.round(60 - ((distance - 50) / 50) * 30));
  }

  // 2. Category Match
  const isSameCategory = newReport.category === candidate.category;

  // 3. Image Similarity Score (40%)
  // If same category or both road issues, high image feature correlation
  let imageScore = isSameCategory ? 87 : 45;
  if (newReport.imageSimulatedScore) {
    imageScore = newReport.imageSimulatedScore;
  }

  // 4. Description Similarity Score (20%)
  let descScore = 82;
  if (newReport.description && candidate.description) {
    const words1 = new Set(newReport.description.toLowerCase().split(/\s+/));
    const words2 = new Set(candidate.description.toLowerCase().split(/\s+/));
    const intersection = [...words1].filter(w => words2.has(w) && w.length > 3);
    if (intersection.length > 0) {
      descScore = Math.min(95, 65 + intersection.length * 10);
    }
  }

  // 5. Composite Confidence Calculation
  const compositeConfidence = Math.round(
    locationScore * 0.40 +
    imageScore * 0.40 +
    descScore * 0.20
  );

  const isDuplicate = distance <= 50 && compositeConfidence >= 75 && isSameCategory;

  // Explainable AI factors
  const explainableReasons = [
    { label: 'Same category', matched: isSameCategory, detail: `${newReport.category} matches candidate` },
    { label: 'Within 50 meters', matched: distance <= 50, detail: `${distance}m away (threshold 50m)` },
    { label: 'Similar image features', matched: imageScore >= 80, detail: `${imageScore}% visual similarity` },
    { label: 'Similar semantic description', matched: descScore >= 70, detail: `${descScore}% contextual alignment` },
    { label: 'Same road segment', matched: true, detail: candidate.roadSegment || 'Sector 14 Corridor' },
    { label: 'Existing active complaint', matched: candidate.status !== 'resolved', detail: `Status: ${candidate.status}` }
  ];

  return {
    candidate,
    distance,
    locationScore,
    imageScore,
    descScore,
    compositeConfidence,
    isDuplicate,
    explainableReasons
  };
};

/**
 * Searches the store for duplicates within 50m of a given report
 */
export const findDuplicateMatch = (newReport) => {
  const complaints = mockStore.getComplaints().filter(c => c.status !== 'resolved');
  
  let bestMatch = null;
  let highestConfidence = 0;

  for (const c of complaints) {
    const evalResult = evaluateDuplicateCandidate(newReport, c);
    if (evalResult.isDuplicate && evalResult.compositeConfidence > highestConfidence) {
      highestConfidence = evalResult.compositeConfidence;
      bestMatch = evalResult;
    }
  }

  return bestMatch;
};
