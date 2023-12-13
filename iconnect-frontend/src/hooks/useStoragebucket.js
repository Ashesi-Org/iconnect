import { useState } from 'react';
import { useQuery, useQueryClient } from 'react-query';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { initializeApp } from 'firebase/app';

const firebaseConfig = {
apiKey: "AIzaSyD3dBKUl0_UnUit5XhDrOZ5pG6amqjI8xg",
  authDomain: "iconnect-406316.firebaseapp.com",
  projectId: "iconnect-406316",
  storageBucket: "iconnect-406316.appspot.com",
  messagingSenderId: "910991037902",
  appId: "1:910991037902:web:0d506e3a0bd93519eb079f"
};

const firebaseApp = initializeApp(firebaseConfig);
const storage = getStorage(firebaseApp);

const useFirebaseStorage = () => {
  const [imageUrl, setImageUrl] = useState('');
  const queryClient = useQueryClient();

  const { isLoading: imageUrlLoading } = useQuery('imageUrl', async () => {
    // Fetch the image URL from Firebase Storage
    const cachedImageUrl = queryClient.getQueryData('imageUrl');
    if (cachedImageUrl) {
      setImageUrl(cachedImageUrl);
      return cachedImageUrl;
    }

    const storageRef = ref(storage, `images/${imageName}`);
    const url = await getDownloadURL(storageRef);
    setImageUrl(url);
    return url;
  }, {
    initialData: '',
    staleTime: Infinity, // Prevents automatic refetching
  });

  const uploadImage = async (file) => {
    try {
      const storageRef = ref(storage, `images/${file.name}`);
      await uploadBytes(storageRef, file);
      const url = await getDownloadURL(storageRef);
      setImageUrl(url);
      queryClient.setQueryData('imageUrl', url);
    } catch (error) {
      console.error('Error uploading image: ', error);
    }
  };

  return { imageUrl, imageUrlLoading, uploadImage };
};

export default useFirebaseStorage;
