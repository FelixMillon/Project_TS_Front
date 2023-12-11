<template>
    <div class="popup-overlay" v-if="visible">
        <div class="popup-content">
            <h4 v-if="newUpdate" class="mb-3 text-center">Modifier la catégorie</h4>
            <h4 v-else class="mb-3 text-center">Ajouter une catégorie</h4>
            <form @submit.prevent="submit">
                <div class="row g-3">
            
                    <div class="col-12">
                    <input type="text" class="form-control" v-model="form.libelle" 
                        :placeholder="newUpdate ? this.categorie.libelle : 'Libelle catégorie'"  >
                    </div>
                
                    <div class="col-12">
                    <textarea class="form-control" v-model="form.description"
                        :placeholder="newUpdate ? categorie.description : 'Description catégorie'" rows="4"></textarea>
                    </div>
            
                </div>
                <div class="btn-group text-center">
                    <button v-if="!newUpdate" @click="this.insertCategorie()" class="btn btn-primary btn-lg" type="button">Ajouter une catégorie</button>
                    <button v-if="newUpdate" @click="this.updateCategorie()" class="btn btn-primary btn-lg" type="button">Modifier la catégorie</button>
                    <button @click="this.closePopup()" class="btn btn-danger btn-lg" type="button">Annuler</button>
                </div>
            </form>
        </div>
    </div>
</template>
  
  <script lang="ts">
  export default {
    data() {
        return {
            form: {
                id : 0,
                libelle: '',
                description: ''
            }
        };
    },
    props: {
        categorie: {
            type: Object,
            required: true
        },
        newUpdate: {
            type: Boolean,
            required: true
        },
        visible: {
            type: Boolean,
            required: true
        }
    },
    methods: {
      closePopup() {
        this.resetform();
        this.$emit('closePopup');
      },
      updateCategorie() {
        this.form.id = this.categorie.id
        this.$emit('updateCategorie', this.form);
        this.closePopup();
      },
      insertCategorie() {
        this.$emit('insertCategorie', this.form);
        this.closePopup();
      },
    
      //reset formulaire
      resetform(){
        // Reset de toutes les valeurs
         this.form = {
          id : 0,
          libelle: '',
          description: ''
        };
      },
    }
  };
  </script>
  
  <style scoped>
  .popup-overlay {
    position: fixed;
    top: 50%; /* Place le haut du pop-up au milieu de la fenêtre */
    left: 50%; /* Place la gauche du pop-up au milieu de la fenêtre */
    transform: translate(-50%, -55%); /* Centre le pop-up verticalement et horizontalement */
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
  }
  
  .popup-content {
    background: white;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
    text-align: center;
    max-width: 80%; /* Limitez la largeur du contenu si nécessaire */
  }
  
  .close-button {
    position: absolute;
    top: 10px;
    right: 10px;
    background: none;
    border: none;
    cursor: pointer;
    font-size: 16px;
    color: #333;
  }
  </style>