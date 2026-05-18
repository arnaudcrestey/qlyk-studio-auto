import { createUploadthing, type FileRouter } from 'uploadthing/next';

const f = createUploadthing();

export const ourFileRouter = {
  vehiclePhotos: f({
    image: {
      maxFileSize: '8MB',
      maxFileCount: 6,
    },
  }).onUploadComplete(async ({ file }) => {
    return {
      url: file.url,
      name: file.name,
      size: file.size,
    };
  }),

  volumePhotos: f({
    image: {
      maxFileSize: '8MB',
      maxFileCount: 50,
    },
  }).onUploadComplete(async ({ file }) => {
    return {
      url: file.url,
      name: file.name,
      size: file.size,
    };
  }),

  deliveryPhotos: f({
    image: {
      maxFileSize: '8MB',
      maxFileCount: 20,
    },
  }).onUploadComplete(async ({ file }) => {
    return {
      url: file.url,
      name: file.name,
      size: file.size,
    };
  }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
