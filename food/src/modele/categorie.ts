import axios from 'axios';
import Cookies from 'js-cookie';

class CategorieService {
    // insertion categorie
    static async insertCategorie(formulaire: Object): Promise<any> {
        try {
            const response = await axios.post('http://localhost:3000/api/categorie_produit/add/', formulaire, {
                headers: {
                    "username": Cookies.get('username'),
                    "password": Cookies.get('password')
                },
            });
            return response.data;
        } catch (error: any) {
            if (error.response && error.response.status === 401) {
                alert('Unauthorized');
            } else {
                console.error('Erreur lors de l\'envoi des données categorie_produits', error);
            }
        }
    }

    // recuperation categorie_produit
    static async getCategorie(id: number): Promise<any> {
        try {
            const response = await axios.get(`http://localhost:3000/api/categorie_produit/get-by-id/${id}/`);
            return response.data;
        } catch (error) {
            console.error('Erreur lors de la réception des categorie_produit', error);
        }
    }

    // mise a jour categorie_produit
    static async updateCategorie(formulaire: Object): Promise<any> {
        
        try {
            const response = await axios.put('http://localhost:3000/api/categorie_produit/update/', formulaire, {
                headers: {
                    "username": Cookies.get('username'),
                    "password": Cookies.get('password')
                },
            });
            return response.data;
        } catch (error: any) {
            if (error.response && error.response.status === 401) {
                alert('Unauthorized');
            } else {
                console.error('Erreur lors de l\'envoi des données categorie_produits', error);
            }
        }
    }

    // suppression categorie_produit
    static async deleteCategorie(id: number): Promise<any> {
        try {
            const response = await axios.delete(`http://localhost:3000/api/categorie_produit/delete/${id}/`, {
                headers: {
                    "username": Cookies.get('username'),
                    "password": Cookies.get('password')
                },
            });
            return response.data;
        } catch (error: any) {
            if (error.response && error.response.status === 401) {
                alert('Unauthorized');
            } else {
                console.error('Erreur lors de l\'envoi des données categorie_produits', error);
            }
            return error;
        }
    }

    // get all products
    static async getCategories(): Promise<any> {
        try {
            const response = await axios.get(`http://localhost:3000/api/categorie_produit/get-all/`);
            return response.data;
        } catch (error) {
            console.error('Erreur lors de la réception des categorie_produits', error);
        }
    }
}

export default CategorieService;