'use client'
import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';

export default function QuickContactAdmin() {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedContact, setSelectedContact] = useState(null);
  const pathname = usePathname();

  // Fetch contacts
  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const response = await fetch('/api/contact/quickCon');
        const data = await response.json();
        if (data.contacts) {
          setContacts(data.contacts);
        } else {
          setError('No contacts found');
        }
      } catch (err) {
        setError('Failed to fetch contacts');
      } finally {
        setLoading(false);
      }
    };
    fetchContacts();
  }, []);

  // Delete contact
  const handleDelete = async (id) => {
    if (confirm('Are you sure you want to delete this contact?')) {
      try {
        const response = await fetch('/api/contact/quickCon', {
          method: 'DELETE',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ id }),
        });
        if (response.ok) {
          setContacts(contacts.filter(contact => contact._id !== id));
        } else {
          setError('Failed to delete contact');
        }
      } catch (err) {
        setError('Error deleting contact');
      }
    }
  };

  // Open/Close popup
  const openPopup = (contact) => setSelectedContact(contact);
  const closePopup = () => setSelectedContact(null);

  // Handle click outside popup
  const handleOverlayClick = (e) => {
    if (e.target.classList.contains('popup-overlay')) {
      closePopup();
    }
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h1 className="text-2xl font-bold text-emerald-800 mb-6">Quick Contacts</h1>

      {loading && <p className="text-gray-600">Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {!loading && !error && contacts.length === 0 && (
        <p className="text-gray-600">No contacts available.</p>
      )}

      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {contacts.map((contact) => (
          <div
            key={contact._id}
            className="bg-white p-4 rounded-lg shadow-md border border-emerald-100 transition-all duration-300 hover:shadow-lg"
          >
            <h3 className="text-lg font-semibold text-emerald-700">{contact.name}</h3>
            <p className="text-gray-600 truncate">{contact.email}</p>
            <p className="text-gray-600 truncate">{contact.message}</p>
            <div className="mt-4 flex gap-2">
              <button
                onClick={() => openPopup(contact)}
                className="px-3 py-1 bg-emerald-600 text-white rounded-md hover:bg-emerald-700 transition-all duration-300"
              >
                View Details
              </button>
              <button
                onClick={() => handleDelete(contact._id)}
                className="px-3 py-1 bg-red-600 text-white rounded-md hover:bg-red-700 transition-all duration-300"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Popup for contact details */}
      {selectedContact && (
        <div
          className="popup-overlay fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          onClick={handleOverlayClick}
        >
          <div className="bg-white p-6 rounded-lg max-w-md w-full mx-4">
            <h2 className="text-xl font-bold text-emerald-800 mb-4">Contact Details</h2>
            <p><strong>Name:</strong> {selectedContact.name}</p>
            <p><strong>Email:</strong> {selectedContact.email}</p>
            <p><strong>Message:</strong> {selectedContact.message}</p>
            <p><strong>Created At:</strong> {new Date(selectedContact.createdAt).toLocaleString()}</p>
            <button
              onClick={closePopup}
              className="mt-6 px-4 py-2 bg-emerald-600 text-white rounded-md hover:bg-emerald-700 transition-all duration-300"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}