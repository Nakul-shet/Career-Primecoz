import React, { useState, useRef } from 'react';
import { 
  Upload, 
  FileText, 
  Mail, 
  Send, 
  CheckCircle, 
  XCircle, 
  Users,
  AlertCircle,
  RefreshCw
} from 'lucide-react';

import axios from 'axios';

interface EmailData {
  email: string;
  row: number;
  column: string;
}

interface EmailResult {
  email: string;
  status: 'success' | 'failed';
  messageId?: string;
  error?: string;
}

interface Results {
  results: EmailResult[];
}

const BulkEmailSender: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [emails, setEmails] = useState<EmailData[]>([]);
  const [subject, setSubject] = useState('');
  const [body, setBody] = useState('');
  const [loading, setLoading] = useState(false);
  const [dragOver, setDragOver] = useState(false);
  const [results, setResults] = useState<Results | null>(null);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (file: File) => {
    if (file && (file.type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' || 
                 file.type === 'application/vnd.ms-excel' || 
                 file.name.endsWith('.csv'))) {
      setSelectedFile(file);
      setError('');
      setSuccess('');
      setResults(null);
      setEmails([]);
      extractEmails(file);
    } else {
      setError('Please select a valid Excel file (.xlsx, .xls) or CSV file.');
    }
  };

  const extractEmails = async (file: File) => {
    setLoading(true);
    setError('');
    try {
      const formData = new FormData();
      formData.append('excelFile', file);
      const response = await axios.post('http://localhost:3000/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setEmails(response.data.emails);
      setSuccess(`Successfully extracted ${response.data.emails.length} email addresses from the file.`);
    } catch (error: any) {
      setError(error.response?.data?.error || 'Failed to extract emails from file. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragOver(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragOver(false);
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      handleFileSelect(files[0]);
    }
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFileSelect(file);
    }
  };

  const handleSendEmails = async () => {
    if (!emails.length) {
      setError('No emails to send. Please upload a file first.');
      return;
    }
    if (!subject.trim()) {
      setError('Please enter an email subject.');
      return;
    }
    if (!body.trim()) {
      setError('Please enter an email body.');
      return;
    }
    setLoading(true);
    setError('');
    setSuccess('');
    try {
      const response = await axios.post('http://localhost:3000/send-emails', {
        emails: emails,
        subject: subject.trim(),
        body: body.trim()
      });
      setResults(response.data);
      setSuccess(`Email sending completed! ${response.data.results.filter((r: EmailResult) => r.status === 'success').length} emails sent successfully.`);
    } catch (error: any) {
      setError(error.response?.data?.error || 'Failed to send emails. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setSelectedFile(null);
    setEmails([]);
    setSubject('');
    setBody('');
    setResults(null);
    setError('');
    setSuccess('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 my-8">
      <h2 className="text-xl font-semibold mb-4 flex items-center gap-2"><Mail /> Bulk Email Sender</h2>
      {error && (
        <div className="flex items-center bg-red-100 text-red-700 px-4 py-2 rounded mb-4">
          <AlertCircle size={20} className="mr-2" />
          <span>{error}</span>
        </div>
      )}
      {success && (
        <div className="flex items-center bg-green-100 text-green-700 px-4 py-2 rounded mb-4">
          <CheckCircle size={20} className="mr-2" />
          <span>{success}</span>
        </div>
      )}
      <div className="mb-6">
        <div 
          className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-all ${dragOver ? 'border-blue-400 bg-blue-50' : 'border-gray-300 bg-gray-50'}`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
        >
          <div className="flex flex-col items-center justify-center">
            <Upload size={48} className="text-blue-500 mb-2" />
            <div className="font-semibold text-lg mb-1">{selectedFile ? 'Change File' : 'Upload Excel File'}</div>
            <div className="text-gray-500 text-sm mb-1">Drag and drop your Excel file here, or click to browse</div>
            <div className="text-gray-400 text-xs mb-2">Supported formats: .xlsx, .xls, .csv</div>
            <input
              ref={fileInputRef}
              type="file"
              className="hidden"
              accept=".xlsx,.xls,.csv"
              onChange={handleFileInputChange}
            />
            <button className="mt-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 flex items-center gap-2" disabled={loading}>
              {loading ? (
                <>
                  <div className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full mr-2"></div>
                  Processing...
                </>
              ) : (
                <>
                  <FileText size={20} />
                  Choose File
                </>
              )}
            </button>
          </div>
        </div>
        {selectedFile && (
          <div className="flex items-center bg-green-50 border border-green-300 rounded mt-4 p-3">
            <FileText size={24} className="text-green-600 mr-2" />
            <div>
              <div className="font-medium">{selectedFile.name}</div>
              <div className="text-xs text-gray-500">{formatFileSize(selectedFile.size)} • {selectedFile.type}</div>
            </div>
          </div>
        )}
      </div>
      {emails.length > 0 && (
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-2 font-semibold text-gray-700">
            <Users size={20} />
            Email Recipients
            <span className="ml-2 bg-blue-600 text-white rounded-full px-2 text-xs">{emails.length}</span>
            <button className="ml-auto flex items-center gap-1 text-xs text-gray-500 hover:text-blue-600" onClick={handleReset}>
              <RefreshCw size={14} />
              Reset
            </button>
          </div>
          <div className="max-h-40 overflow-y-auto bg-gray-50 rounded p-2">
            {emails.map((emailData, index) => (
              <div key={index} className="flex items-center gap-2 py-1 border-b last:border-b-0">
                <Mail size={16} className="text-blue-500" />
                <span className="font-medium text-gray-800">{emailData.email}</span>
                <span className="text-xs text-gray-400">Row {emailData.row} • Column: {emailData.column}</span>
              </div>
            ))}
          </div>
        </div>
      )}
      {emails.length > 0 && (
        <div className="mb-6">
          <div className="mb-4">
            <label className="block font-semibold mb-1">Email Subject</label>
            <input
              type="text"
              className="w-full border rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-400"
              placeholder="Enter email subject..."
              value={subject}
              onChange={e => setSubject(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label className="block font-semibold mb-1">Email Body</label>
            <textarea
              className="w-full border rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-400"
              placeholder="Enter your email message here... (HTML supported)"
              value={body}
              onChange={e => setBody(e.target.value)}
            />
          </div>
          <button 
            className="px-6 py-2 bg-green-600 text-white rounded hover:bg-green-700 flex items-center gap-2" 
            onClick={handleSendEmails}
            disabled={loading || !subject.trim() || !body.trim()}
          >
            {loading ? (
              <>
                <div className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full mr-2"></div>
                Sending Emails...
              </>
            ) : (
              <>
                <Send size={20} />
                Send Emails to {emails.length} Recipients
              </>
            )}
          </button>
        </div>
      )}
      {results && (
        <div className="bg-gray-50 rounded p-4 mt-4">
          <div className="flex items-center gap-2 mb-2 font-semibold text-gray-700">
            <Mail size={20} />
            Email Sending Results
          </div>
          <div className="flex gap-8 mb-4">
            <div>
              <div className="text-green-600 font-bold text-lg">
                {results.results.filter(r => r.status === 'success').length}
              </div>
              <div className="text-xs text-gray-500">Sent Successfully</div>
            </div>
            <div>
              <div className="text-red-600 font-bold text-lg">
                {results.results.filter(r => r.status === 'failed').length}
              </div>
              <div className="text-xs text-gray-500">Failed</div>
            </div>
          </div>
          <div className="max-h-32 overflow-y-auto">
            {results.results.map((result, index) => (
              <div key={index} className="flex items-center gap-2 py-1 border-b last:border-b-0">
                <div className={`w-2 h-2 rounded-full ${result.status === 'success' ? 'bg-green-500' : 'bg-red-500'}`}></div>
                <span className="font-medium text-gray-800">{result.email}</span>
                {result.status === 'success' && (
                  <CheckCircle size={16} className="text-green-600" />
                )}
                {result.status === 'failed' && (
                  <>
                    <XCircle size={16} className="text-red-600" />
                    {result.error && (
                      <span className="text-xs text-red-500 ml-2">{result.error}</span>
                    )}
                  </>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default BulkEmailSender; 