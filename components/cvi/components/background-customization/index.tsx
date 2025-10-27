import { useConversation } from "@/context/ConversationContext";
import React from "react";
import { storage } from "@/lib/firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

export const BackgroundCustomization = () => {
  const { setBackground } = useConversation();

  // Array of stock background images
  const stockBackgrounds = [
    {
      id: 1,
      name: "Modern Office",
      url: "/assets/backgrounds/modern-office.jpeg",
    },
    {
      id: 2,
      name: "Cozy Home Office",
      url: "/assets/backgrounds/cozy-home-office.jpeg",
    },
    {
      id: 3,
      name: "Minimalist Room",
      url: "/assets/backgrounds/minimalist-room.jpeg"
    },
    {
      id: 4,
      name: "Nature View",
      url: "/assets/backgrounds/nature-view.jpeg",
    },
    {
      id: 5,
      name: "City Skyline",
      url: "/assets/backgrounds/city-skyline.jpeg",
    },
    {
      id: 6,
      name: "Library",
      url: "/assets/backgrounds/library.jpeg",
    },
    {
      id: 7,
      name: "Beach View",
      url: "/assets/backgrounds/beach-view.jpeg",
    },
    {
      id: 8,
      name: "Mountain Landscape",
      url: "/assets/backgrounds/mountain-landscape.jpeg",
    },
    {
      id: 9,
      name: "Conference Room",
      url: "/assets/backgrounds/conference-room.jpeg",
    },
    {
      id: 10,
      name: "Abstract Design",
      url: "/assets/backgrounds/abstract-design.jpeg",
    },
  ];

  const handleBackgroundSelect = (backgroundUrl: string) => {
    // remove query string from url if they exist
    const url = backgroundUrl.split("?")[0];
    setBackground({
      type: "image",
      value: url,
    });
  };

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];

      // Validate file extension
      if (!/\.(jpeg|jpg|gif|png)$/i.test(file.name)) {
        console.error("Invalid file type. Please upload a JPEG, JPG, GIF, or PNG image.");
        // Optionally, you can add user feedback here (e.g., a toast notification)
        return;
      }

      try {
        // Use the original filename
        const fileRef = ref(storage, `backgrounds/${file.name}`);
        
        // Upload the file
        const snapshot = await uploadBytes(fileRef, file, {});
        
        // Get the public URL
        const publicUrl = await getDownloadURL(snapshot.ref);
        
        // Set the background with the public URL
        setBackground({
          type: "image",
          value: publicUrl,
        });
      } catch (error) {
        console.error("Error uploading image to Firebase Storage:", error);
      }
    }
  };

  return (
    <div className="text-white backdrop-blur-md bg-black/40 border border-white/20 rounded-xl shadow-[0_0_20px_rgba(0,0,0,0.3)] flex flex-col h-full overflow-hidden">
      <div className="p-2 border-b border-white/10">
        <h3 className="font-bold text-lg text-white">Background Customization</h3>
      </div>
      <div className="p-2 mb-2">
        <p className="text-white mb-2">Choose a background:</p>
        
        {/* Stock background options */}
        <div className="grid grid-cols-2 gap-2 max-h-[200px] overflow-y-auto mb-4">
          {stockBackgrounds.map((background) => (
            <div
              key={background.id}
              className="cursor-pointer rounded-md overflow-hidden border-2 border-transparent hover:border-amber-500 transition-all"
              onClick={() => handleBackgroundSelect(background.url)}
            >
              <img
                src={background.url}
                alt={background.name}
                className="w-full h-20 object-cover"
              />
              <p className="text-xs text-center text-white p-1 bg-black/30 truncate">
                {background.name}
              </p>
            </div>
          ))}
        </div>
        
        {/* Upload button */}
        <div className="border-t border-white/10 pt-2">
          <label htmlFor="image-upload" className="text-white bg-amber-500 px-4 py-2 rounded-md cursor-pointer block text-center">
            Upload Custom Image
          </label>
          <input id="image-upload" type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
        </div>
      </div>
    </div>
  );
};
