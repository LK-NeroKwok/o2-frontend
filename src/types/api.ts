// Response
export interface Search {
  message?: string;
  status: number;
  payload: Payload;
}

interface Payload {
  query: string;
  page: number;
  pageSize: number;
  responseTimeMs: number;
  securityInfoValid: boolean;
  totalHits: number;
  docList: DocumentInfo[];
}

interface DocumentInfo {
  id: string;
  content_summary: string;
  date: string;
  document_size: string;
  document_type: string;
  domain_name: string;
  modified_time_string: string;
  reference: string;
  title: string;
}
