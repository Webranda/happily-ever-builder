
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Container from '@/components/ui/Container';
import Logo from '@/components/ui/Logo';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ArrowRight } from 'lucide-react';
import { usePhotoGallery, MAX_IMAGES } from '@/hooks/usePhotoGallery';
import PhotoUploader from '@/components/photo-gallery/PhotoUploader';
import PhotoGrid from '@/components/photo-gallery/PhotoGrid';

const PhotoGallery = () => {
  const navigate = useNavigate();
  const {
    uploadedImages,
    removeImage,
    addFiles,
    saveGallery,
    loading,
    user,
  } = usePhotoGallery();

  const hasUnsavedChanges = uploadedImages.some(img => img.file && !img.url);
  const hasSavedImages = uploadedImages.some(img => img.url && !img.file);

  const handleCompleteSetup = () => {
    // Navigate to template preview to see the website with actual content
    navigate('/templates');
  };

  return (
    <div className="min-h-screen w-full bg-white">
      {/* Header */}
      <header className="w-full py-4 px-6 shadow-soft backdrop-blur-sm bg-white/80 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="inline-block">
            <Logo size="md" />
          </div>

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
              <Link to="/template-selection">
                <ChevronLeft className="mr-1 h-4 w-4" />
                <span>Back to Templates</span>
              </Link>
            </Button>

            <div className="text-center">
              <h1 className="text-3xl md:text-4xl mb-4 animate-fade-in">Photo Gallery</h1>
              <p className="text-gray-600 max-w-2xl mx-auto animate-fade-in">
                Upload photos for your wedding website gallery. These will be displayed in your selected template.
              </p>
              {!user && (
                <p className="text-red-600 mt-2">Please sign in to manage your photo gallery</p>
              )}
            </div>
          </div>

          {user && (
            <>
              <div className="mb-8">
                <PhotoUploader 
                  onAddFiles={addFiles} 
                  disabled={uploadedImages.length >= MAX_IMAGES}
                  currentImageCount={uploadedImages.length}
                />
              </div>

              {uploadedImages.length > 0 && (
                <div className="mt-10">
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-2xl">Your Photos ({uploadedImages.length}/{MAX_IMAGES})</h2>
                    {hasUnsavedChanges && (
                      <span className="text-sm text-orange-600 bg-orange-50 px-2 py-1 rounded">
                        You have unsaved changes
                      </span>
                    )}
                  </div>
                  <PhotoGrid images={uploadedImages} onRemove={removeImage} />
                  
                  <div className="mt-6 text-center space-y-4">
                    {hasUnsavedChanges && (
                      <>
                        <Button
                          className="bg-wedding-gold hover:bg-wedding-gold/90 text-white disabled:bg-gray-400"
                          onClick={saveGallery}
                          disabled={loading || !user}
                        >
                          {loading ? "Saving..." : "Save Gallery"}
                        </Button>
                        <p className="text-sm text-gray-600">
                          Click "Save Gallery" to upload your new photos
                        </p>
                      </>
                    )}
                    
                    {hasSavedImages && !hasUnsavedChanges && (
                      <>
                        <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-4">
                          <p className="text-green-700 font-medium">✓ Your photos have been saved successfully!</p>
                          <p className="text-green-600 text-sm mt-1">
                            Ready to see your wedding website with your photos
                          </p>
                        </div>
                        
                        <Button
                          className="bg-wedding-navy hover:bg-wedding-navy/90 text-white px-8 py-6 h-auto text-lg btn-hover-effect"
                          onClick={handleCompleteSetup}
                        >
                          Complete Setup & Preview Website
                          <ArrowRight className="ml-2 h-5 w-5" />
                        </Button>
                        
                        <p className="text-sm text-gray-600">
                          Continue to see your wedding website with your uploaded photos
                        </p>
                      </>
                    )}
                  </div>
                </div>
              )}
            </>
          )}

          {!user && (
            <div className="text-center">
              <p className="text-gray-600 mb-4">Please sign in to access your photo gallery</p>
              <Button asChild>
                <Link to="/auth">Sign In</Link>
              </Button>
            </div>
          )}
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

export default PhotoGallery;
