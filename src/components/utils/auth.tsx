import { jwtDecode } from "jwt-decode";
import MockupActor from "../../Data/MockupActor"
import { ActorData } from "../../types/Actor";
import { Token } from "../../types/Token";

export const login = async (email: string, password: string): Promise<ActorData> => {
    // try {
    //     const response = await axios.post('http://localhost:3001/login', {
    //         email,
    //         password
    //     })
    //     return response.data
    // } catch (error) {
    //     return error
    // }

    try {
        // Find the actor with the matching email and password
        const actor = MockupActor.find(actor => actor.email === email && actor.password === password);

        if (actor) {
            // Return the actor data if found
            console.log("Login success:", actor);

            localStorage.setItem('token', actor.token);

            window.location.href = '/';
            
            return actor;
        } else {
            // Return null if no matching actor is found
            console.log("Login failed: No matching actor found");
            
            return {
                id: -1,
                role: "",
                firstname: "",
                lastname: "",
                email: "",
                password: "",
                phone_number: "",
                created_at: "",
                updated_at: ""
            };
        }
    } catch (error) {
        console.error("Login error:", error);
        return {
            id: -1,
            role: "",
            firstname: "",
            lastname: "",
            email: "",
            password: "",
            phone_number: "",
            created_at: "",
            updated_at: ""
        };
    }
}

export const logout = async () => {
    localStorage.removeItem('token');
    window.location.href = '/';
}

export const decodedToken = async (): Promise<Token> => {
    const token = localStorage.getItem('token');
    if (!token) {
        return {
            role: "-1",
            firstname: "",
            lastname: "",
            email: ""
        }
    }

    try {
        const decodedToken = jwtDecode<Token>(token);
        return decodedToken;
    } catch (error) {
        console.error("Decoded token error:", error);
        window.location.href = '/login';
        return {
            role: "-1",
            firstname: "",
            lastname: "",
            email: ""
        };
    }
}