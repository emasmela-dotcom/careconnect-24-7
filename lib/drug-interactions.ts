// Drug Interaction Checker
// This is a simplified version. For production, integrate with DrugBank API or similar.

export interface DrugInteraction {
  severity: 'mild' | 'moderate' | 'severe' | 'contraindicated'
  description: string
  medications: string[]
  recommendation: string
}

// Common drug interactions database (simplified)
// In production, use DrugBank API or similar service
const INTERACTION_DATABASE: Record<string, string[]> = {
  // Blood thinners
  'warfarin': ['aspirin', 'ibuprofen', 'naproxen', 'heparin'],
  'aspirin': ['warfarin', 'ibuprofen', 'naproxen'],
  
  // Blood pressure
  'lisinopril': ['potassium supplements', 'spironolactone'],
  'metformin': ['alcohol'],
  
  // Pain medications
  'ibuprofen': ['aspirin', 'warfarin', 'naproxen'],
  'naproxen': ['aspirin', 'warfarin', 'ibuprofen'],
  
  // Antibiotics
  'penicillin': ['methotrexate'],
  
  // Antidepressants
  'sertraline': ['maois', 'tramadol'],
}

const SEVERITY_DESCRIPTIONS: Record<string, { description: string; recommendation: string }> = {
  'warfarin-aspirin': {
    description: 'Increased risk of bleeding when taken together',
    recommendation: 'Monitor for signs of bleeding. Consult your doctor before taking both medications.'
  },
  'warfarin-ibuprofen': {
    description: 'Increased risk of bleeding and stomach ulcers',
    recommendation: 'Avoid taking together. Use alternative pain relief or consult your doctor.'
  },
  'lisinopril-potassium': {
    description: 'Risk of dangerously high potassium levels',
    recommendation: 'Monitor potassium levels. Avoid potassium supplements unless prescribed by doctor.'
  },
  'metformin-alcohol': {
    description: 'Increased risk of lactic acidosis',
    recommendation: 'Limit alcohol consumption. Consult your doctor about safe alcohol use.'
  },
}

export function checkDrugInteractions(
  medicationName: string,
  existingMedications: string[]
): DrugInteraction[] {
  const interactions: DrugInteraction[] = []
  const medNameLower = medicationName.toLowerCase()
  
  // Check against existing medications
  for (const existingMed of existingMedications) {
    const existingMedLower = existingMed.toLowerCase()
    
    // Check if medication interacts with existing ones
    const interactionKey = `${medNameLower}-${existingMedLower}`
    const reverseKey = `${existingMedLower}-${medNameLower}`
    
    // Check direct interactions
    if (INTERACTION_DATABASE[medNameLower]?.includes(existingMedLower) ||
        INTERACTION_DATABASE[existingMedLower]?.includes(medNameLower)) {
      
      const interactionInfo = SEVERITY_DESCRIPTIONS[interactionKey] || 
                              SEVERITY_DESCRIPTIONS[reverseKey] || {
        description: `Potential interaction between ${medicationName} and ${existingMed}`,
        recommendation: 'Consult your doctor or pharmacist before taking these medications together.'
      }
      
      // Determine severity (simplified - in production, use API data)
      let severity: DrugInteraction['severity'] = 'moderate'
      if (medNameLower.includes('warfarin') || existingMedLower.includes('warfarin')) {
        severity = 'severe'
      }
      
      interactions.push({
        severity,
        description: interactionInfo.description,
        medications: [medicationName, existingMed],
        recommendation: interactionInfo.recommendation
      })
    }
  }
  
  return interactions
}

// Check for common food/drink interactions
export function checkFoodInteractions(medicationName: string): DrugInteraction[] {
  const interactions: DrugInteraction[] = []
  const medNameLower = medicationName.toLowerCase()
  
  const foodInteractions: Record<string, { food: string; description: string; recommendation: string }> = {
    'warfarin': {
      food: 'Vitamin K-rich foods (leafy greens)',
      description: 'Vitamin K can reduce warfarin effectiveness',
      recommendation: 'Maintain consistent intake of vitamin K foods. Don\'t suddenly change your diet.'
    },
    'grapefruit': {
      description: 'Grapefruit can increase medication levels in blood',
      recommendation: 'Avoid grapefruit and grapefruit juice while taking this medication.'
    }
  }
  
  // Check for grapefruit interactions (affects many medications)
  const grapefruitInteractingMeds = ['atorvastatin', 'simvastatin', 'felodipine', 'nifedipine']
  if (grapefruitInteractingMeds.some(med => medNameLower.includes(med))) {
    interactions.push({
      severity: 'moderate',
      description: foodInteractions.grapefruit.description,
      medications: [medicationName],
      recommendation: foodInteractions.grapefruit.recommendation
    })
  }
  
  // Check for warfarin
  if (medNameLower.includes('warfarin')) {
    interactions.push({
      severity: 'moderate',
      description: foodInteractions.warfarin.description,
      medications: [medicationName],
      recommendation: foodInteractions.warfarin.recommendation
    })
  }
  
  return interactions
}


