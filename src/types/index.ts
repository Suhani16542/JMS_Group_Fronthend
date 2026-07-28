// Core Type Definitions for JMS Group HR & Recruitment Platform

export interface User {
  id: string;
  email: string;
  name: string;
  role: 'candidate' | 'employer' | 'admin';
}

export interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  type: string;
  category: string;
}
