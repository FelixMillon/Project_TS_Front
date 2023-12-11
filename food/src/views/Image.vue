<template>
  <div>
    <input type="file" @change="handleFileChange" accept="image/*" />
    <button @click="uploadImage">Upload</button>
  </div>
</template>

<script lang="ts">
import { s3 } from '@/aws-config';

export default {
  data() {
    return {
      selectedFile: null,
    };
  },
  methods: {
    handleFileChange(event) {
      this.selectedFile = event.target.files[0];
    },
    uploadImage() {
      if (this.selectedFile) {
        const params = {
          Bucket: 'YOUR_S3_BUCKET_NAME',
          Key: this.selectedFile.name,
          Body: this.selectedFile,
          ACL: 'public-read',
        };

        s3.upload(params, (err, data) => {
          if (err) {
            console.error(err);
          } else {
            console.log('Image uploaded successfully:', data.Location);
            // Vous pouvez effectuer des opérations supplémentaires ici, comme mettre à jour l'état de votre application avec l'URL de l'image
          }
        });
      }
    },
  },
};
</script>