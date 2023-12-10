import axios from 'axios';


class CategorieService {
    // insertion categorie
    static async insertCategorie(formulaire: Object): Promise<Object> {
        try {
            const response = await axios.post('http://localhost:3000/api/categorie_produit/add/', formulaire);
            return response.data;
        } catch (error) {
            console.error('Erreur lors de l\'envoi des données categorie_produit', error);
            throw error;
        }
    }

    // recuperation categorie_produit
    static async getCategorie(id: number): Promise<Object> {
        try {
            const response = await axios.get(`http://localhost:3000/api/categorie_produit/get-by-id/${id}/`);
            return response.data;
        } catch (error) {
            console.error('Erreur lors de la réception des categorie_produit', error);
            throw error;
        }
    }

    // mise a jour categorie_produit
    static async updateCategorie(formulaire: Object): Promise<any> {
        console.log(formulaire);
        try {
            const response = await axios.put('http://localhost:3000/api/categorie_produit/update/', formulaire);
            return response.data;
        } catch (error) {
            console.error('Erreur lors de l\'envoi des données categorie_produits', error);
            throw error;
        }
    }

    // suppression categorie_produit
    static async deleteCategorie(id: number): Promise<Boolean> {
        try {
            const response = await axios.delete(`http://localhost:3000/api/categorie_produit/delete/${id}/`);
            return response.data;
        } catch (error) {
            console.error('Erreur lors de l\'envoi des données categorie_produits', error);
            throw error;
        }
    }

    // get all products
    static async getCategories(): Promise<Object[]> {
        try {
            const response = await axios.get(`http://localhost:3000/api/categorie_produit/get-all/`);
            return response.data;
        } catch (error) {
            console.error('Erreur lors de la réception des categorie_produits', error);
            throw error;
        }
    }
}

export default CategorieService;