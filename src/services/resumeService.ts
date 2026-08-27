export interface ResumePayload {
  fullName: string;
  email: string;
  phone: string;
  referenceNumber: string;
  referenceName: string;
  highestQualification?: string;
  experience?: string;
  preferredJobRole?: string;
  resume: File;
}

export interface ResumeUploadResponseData {
  _id: string;
  resumeId?: string;
  fullName: string;
  email: string;
  phone: string;
  highestQualification?: string;
  experience?: string;
  preferredJobRole?: string;
  referenceNumber?: string;
  referenceName?: string;
  resumeUrl?: string;
  viewUrl?: string;
  downloadUrl?: string;
  whatsappUrl?: string;
  whatsappLink?: string;
  deepLink?: string;
  status?: string;
  createdAt?: string;
  updatedAt?: string;
  [key: string]: any;
}

export interface ResumeUploadResponse {
  success: boolean;
  message: string;
  data: ResumeUploadResponseData;
  whatsappUrl?: string;
  deepLink?: string;
  [key: string]: any;
}

const getApiUrl = (): string => {
  const envUrl = import.meta.env.VITE_API_BASE_URL || import.meta.env.NEXT_PUBLIC_API_URL;
  if (envUrl) {
    return envUrl.replace(/\/+$/, '');
  }
  return import.meta.env.DEV ? 'http://localhost:5000' : 'https://jms-group-backend.onrender.com';
};

export const uploadResumeApi = async (payload: ResumePayload): Promise<ResumeUploadResponse> => {
  const baseUrl = getApiUrl();
  const formData = new FormData();

  formData.append('fullName', payload.fullName);
  formData.append('email', payload.email);
  formData.append('phone', payload.phone);
  formData.append('referenceNumber', payload.referenceNumber);
  formData.append('referenceName', payload.referenceName);
  if (payload.highestQualification) {
    formData.append('highestQualification', payload.highestQualification);
  }
  if (payload.experience) {
    formData.append('experience', payload.experience);
  }
  if (payload.preferredJobRole) {
    formData.append('preferredJobRole', payload.preferredJobRole);
  }
  formData.append('resume', payload.resume);

  const response = await fetch(`${baseUrl}/api/resume`, {
    method: 'POST',
    body: formData,
  });

  const responseData = await response.json().catch(() => ({}));

  if (!response.ok) {
    let errorMsg = responseData.message || responseData.error;
    if (Array.isArray(responseData.errors) && responseData.errors.length > 0) {
      errorMsg = responseData.errors
        .map((err: any) => (typeof err === 'string' ? err : err.msg || err.message || JSON.stringify(err)))
        .join(' ');
    }
    throw new Error(errorMsg || 'Failed to upload resume. Please try again.');
  }

  return responseData;
};
