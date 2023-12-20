<template>
    <div>
        <div>
            <h4 class="mb-3 text-center">Connectez vous</h4>
            <form>
                <div class="row g-3">
            
                    <div class="col-12">
                    <input type="text" class="form-control" v-model="this.email" 
                        placeholder="email"  >
                    </div>
                
                    <div class="col-12">
                        <input type="password" class="form-control" v-model="this.password" 
                        placeholder="mot de passe"  >
                    </div>
            
                </div>
                <div class="btn-group text-center">
                    <button @click="this.signIn()" class="btn btn-primary btn-lg" type="button">Sign in</button>
                    <RouterLink to="/login/" class="btn btn-primary btn-lg">Log in</RouterLink>
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
        afficherMonComposant: false,
        token: ManageCookies.readCookie('myTStoken')
    };
  },
  methods: {
    async signIn() {
        try{
            const hash = this.hashPassword(this.password);
            if(hash == null){
                alert("erreur lors du chiffrement du mot de passe");
            }else{
                const token = await AdminService.signIn(this.email,hash);
                ManageCookies.createCookie('myTStoken', token, 1)
                this.token = ManageCookies.readCookie('myTStoken');
                router.push('/');
            }
        } catch (error) {
            console.error('Erreur lors de la connexion', error);
        }
    },
    hashPassword(password: string) {
        const hashedPassword = sha256(password);
        return hashedPassword;
    }

  }
}
</script>

