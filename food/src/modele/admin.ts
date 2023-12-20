import axios from 'axios';

class AdminService {
    // insertion produit
    static async insertAdmin(formulaire: Object): Promise<Object> {
        try {
            const response = await axios.post('http://localhost:3000/api/admin/add/', formulaire);
            return response.data;
        } catch (error) {
            console.error('Erreur lors de l\'envoi des données produits', error);
            throw error;
        }
    }

    // recuperation produit
    static async signIn(email: string, password: string): Promise<any> {
        try {
            const response = await axios.post(`http://localhost:3000/api/admin/signin/`,{}, {
                headers: {
                    "email": email,
                    "password": password
                },
            });
            return response.data;
        } catch (error: any) {
            if (error.response && error.response.status === 401) {
                alert('Accès non autorisé. Veuillez vérifier vos identifiants.');
            } else {
                console.error('error lors de la connexion', error);
            }
        }
    }

}

export default AdminService;