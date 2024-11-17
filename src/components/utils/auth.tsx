import MockupActor from "../../Data/MockupActor"
import { ActorData } from "../../types/Actor";

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
            return actor;
        } else {
            // Return null if no matching actor is found
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
            }
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
        }
    }
}
