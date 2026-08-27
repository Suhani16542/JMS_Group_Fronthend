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
  currentCompany?: string;
  fatherOrHusbandOccupation?: string;
  motherOccupation?: string;
  siblings?: string;
  siblingsOccupation?: string;
  mobileNumber: string;
  alternateNumber?: string;
  fatherNumber?: string;
  referenceNameAndNo?: string;
  candidateSignatureName?: string;
  signature: string; // Base64 data URL from SignaturePad
  termsAccepted: boolean | string;
  resumeId?: string;
  documents?: File[];
  photo?: File | null;
  [key: string]: any;
}

export interface CandidateApplicationResponseData {
  _id: string;
  applicationId?: string;
  fullName: string;
  fatherOrHusbandName: string;
  dob: string;
  qualification: string;
  specialization?: string;
  permanentAddress: string;
  email: string;
  mobileNumber: string;
  jobAppliedForA: string;
  jobAppliedForB?: string;
  currentLocation: string;
  locationPreferenceA: string;
  locationPreferenceB?: string;
  resumeId?: string;
  resumeUrl?: string;
  signature?: string;
  signatureUrl?: string;
  candidateSignatureName?: string;
  termsAccepted: boolean;
  status?: string;
  createdAt?: string;
  updatedAt?: string;
  [key: string]: any;
}

export interface CandidateApplicationResponse {
  success: boolean;
  message: string;
  data: CandidateApplicationResponseData;
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
 * Handles FormData directly or constructs JSON / multipart/form-data.
 */
export const submitCandidateApplicationApi = async (
  formDataOrPayload: FormData | CandidateApplicationPayload | Record<string, any>,
  photo?: File | null,
  documents?: File[]
): Promise<CandidateApplicationResponse> => {
  const baseUrl = getApiUrl();
  let bodyData: BodyInit;
  let headers: HeadersInit = {};

  if (formDataOrPayload instanceof FormData) {
    bodyData = formDataOrPayload;
  } else {
    const hasFiles = (documents && documents.length > 0) ||
      (Array.isArray(formDataOrPayload.documents) && formDataOrPayload.documents.length > 0) ||
      photo instanceof File ||
      (formDataOrPayload as any).photo instanceof File;

    if (hasFiles) {
      const formData = new FormData();
      Object.entries(formDataOrPayload).forEach(([key, value]) => {
        if (value !== undefined && value !== null && key !== 'photo' && key !== 'documents') {
          formData.append(key, typeof value === 'boolean' ? String(value) : (value as any));
        }
      });

      const docList = documents || (formDataOrPayload as any).documents;
      if (Array.isArray(docList)) {
        docList.forEach((doc) => {
          if (doc instanceof File) {
            formData.append('documents', doc);
          }
        });
      }

      bodyData = formData;
    } else {
      // Clean JSON payload
      headers = { 'Content-Type': 'application/json' };
      const jsonPayload = { ...formDataOrPayload };
      delete jsonPayload.photo;
      delete jsonPayload.documents;
      bodyData = JSON.stringify(jsonPayload);
    }
  }

  try {
    const response = await fetch(`${baseUrl}/api/applications`, {
      method: 'POST',
      headers,
      body: bodyData,
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
