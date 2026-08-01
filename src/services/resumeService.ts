export interface ResumePayload {
  fullName: string;
  email: string;
  phone: string;
  highestQualification?: string;
  experience?: string;
  preferredJobRole?: string;
  resume: File;
}

const getApiUrl = (): string => {
  const envUrl = (import.meta as any).env?.NEXT_PUBLIC_API_URL || 
                 (typeof process !== 'undefined' && process.env?.NEXT_PUBLIC_API_URL);
  return envUrl || 'http://localhost:5000';
};

export const uploadResumeApi = async (payload: ResumePayload) => {
  const baseUrl = getApiUrl();
  const formData = new FormData();

  formData.append('fullName', payload.fullName);
  formData.append('email', payload.email);
  formData.append('phone', payload.phone);
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
    throw new Error(responseData.message || responseData.error || 'Failed to upload resume. Please try again.');
  }

  return responseData;
};
