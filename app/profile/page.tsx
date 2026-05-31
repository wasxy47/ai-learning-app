'use client';

import { useState, useRef } from 'react';
import ProtectedRoute from '@/components/ProtectedRoute';
import { useAuth } from '@/components/AuthProvider';
import { updateProfile } from 'firebase/auth';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage } from '@/lib/firebase';
import { Camera, Save, AlertCircle, CheckCircle2, User } from 'lucide-react';
import Image from 'next/image';

function ProfileContent() {
  const { user } = useAuth();
  const [displayName, setDisplayName] = useState(user?.displayName || '');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');
  const [photoURL, setPhotoURL] = useState(user?.photoURL || '');
  const [photoFile, setPhotoFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setPhotoFile(file);
      setPhotoURL(URL.createObjectURL(file));
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      let newPhotoURL = user.photoURL;

      if (photoFile) {
        const storageRef = ref(storage, `profiles/${user.uid}/${photoFile.name}`);
        await uploadBytes(storageRef, photoFile);
        newPhotoURL = await getDownloadURL(storageRef);
      }

      await updateProfile(user, {
        displayName: displayName,
        photoURL: newPhotoURL,
      });

      setSuccess('Profile updated successfully!');
      setTimeout(() => setSuccess(''), 3000);
    } catch (err: unknown) {
      console.error(err);
      setError('Failed to update profile. Make sure Firebase Storage is enabled in your console.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen px-4 pb-16 pt-24 sm:px-6 lg:px-8 page-bg">
      <div className="mx-auto max-w-3xl">
        <div className="mb-8">
          <p className="text-xs font-black uppercase tracking-[0.2em] text-teal">
            Settings
          </p>
          <h1 className="mt-2 text-3xl font-black text-ink md:text-4xl">
            Your Profile
          </h1>
        </div>

        <div className="surface rounded-xl p-6 sm:p-8">
          {error && (
            <div className="mb-6 flex items-center gap-3 rounded-lg border border-danger/30 bg-danger/10 p-3">
              <AlertCircle className="h-5 w-5 text-danger shrink-0" />
              <p className="text-sm text-danger">{error}</p>
            </div>
          )}

          {success && (
            <div className="mb-6 flex items-center gap-3 rounded-lg border border-sage/30 bg-sage/10 p-3">
              <CheckCircle2 className="h-5 w-5 text-sage shrink-0" />
              <p className="text-sm text-sage">{success}</p>
            </div>
          )}

          <form onSubmit={handleSave} className="space-y-8">
            <div className="flex flex-col items-center gap-4 sm:flex-row sm:items-start sm:gap-6">
              <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-full border-2 border-line bg-paper-soft">
                {photoURL ? (
                  <Image src={photoURL} alt="Profile" fill className="object-cover" />
                ) : (
                  <div className="flex h-full w-full items-center justify-center bg-sage">
                    <span className="text-3xl font-black text-ink">
                      {displayName ? displayName.charAt(0).toUpperCase() : user?.email?.charAt(0).toUpperCase()}
                    </span>
                  </div>
                )}
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="absolute bottom-0 right-0 left-0 flex h-8 items-center justify-center bg-ink/70 text-white transition hover:bg-ink/90"
                >
                  <Camera className="h-4 w-4" />
                </button>
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  accept="image/*"
                  className="hidden"
                />
              </div>
              <div className="flex-1 space-y-1 text-center sm:text-left">
                <h2 className="text-xl font-bold text-ink">{displayName || 'Student'}</h2>
                <p className="text-sm text-muted">{user?.email}</p>
                <p className="text-xs text-muted mt-2 max-w-sm">
                  Click the camera icon to upload a custom profile picture. JPG, GIF or PNG. Max size of 800K.
                </p>
              </div>
            </div>

            <div className="space-y-4 pt-4 border-t border-line">
              <div>
                <label htmlFor="displayName" className="mb-1.5 block text-sm font-bold text-ink">
                  Display Name
                </label>
                <div className="relative">
                  <User className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
                  <input
                    id="displayName"
                    type="text"
                    value={displayName}
                    onChange={(e) => setDisplayName(e.target.value)}
                    placeholder="E.g. John Doe"
                    style={{ '--input-pl': '2.5rem' } as React.CSSProperties}
                  />
                </div>
              </div>

              <div>
                <label className="mb-1.5 block text-sm font-bold text-ink">
                  Email Address
                </label>
                <input
                  type="email"
                  value={user?.email || ''}
                  disabled
                  className="w-full rounded-lg border border-line bg-paper-soft px-4 py-2 text-sm text-muted outline-none opacity-70 cursor-not-allowed"
                />
                <p className="mt-1 text-xs text-muted">Email address cannot be changed.</p>
              </div>
            </div>

            <div className="pt-4 border-t border-line flex justify-end">
              <button
                type="submit"
                disabled={loading}
                className="flex items-center gap-2 rounded-lg bg-primary px-6 py-2.5 text-sm font-black text-primary-text transition hover:opacity-90 disabled:opacity-60"
              >
                {loading ? (
                  <>
                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-primary-text border-t-transparent" />
                    Saving...
                  </>
                ) : (
                  <>
                    <Save className="h-4 w-4" />
                    Save Changes
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default function ProfilePage() {
  return (
    <ProtectedRoute>
      <ProfileContent />
    </ProtectedRoute>
  );
}
