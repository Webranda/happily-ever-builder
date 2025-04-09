
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Container from '@/components/ui/Container';
import Logo from '@/components/ui/Logo';
import { Button } from '@/components/ui/button';
import { ChevronLeft, UserPlus, Edit, Trash2, Download, Mail } from 'lucide-react';
import { toast } from 'sonner';

interface Guest {
  id: string;
  name: string;
  email: string;
  phone?: string;
  plusOne: boolean;
  rsvpStatus: 'pending' | 'attending' | 'not-attending';
}

const GuestManagement = () => {
  const [guests, setGuests] = useState<Guest[]>([
    { 
      id: '1', 
      name: 'John & Sarah Smith', 
      email: 'john.smith@example.com', 
      phone: '555-123-4567', 
      plusOne: true, 
      rsvpStatus: 'attending'
    },
    { 
      id: '2', 
      name: 'Michael Johnson', 
      email: 'michael@example.com', 
      plusOne: false, 
      rsvpStatus: 'pending'
    },
    { 
      id: '3', 
      name: 'Emily Davis', 
      email: 'emily@example.com', 
      phone: '555-987-6543', 
      plusOne: true, 
      rsvpStatus: 'not-attending'
    }
  ]);
  
  const [isAddingGuest, setIsAddingGuest] = useState(false);
  const [newGuest, setNewGuest] = useState<Omit<Guest, 'id'>>({
    name: '',
    email: '',
    phone: '',
    plusOne: false,
    rsvpStatus: 'pending'
  });

  const handleAddGuest = () => {
    if (!newGuest.name || !newGuest.email) {
      toast.error('Name and email are required');
      return;
    }
    
    const id = Date.now().toString();
    setGuests(prev => [...prev, { ...newGuest, id }]);
    setNewGuest({
      name: '',
      email: '',
      phone: '',
      plusOne: false,
      rsvpStatus: 'pending'
    });
    setIsAddingGuest(false);
    toast.success('Guest added successfully!');
  };

  const handleRemoveGuest = (id: string) => {
    setGuests(prev => prev.filter(guest => guest.id !== id));
    toast.success('Guest removed');
  };

  const handleSendInvites = () => {
    toast.success('Invitations sent successfully!');
  };

  const getRsvpStatusLabel = (status: Guest['rsvpStatus']) => {
    switch (status) {
      case 'attending':
        return <span className="text-green-500 font-medium">Attending</span>;
      case 'not-attending':
        return <span className="text-red-500 font-medium">Not Attending</span>;
      default:
        return <span className="text-yellow-500 font-medium">Pending</span>;
    }
  };

  return (
    <div className="min-h-screen w-full bg-white">
      {/* Header */}
      <header className="w-full py-4 px-6 shadow-soft backdrop-blur-sm bg-white/80 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <Link to="/" className="inline-block">
            <Logo size="md" />
          </Link>
          
          <Button 
            variant="ghost" 
            className="text-gray-600 hover:text-wedding-navy"
            asChild
          >
            <Link to="/dashboard">
              <span>Back to Dashboard</span>
            </Link>
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <main className="py-10 md:py-16">
        <Container maxWidth="xl">
          <div className="mb-10">
            <Button 
              variant="ghost" 
              className="mb-4 text-gray-600 hover:text-wedding-navy" 
              asChild
            >
              <Link to="/dashboard">
                <ChevronLeft className="mr-1 h-4 w-4" />
                <span>Back to Dashboard</span>
              </Link>
            </Button>
            
            <div className="text-center">
              <h1 className="text-3xl md:text-4xl mb-4 animate-fade-in">Guest Management</h1>
              <p className="text-gray-600 max-w-2xl mx-auto animate-fade-in">
                Add, edit, and manage your wedding guest list
              </p>
            </div>
          </div>
          
          <div className="mb-8 p-6 bg-wedding-cream/30 rounded-xl">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
              <div>
                <h2 className="text-2xl font-serif">Your Guest List</h2>
                <p className="text-gray-600">Total guests: {guests.length}</p>
              </div>
              
              <div className="flex gap-3">
                <Button 
                  variant="outline" 
                  className="border-wedding-navy text-wedding-navy hover:bg-wedding-navy/5"
                  onClick={() => setIsAddingGuest(true)}
                >
                  <UserPlus className="mr-2 h-4 w-4" /> Add Guest
                </Button>
                <Button 
                  className="bg-wedding-gold hover:bg-wedding-gold/90 text-white"
                  onClick={handleSendInvites}
                >
                  <Mail className="mr-2 h-4 w-4" /> Send Invites
                </Button>
              </div>
            </div>
            
            {isAddingGuest && (
              <div className="mb-8 p-4 border border-gray-200 rounded-lg bg-white">
                <h3 className="text-lg font-medium mb-4">Add New Guest</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Name *</label>
                    <input
                      type="text"
                      value={newGuest.name}
                      onChange={(e) => setNewGuest(prev => ({ ...prev, name: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-wedding-gold/30"
                      placeholder="John Smith"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
                    <input
                      type="email"
                      value={newGuest.email}
                      onChange={(e) => setNewGuest(prev => ({ ...prev, email: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-wedding-gold/30"
                      placeholder="john@example.com"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Phone (Optional)</label>
                    <input
                      type="tel"
                      value={newGuest.phone || ''}
                      onChange={(e) => setNewGuest(prev => ({ ...prev, phone: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-wedding-gold/30"
                      placeholder="555-123-4567"
                    />
                  </div>
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="plusOne"
                      checked={newGuest.plusOne}
                      onChange={(e) => setNewGuest(prev => ({ ...prev, plusOne: e.target.checked }))}
                      className="h-4 w-4 text-wedding-gold focus:ring-wedding-gold/30 border-gray-300 rounded"
                    />
                    <label htmlFor="plusOne" className="ml-2 block text-sm text-gray-700">
                      Allow Plus One
                    </label>
                  </div>
                </div>
                <div className="flex justify-end gap-2">
                  <Button 
                    variant="outline" 
                    onClick={() => setIsAddingGuest(false)}
                  >
                    Cancel
                  </Button>
                  <Button 
                    className="bg-wedding-navy hover:bg-wedding-navy/90" 
                    onClick={handleAddGuest}
                  >
                    Add Guest
                  </Button>
                </div>
              </div>
            )}
            
            {guests.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="bg-gray-50">
                      <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Name</th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Contact</th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Plus One</th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">RSVP Status</th>
                      <th className="px-4 py-3 text-right text-sm font-medium text-gray-500">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {guests.map(guest => (
                      <tr key={guest.id} className="hover:bg-gray-50">
                        <td className="px-4 py-4 text-sm text-gray-900 font-medium">{guest.name}</td>
                        <td className="px-4 py-4 text-sm text-gray-500">
                          <div>{guest.email}</div>
                          {guest.phone && <div className="text-xs text-gray-400">{guest.phone}</div>}
                        </td>
                        <td className="px-4 py-4 text-sm">
                          {guest.plusOne ? <span className="text-green-500">Yes</span> : <span className="text-gray-400">No</span>}
                        </td>
                        <td className="px-4 py-4 text-sm">
                          {getRsvpStatusLabel(guest.rsvpStatus)}
                        </td>
                        <td className="px-4 py-4 text-sm text-right">
                          <div className="flex justify-end gap-2">
                            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                              <Edit className="h-4 w-4 text-gray-500" />
                            </Button>
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              className="h-8 w-8 p-0"
                              onClick={() => handleRemoveGuest(guest.id)}
                            >
                              <Trash2 className="h-4 w-4 text-red-500" />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-gray-500">No guests added yet. Click "Add Guest" to get started.</p>
              </div>
            )}
            
            {guests.length > 0 && (
              <div className="mt-6 flex justify-end">
                <Button variant="outline" className="text-wedding-navy">
                  <Download className="mr-2 h-4 w-4" /> Export Guest List
                </Button>
              </div>
            )}
          </div>
        </Container>
      </main>

      {/* Footer */}
      <footer className="py-6 mt-12 border-t border-gray-100">
        <Container>
          <div className="text-center text-sm text-gray-500">
            <p>&copy; {new Date().getFullYear()} EverAfter. All rights reserved.</p>
          </div>
        </Container>
      </footer>
    </div>
  );
};

export default GuestManagement;
