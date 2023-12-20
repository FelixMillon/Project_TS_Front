<template>
    <div>
        <div>
            <h4 class="mb-3 text-center">Connectez vous</h4>
            <form>
                <div class="row g-3">
                    <div class="col-12">
                        <input type="text" class="form-control" v-model="this.email" 
                            placeholder="Email"  >
                    </div>
                    <div class="col-12">
                        <input type="text" class="form-control" v-model="this.nom" 
                            placeholder="Nom"  >
                    </div>
                    <div class="col-12">
                        <input type="text" class="form-control" v-model="this.prenom" 
                            placeholder="Prenom"  >
                    </div>
                    <div class="col-12">
                        <input type="password" class="form-control" v-model="this.password" 
                        placeholder="Mot de passe"  >
                    </div>
                    <div class="col-12">
                        <input type="password" class="form-control" v-model="this.verifPassword" 
                        placeholder="Vérification de Mot de passe"  >
                    </div>
                </div>
                <div class="btn-group text-center">
                    <button @click="this.logIn()" class="btn btn-primary btn-lg" type="button">Inscription</button>
                </div>
            </form>
        </div>
    </div>
    
</template>
<script lang="ts">
import AdminService from '../modele/admin';
import sha256 from 'js-sha256';
import ManageCookies from "../modele/manageCookies";
import router from '../router';
export default {
  data() {
    return {
        email: "",
        password : "",
        verifPassword : "",
        nom: "",
        prenom: "",
        afficherMonComposant: false,
        token: ManageCookies.readCookie('myTStoken')
    };
  },
  methods: {
    async logIn() {
        try{
            if(this.password != this.verifPassword){
                alert("Il y a des différences entre vos mots de passe");
                return;
            }
            if(!this.testPassword(this.password)){
                alert("Le mot de passe doit contenir une majuscule, une minuscule, un chiffre, un caractère spécial et au moins 8 caractères");
                return;
            }
            const hash = this.hashPassword(this.password);
            if(hash == null){
                alert("erreur lors du chiffrement du mot de passe");
                return;
            }
            const formulaire = {
                "email": this.email,
                "nom": this.nom,
                "prenom": this.prenom,
                "mdp": hash
            }
            const insertedUser = await AdminService.insertAdmin(formulaire)
            if(insertedUser == null){
                alert("Cet email est déja utilisé");
                return;
            }
            const token = await AdminService.signIn(this.email,hash);
            ManageCookies.createCookie('myTStoken', token, 1)
            console.log(token)
            this.$store.dispatch('createToken', token);
            router.push('/');
        } catch (error) {
            console.error('Erreur lors de la connexion', error);
        }
    },
    hashPassword(password: string) {
        const hashedPassword = sha256(password);
        return hashedPassword;
    },
    testPassword(password: string) {
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*\W).{8,}$/;
        return passwordRegex.test(password);
    }

  }
}
</script>

