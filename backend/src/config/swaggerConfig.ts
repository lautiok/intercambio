import swaggerJsdoc from "swagger-jsdoc"

const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Intercambia",
            version: "1.0.0",
            description: "Intercambia api documentation",
            contact: {
                name: "developer"
            },
            servers: [
                {
                    url: "http://localhost:8080",
                    description: "local server" 
                }
            ]

        }
    },
    apis: ['./swagger/*.yaml']
}

const specs = swaggerJsdoc(options)
export default specs