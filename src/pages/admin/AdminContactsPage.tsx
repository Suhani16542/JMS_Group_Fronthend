import React, { useState, useEffect, useCallback } from 'react';
import {
  Mail,
  Search,
  Eye,
  Phone,
  Calendar,
  AlertTriangle,
  RefreshCw,
  X,
  ChevronLeft,
  ChevronRight,
  MessageSquare,
  Clock,
  User,
  Send,
} from 'lucide-react';
import { getContactsApi, ContactItem } from '@/services/contactService';

export const AdminContactsPage: React.FC = () => {
  const [contacts, setContacts] = useState<ContactItem[]>([]);
  const [total, setTotal] = useState<number>(0);
  const [page, setPage] = useState<number>(1);
  const [limit, setLimit] = useState<number>(10);
  const [totalPages, setTotalPages] = useState<number>(1);

  // Search & Filter state
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [debouncedSearch, setDebouncedSearch] = useState<string>('');
  const [statusFilter, setStatusFilter] = useState<string>('All');

  // Loading & Error states
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Selected contact for detail modal
  const [selectedContact, setSelectedContact] = useState<ContactItem | null>(null);

  // Debounce search
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchTerm);
      setPage(1);
    }, 400);
    return () => clearTimeout(timer);
  }, [searchTerm]);

  const loadContacts = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const result = await getContactsApi({
        page,
        limit,
        search: debouncedSearch,
        status: statusFilter,
      });

      setContacts(result.contacts);
      setTotal(result.total);
      setTotalPages(result.totalPages || 1);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message || 'Failed to load contacts');
      } else {
        setError('Failed to load contacts from backend server');
      }
    } finally {
      setIsLoading(false);
    }
  }, [page, limit, debouncedSearch, statusFilter]);

  useEffect(() => {
    loadContacts();
  }, [loadContacts]);

  const formatDate = (isoString?: string) => {
    if (!isoString) return 'N/A';
    try {
      const d = new Date(isoString);
      return d.toLocaleDateString('en-GB', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      });
    } catch {
      return isoString;
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl sm:text-2xl font-black text-[#6D214F] tracking-tight">
              Contact Submissions
            </h1>
            <span className="px-2.5 py-0.5 rounded-full bg-blue-100 text-blue-800 text-xs font-black">
              {total} Inquiries
            </span>
          </div>
          <p className="text-xs text-[#777777] mt-1">
            Incoming inquiries and message submissions from the public JMS Group contact page.
          </p>
        </div>

        <button
          onClick={() => loadContacts()}
          disabled={isLoading}
          className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white border border-[#8B1E5C]/20 hover:border-[#8B1E5C]/40 text-xs font-bold text-[#8B1E5C] transition-colors shadow-xs cursor-pointer self-start sm:self-auto disabled:opacity-50"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${isLoading ? 'animate-spin' : ''}`} />
          <span>Refresh</span>
        </button>
      </div>

      {/* Error Alert */}
      {error && (
        <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs font-semibold flex items-center justify-between gap-3 shadow-xs">
          <div className="flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-red-600 shrink-0" />
            <span>{error}</span>
          </div>
          <button
            onClick={() => loadContacts()}
            className="px-3 py-1.5 rounded-lg bg-white border border-red-300 text-red-700 hover:bg-red-50 text-xs font-bold cursor-pointer"
          >
            Retry
          </button>
        </div>
      )}

      {/* Search Toolbar */}
      <div className="bg-white p-4 rounded-2xl border border-[#8B1E5C]/15 shadow-sm space-y-3">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          
          {/* Search Box */}
          <div className="relative lg:col-span-2">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#777777]" />
            <input
              type="text"
              placeholder="Search contacts by name, email, subject, phone..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9.5 pr-4 py-2 rounded-xl border border-[#8B1E5C]/20 focus:border-[#8B1E5C] focus:ring-2 focus:ring-[#8B1E5C]/10 text-xs outline-hidden transition-all bg-[#FAF8FB] focus:bg-white"
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Status Filter */}
          <div>
            <select
              value={statusFilter}
              onChange={(e) => {
                setStatusFilter(e.target.value);
                setPage(1);
              }}
              className="w-full px-3 py-2 rounded-xl border border-[#8B1E5C]/20 focus:border-[#8B1E5C] text-xs outline-hidden bg-[#FAF8FB] focus:bg-white cursor-pointer"
            >
              <option value="All">All Inquiries</option>
              <option value="Received">Received / New</option>
              <option value="Replied">Replied</option>
              <option value="Archived">Archived</option>
            </select>
          </div>

        </div>

        {debouncedSearch && (
          <div className="flex items-center gap-2 pt-2 border-t border-[#8B1E5C]/10 text-xs">
            <span className="text-[11px] text-[#777777]">Searching for: "{debouncedSearch}"</span>
            <button
              onClick={() => setSearchTerm('')}
              className="text-[11px] text-[#8B1E5C] hover:underline font-bold"
            >
              Clear
            </button>
          </div>
        )}
      </div>

      {/* ==================================================== */}
      {/* CONTACTS TABLE & MOBILE CARDS */}
      {/* ==================================================== */}
      {isLoading ? (
        <div className="bg-white p-8 rounded-2xl border border-[#8B1E5C]/15 shadow-sm text-center space-y-4">
          <div className="w-10 h-10 border-3 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-xs font-bold text-[#6D214F]">Loading contact submissions from MongoDB...</p>
        </div>
      ) : contacts.length === 0 ? (
        <div className="bg-white p-12 rounded-2xl border border-[#8B1E5C]/15 shadow-sm text-center space-y-3">
          <div className="w-14 h-14 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center mx-auto border border-blue-200">
            <Mail className="w-7 h-7" />
          </div>
          <h3 className="text-base font-bold text-[#6D214F]">No contact inquiries found</h3>
          <p className="text-xs text-[#777777] max-w-sm mx-auto">
            {debouncedSearch
              ? 'No contacts match your search query.'
              : 'Messages sent through the Contact Us page will be listed here.'}
          </p>
          {debouncedSearch && (
            <button
              onClick={() => setSearchTerm('')}
              className="px-4 py-2 rounded-xl bg-blue-600 text-white text-xs font-bold hover:bg-blue-700 transition-colors cursor-pointer"
            >
              Clear Search
            </button>
          )}
        </div>
      ) : (
        <>
          {/* Desktop Table View */}
          <div className="hidden md:block bg-white rounded-2xl border border-[#8B1E5C]/15 shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-[#FAF8FB] border-b border-[#8B1E5C]/15 text-[#6D214F] font-extrabold uppercase tracking-wider text-[10px]">
                    <th className="py-3.5 px-4">Contact Person</th>
                    <th className="py-3.5 px-4">Email & Phone</th>
                    <th className="py-3.5 px-4">Subject</th>
                    <th className="py-3.5 px-4">Message Snippet</th>
                    <th className="py-3.5 px-4">Date</th>
                    <th className="py-3.5 px-4 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#8B1E5C]/10">
                  {contacts.map((contact) => (
                    <tr
                      key={contact._id}
                      className="hover:bg-[#FAF8FB]/70 transition-colors cursor-pointer"
                      onClick={() => setSelectedContact(contact)}
                    >
                      <td className="py-3.5 px-4">
                        <div className="font-bold text-[#6D214F]">{contact.fullName}</div>
                      </td>

                      <td className="py-3.5 px-4">
                        <div className="text-[#333] font-medium">{contact.email}</div>
                        <div className="text-[11px] text-[#777]">{contact.phone || '—'}</div>
                      </td>

                      <td className="py-3.5 px-4">
                        <span className="font-semibold text-[#8B1E5C]">
                          {contact.subject || 'General Inquiry'}
                        </span>
                      </td>

                      <td className="py-3.5 px-4 max-w-xs truncate text-[#555]">
                        {contact.message}
                      </td>

                      <td className="py-3.5 px-4 text-[#777] whitespace-nowrap">
                        {formatDate(contact.createdAt)}
                      </td>

                      <td className="py-3.5 px-4 text-right whitespace-nowrap">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedContact(contact);
                          }}
                          className="px-3 py-1.5 rounded-lg bg-blue-50 hover:bg-blue-600 text-blue-700 hover:text-white border border-blue-200 transition-all text-xs font-bold inline-flex items-center gap-1 cursor-pointer"
                        >
                          <Eye className="w-3.5 h-3.5" />
                          <span>Read</span>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Mobile Cards View */}
          <div className="md:hidden space-y-3">
            {contacts.map((contact) => (
              <div
                key={contact._id}
                className="bg-white p-4 rounded-2xl border border-[#8B1E5C]/15 shadow-sm space-y-2.5"
                onClick={() => setSelectedContact(contact)}
              >
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <h4 className="font-bold text-sm text-[#6D214F]">{contact.fullName}</h4>
                    <span className="text-[11px] font-semibold text-[#8B1E5C]">{contact.subject}</span>
                  </div>
                  <span className="text-[10px] text-[#777] whitespace-nowrap">{formatDate(contact.createdAt)}</span>
                </div>

                <p className="text-xs text-[#555] line-clamp-2 bg-[#FAF8FB] p-2.5 rounded-xl border border-[#8B1E5C]/10">
                  {contact.message}
                </p>

                <div className="flex items-center justify-between text-xs pt-2 border-t border-[#8B1E5C]/10">
                  <div className="text-[11px] text-[#777] truncate mr-2">
                    {contact.email}
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedContact(contact);
                    }}
                    className="px-3 py-1 rounded-lg bg-blue-600 text-white font-bold text-xs shrink-0 cursor-pointer"
                  >
                    View Message
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination */}
          <div className="bg-white px-4 py-3.5 rounded-2xl border border-[#8B1E5C]/15 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
            <div className="text-[#777777]">
              Showing <span className="font-bold text-[#6D214F]">{contacts.length}</span> of{' '}
              <span className="font-bold text-[#6D214F]">{total}</span> contact inquiries
            </div>

            <div className="flex items-center gap-2 self-center sm:self-auto">
              <button
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page <= 1 || isLoading}
                className="p-2 rounded-xl bg-white border border-[#8B1E5C]/20 hover:bg-[#FAF8FB] text-[#6D214F] disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>

              <span className="px-3 py-1.5 rounded-xl bg-[#8B1E5C] text-white font-bold text-xs">
                {page} / {totalPages}
              </span>

              <button
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                disabled={page >= totalPages || isLoading}
                className="p-2 rounded-xl bg-white border border-[#8B1E5C]/20 hover:bg-[#FAF8FB] text-[#6D214F] disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </>
      )}

      {/* ==================================================== */}
      {/* CONTACT MESSAGE DETAIL MODAL */}
      {/* ==================================================== */}
      {selectedContact && (
        <div
          className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto"
          onClick={() => setSelectedContact(null)}
        >
          <div
            className="bg-white rounded-3xl max-w-xl w-full p-6 sm:p-8 shadow-2xl border border-[#8B1E5C]/20 space-y-5"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-start justify-between gap-4 pb-3 border-b border-[#8B1E5C]/15">
              <div>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-blue-100 text-blue-800 uppercase tracking-wider">
                  Contact Inquiry
                </span>
                <h2 className="text-xl font-black text-[#6D214F] mt-1.5">
                  {selectedContact.subject || 'General Inquiry'}
                </h2>
                <p className="text-xs text-[#777]">Received: {formatDate(selectedContact.createdAt)}</p>
              </div>

              <button
                onClick={() => setSelectedContact(null)}
                className="p-2 rounded-full hover:bg-gray-100 text-gray-400 hover:text-gray-600 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Sender Info Bar */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 bg-[#FAF8FB] p-4 rounded-2xl border border-[#8B1E5C]/10 text-xs">
              <div>
                <span className="text-[10px] text-[#777] uppercase font-bold block">Sender Name:</span>
                <span className="font-bold text-[#6D214F] text-sm">{selectedContact.fullName}</span>
              </div>
              <div>
                <span className="text-[10px] text-[#777] uppercase font-bold block">Email:</span>
                <a
                  href={`mailto:${selectedContact.email}`}
                  className="font-semibold text-blue-600 hover:underline break-all"
                >
                  {selectedContact.email}
                </a>
              </div>
              {selectedContact.phone && (
                <div>
                  <span className="text-[10px] text-[#777] uppercase font-bold block">Phone:</span>
                  <a href={`tel:${selectedContact.phone}`} className="font-semibold text-[#333] hover:underline">
                    {selectedContact.phone}
                  </a>
                </div>
              )}
            </div>

            {/* Complete Message Content */}
            <div className="space-y-1.5">
              <span className="text-[10px] text-[#777] uppercase font-bold block">Complete Message:</span>
              <div className="p-4 rounded-2xl bg-white border border-[#8B1E5C]/20 text-xs sm:text-sm text-[#222] leading-relaxed whitespace-pre-wrap">
                {selectedContact.message}
              </div>
            </div>

            {/* Modal Actions */}
            <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-[#8B1E5C]/10">
              <a
                href={`mailto:${selectedContact.email}?subject=Re: ${encodeURIComponent(selectedContact.subject || 'Inquiry')}`}
                className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs inline-flex items-center gap-2 transition-colors cursor-pointer shadow-xs"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Reply via Email</span>
              </a>

              <button
                onClick={() => setSelectedContact(null)}
                className="px-5 py-2 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold text-xs transition-colors cursor-pointer"
              >
                Close
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};

export default AdminContactsPage;
