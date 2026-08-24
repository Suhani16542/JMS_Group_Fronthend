export interface CandidateApplicationPayload {
  fullName: string;
  fatherOrHusbandName: string;
  dob: string;
  qualification: string;
  specialization?: string;
  permanentAddress: string;
  email: string;
  jobAppliedForA: string;
  jobAppliedForB?: string;
  currentLocation: string;
  locationPreferenceA: string;
  locationPreferenceB?: string;
  currentCtc?: string;
  expectedSalary?: string;
  noticePeriod?: string;
  currentBankOrNbfc?: string;
  currentVertical?: string;
  fatherOrHusbandOccupation?: string;
  motherOccupation?: string;
  siblings?: string;
  siblingsOccupation?: string;
  mobileNumber: string;
  alternateNumber?: string;
  fatherNumber?: string;
  referenceNameAndNo?: string;
  candidateSignatureName?: string;
  termsAccepted?: boolean | string;
  photo?: File | null;
  documents?: File[];
  [key: string]: any;
}

const getApiUrl = (): string => {
  const envUrl = import.meta.env.VITE_API_BASE_URL || import.meta.env.NEXT_PUBLIC_API_URL;
  if (envUrl) {
    return envUrl.replace(/\/+$/, '');
  }
  return import.meta.env.DEV ? 'http://localhost:5000' : 'https://jms-group-backend.onrender.com';
};

/**
 * Submits the Candidate Application form to the backend.
 * Handles FormData directly or constructs multipart/form-data from payload, photo, and documents.
 */
export const submitCandidateApplicationApi = async (
  formDataOrPayload: FormData | CandidateApplicationPayload | Record<string, any>,
  photo?: File | null,
  documents?: File[]
) => {
  const baseUrl = getApiUrl();
  let bodyData: FormData;

  if (formDataOrPayload instanceof FormData) {
    bodyData = formDataOrPayload;
  } else {
    bodyData = new FormData();
    
    Object.entries(formDataOrPayload).forEach(([key, value]) => {
      if (value !== undefined && value !== null && key !== 'photo' && key !== 'documents') {
        bodyData.append(key, typeof value === 'boolean' ? String(value) : (value as any));
      }
    });

    const candidatePhoto = photo || (formDataOrPayload as any).photo;
    if (candidatePhoto instanceof File) {
      bodyData.append('photo', candidatePhoto);
    }

    const docList = documents || (formDataOrPayload as any).documents;
    if (Array.isArray(docList)) {
      docList.forEach((doc) => {
        if (doc instanceof File) {
          bodyData.append('documents', doc);
        }
      });
    }
  }

  try {
    const response = await fetch(`${baseUrl}/api/applications`, {
      method: 'POST',
      body: bodyData,
      // Note: Do NOT manually set 'Content-Type' header so browser adds multipart boundary automatically
    });

    const responseData = await response.json().catch(() => ({}));

    if (!response.ok) {
      let errorMsg = responseData.message || responseData.error;
      if (Array.isArray(responseData.errors) && responseData.errors.length > 0) {
        errorMsg = responseData.errors
          .map((err: any) => (typeof err === 'string' ? err : err.msg || err.message || JSON.stringify(err)))
          .join(' ');
      }
      throw new Error(errorMsg || `Submission failed with status ${response.status}`);
    }

    return responseData;
  } catch (error: any) {
    if (error instanceof TypeError && error.message.includes('fetch')) {
      throw new Error('Network Error: Unable to reach backend server. Please check your connection.');
    }
    throw error;
  }
};

export default submitCandidateApplicationApi;
