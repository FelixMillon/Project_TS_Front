import axios from 'axios';


class ProduitService {
    // insertion produit
    static async insertProduit(formulaire: Object): Promise<Object> {
        try {
            const response = await axios.post('http://localhost:3000/api/produit/add/', formulaire, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });
            return response.data;
        } catch (error) {
            console.error('Erreur lors de l\'envoi des données produits', error);
            throw error;
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
                headers: { 'Content-Type': 'multipart/form-data' },
            });
            return response.data;
        } catch (error) {
            console.error('Erreur lors de l\'envoi des données produits', error);
            throw error;
        }
    }

    // suppression produit
    static async deleteProduit(id: number): Promise<Boolean> {
        try {
            const response = await axios.delete(`http://localhost:3000/api/produit/delete/${id}/`, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });
            return response.data;
        } catch (error) {
            console.error('Erreur lors de l\'envoi des données produits', error);
            throw error;
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
}

export default ProduitService;