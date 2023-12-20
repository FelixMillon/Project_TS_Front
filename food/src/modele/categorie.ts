import axios from 'axios';
import ManageCookies from './manageCookies.ts';

class CategorieService {
    // insertion categorie
    static async insertCategorie(formulaire: Object): Promise<any> {
        try {
            const response = await axios.post('http://localhost:3000/api/categorie_produit/add/', formulaire, {
                headers: {
                    "token": ManageCookies.readCookie('myTStoken')
                },
            });
            return response.data;
        } catch (error: any) {
            if (error.response && error.response.status === 403) {
                alert("token invalide");
                ManageCookies.deleteCookie('myTStoken')
            } else {
                console.error('error lors de la connexion', error);
            }
            if (error.response && error.response.status === 401) {
                alert("Vous n'avez pas les droits pour executer cette action.");
            } else {
                console.error('error lors de la connexion', error);
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
                    "token": ManageCookies.readCookie('myTStoken')
                },
            });
            return response.data;
        } catch (error: any) {
            if (error.response && error.response.status === 403) {
                alert("token invalide");
                ManageCookies.deleteCookie('myTStoken')
            } else {
                console.error('error lors de la connexion', error);
            }
            if (error.response && error.response.status === 401) {
                alert("Vous n'avez pas les droits pour executer cette action.");
            } else {
                console.error('error lors de la connexion', error);
            }
        }
    }

    // suppression categorie_produit
    static async deleteCategorie(id: number): Promise<any> {
        try {
            const response = await axios.delete(`http://localhost:3000/api/categorie_produit/delete/${id}/`, {
                headers: {
                    "token": ManageCookies.readCookie('myTStoken')
                },
            });
            return response.data;
        } catch (error: any) {
            if (error.response && error.response.status === 403) {
                alert("token invalide");
                ManageCookies.deleteCookie('myTStoken')
            } else {
                console.error('error lors de la connexion', error);
            }
            if (error.response && error.response.status === 401) {
                alert("Vous n'avez pas les droits pour executer cette action.");
            } else {
                console.error('error lors de la connexion', error);
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