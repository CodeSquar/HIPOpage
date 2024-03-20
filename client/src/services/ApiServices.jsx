

class ApiServices{
  
    constructor(httpClient){
        this.httpClient = httpClient
        this.domain = "https://qq06pqjf-5000.brs.devtunnels.ms/api"
    }
    async getProducts(){
        try {
            const response = await this.httpClient.get(`${this.domain}/products`)
            return response.json()
        } catch (error) {
            console.error(error)
            throw error
        }
      
    }
    async getProduct(id){
        try {
            const response = await this.httpClient.get(`${this.domain}/products/${id}`)
            return response.json()
        } catch (error) {
            console.error(error)
            throw error
        }
      
    }
    async postProduct(body,token){
        try {
            const response = await this.httpClient.post(`${this.domain}/products`,body,token)
            return response.json()
        } catch (error) {
            console.error(error)
            throw error
        }
    }
    async deleteProduct(id,token){
        try {
            const response = await this.httpClient.delete(`${this.domain}/products/${id}`,token)
            return response.json()
        } catch (error) {
            console.error(error)
            throw error
        }
    }
    async getCart(token){
        try {
            const response = await this.httpClient.get(`${this.domain}/cart`,token)
            return response.json()
        } catch (error) {
            console.error(error)
            throw error
        }
      
    }
    async postCart(body,token){
        try {
            const response = await this.httpClient.post(`${this.domain}/cart`,body,token)
            return response.json()
        } catch (error) {
            console.error(error)
            throw error
        }
    }
    async deleteCart(id,token){
        try {
            const response = await this.httpClient.delete(`${this.domain}/cart/${id}`,token)
            return response.json()
        } catch (error) {
            console.error(error)
            throw error
        }
    }
    async login(body){
        try {
            const response = await this.httpClient.post(`${this.domain}/login`,body)
            return response.json()
        } catch (error) {
            console.error(error)
            throw error
        }
    }
    async register(body){
        try {
            const response = await this.httpClient.post(`${this.domain}/register`,body)
            return response.json()
        } catch (error) {
            console.error(error)
            throw error
        }
    }
    async getUser(token){
        try {
            const response = await this.httpClient.get(`${this.domain}/userinfo`,token)
            return response.json()
        } catch (error) {
            console.error(error)
            throw error
        }
      
    }
    async getSales(token){
        try {
            const response = await this.httpClient.get(`${this.domain}/sales`,token)
            return response.json()
        } catch (error) {
            console.error(error)
            throw error
        }
      
    }
    async getSale(id, token){
        try {
            const response = await this.httpClient.get(`${this.domain}/sales/${id}`,token)
            return response.json()
        } catch (error) {
            console.error(error)
            throw error
        }
      
    }
    async payment(body,token){
        try {
            const response = await this.httpClient.post(`${this.domain}/payment`,body,token)
            return response.json()
        } catch (error) {
            console.error(error)
            throw error
        }
    }

}
export default ApiServices