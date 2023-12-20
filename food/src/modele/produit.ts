import axios from 'axios';
import ManageCookies from './manageCookies.ts';

class ProduitService {
    // insertion produit
    static async insertProduit(formulaire: Object): Promise<Object> {
        try {
            const response = await axios.post('http://localhost:3000/api/produit/add/', formulaire, {
                headers: {
                    'Content-Type': 'multipart/form-data',
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

    // recuperation produit
    static async getProduit(id: number): Promise<Object> {
        try {
            const response = await axios.get(`http://localhost:3000/api/produit/get-by-id/${id}/`);
            return response.data;
        } catch (error) {
            console.error('Erreur lors de la réception des produits', error);
            throw error;
        }
    }

    // mise a jour produit
    static async updateProduit(formulaire: Object): Promise<Boolean> {
        try {
            const response = await axios.put('http://localhost:3000/api/produit/update/', formulaire, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    "token": ManageCookies.readCookie('myTStoken')
                },
            });
            return response.data;
        } catch (error) {
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

    // suppression produit
    static async deleteProduit(id: number): Promise<Boolean> {
        try {
            const response = await axios.delete(`http://localhost:3000/api/produit/delete/${id}/`, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    "token": ManageCookies.readCookie('myTStoken')
                },
            });
            return response.data;
        } catch (error) {
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

    //get all products
    static async getProduits(): Promise<Object[]> {
        try {
            const response = await axios.get(`http://localhost:3000/api/produit/get-all/`);
            return response.data;
        } catch (error) {
            console.error('Erreur lors de la réception des produits', error);
            throw error;
        }
    }

    //get produits par categorie
    static async getProduitsByCat(id_cat: Number): Promise<Object[]> {
        try {
            const response = await axios.get(`http://localhost:3000/api/produit/get-by-cat/${id_cat}`);
            return response.data;
        } catch (error) {
            console.error('Erreur lors de la réception des produits', error);
            throw error;
        }
    }
}

export default ProduitService;